// CustomConsoleSpanExporter.js
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');

// Replacer function to handle circular references
function getCircularReplacer() {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
}

class CustomConsoleSpanExporter extends ConsoleSpanExporter {
  export(spans, resultCallback) {
    console.log('['); // Start of JSON array
    spans.forEach((span, index) => {
      const comma = index === spans.length - 1 ? '' : ','; // No comma after last span
      // Use the replacer function to handle circular references
      console.log(`${JSON.stringify(span, getCircularReplacer())}${comma}`);
    });
    console.log(']'); // End of JSON array
    return super.export(spans, resultCallback);
  }
}

module.exports = { CustomConsoleSpanExporter };
