const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
// Server-side variable to hold the verbosity level
let verbose = "info";
TRACE_DBG=(msg)=> {} // to disable it
TRACE_INFO=(msg)=> console.log(`[${new Date().toISOString().slice(11,23)}]`, msg)
TRACE_ERR=(msg)=> console.log(`%c [${new Date().toISOString().slice(11,23)}]-ERR: ${msg}`, 'background: red; color: white; display: block;') && console.trace()

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'src')));

// Serving the OTelLogs.json file explicitly
app.get('/data/OTelLogs.json', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'data', 'OTelLogs.json'));
  });

let entries = require('../data/OTelLogs.json'); // Load initial data

// API to get all entries
app.get('/api/entries', (req, res) => {
  res.json(entries);
});

// API to add a new entry
app.post('/api/entries', (req, res) => {
  const entry = req.body;
  entry.id = entries.length + 1; // Simple ID assignment
  entries.push(entry);
  TRACE_DBG(`Add array entry: ${Array.isArray(entries)}`, entries); // Log to see current state of entries
  res.status(201).send(entry);
});

// API to remove an entry
app.delete('/api/entries/:id', (req, res) => {
  const id = parseInt(req.params.id);
  entries = entries.filter(entry => entry.id !== id);
  res.status(204).send();
});
// API to get current verbose level
app.get('/api/verbose', (req, res) => {
    res.json({ verbose });
});
// API to set verbose level
app.post('/api/verbose', (req, res) => {
    const { level } = req.body;  // Get the verbosity level from the request body
    if (['debug', 'info', 'warn', 'error'].includes(level)) { // Validate input
      verbose = level;  // Set the server-side verbosity level
      res.json({ verbose });
      switch (verbose) {
        case 'info':
            TRACE_DBG=(msg)=> {} // to disable it
        case 'debug':
            TRACE_DBG=(msg)=> console.log(`[${new Date().toISOString().slice(11,23)}]-DBG: ${msg}`) 
      }
    } else {
      res.status(400).json({ error: "Invalid verbose level" });
    }
});

TRACE_INFO(`Server running on http://localhost:${port}`)
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
