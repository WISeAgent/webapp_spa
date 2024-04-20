TRACE_INFO=(msg)=> console.log(`[${new Date().toISOString().slice(11,23)}]`, msg)
//TRACE_INFO=(msg)=> {} // to disable it
TRACE_DBG=(msg)=> console.log(`[${new Date().toISOString().slice(11,23)}]-DBG: ${msg}`)
//TRACE_DBG=(msg)=> {} // to disable it
TRACE_ERR=(msg)=> console.log(`%c [${new Date().toISOString().slice(11,23)}]-ERR: ${msg}`, 'background: red; color: white; display: block;') && console.trace()

// Initial fetch of entries
document.addEventListener('DOMContentLoaded', function() {
    fetchEntries();
});
// Function to fetch and render entries
function fetchEntries() {
    fetch('/api/entries')
      .then(response => response.json())
      .then(entries => {
        TRACE_DBG('Entries:', entries);
        renderEntries(entries);
      })
      .catch(error => console.error('Error fetching entries:', error));
}
// Function to add a new entry
function addEntry(entry) {
    fetch('/api/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry)
    })
    .then(() => fetchEntries()) // Re-fetch entries after addition
    .catch(error => console.error('Error adding entry:', error));
}
// Function to remove an entry
function removeEntry(id) {
    fetch(`/api/entries/${id}`, {
      method: 'DELETE'
    })
    .then(() => fetchEntries()) // Re-fetch entries after deletion
    .catch(error => console.error('Error removing entry:', error));
}
// Function to render entries to the DOM
function renderEntries(entries) {
    const table = document.getElementById('myTable');
    table.innerHTML = ''; // Clear previous entries
    const headerRow = table.insertRow(-1);
    headerRow.innerHTML = `<th>Name</th><th>Age</th><th>Email</th>`; // Re-add headers
    entries.forEach(entry => {
      appendEntryToUI(entry);
    });
  }
// Function to append a single entry to the DOM
function appendEntryToUI(entry) {
    const table = document.getElementById('myTable');
    const row = table.insertRow(-1);
    row.innerHTML = `<td>${entry.name}</td><td>${entry.age}</td><td>${entry.email}</td>`;
  }
// Initial fetch of entries
document.addEventListener('DOMContentLoaded', function() {
    fetchEntries();
});
  // Example usage
//  removeEntry(1);
//  addEntry({ name: "Alice Smith", age: 28, email: "alice@example.com" });
//  fetchEntries();
  