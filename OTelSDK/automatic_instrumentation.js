const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');
const {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} = require('@opentelemetry/sdk-metrics');
const { CustomConsoleSpanExporter } = require('./CustomConsoleSpanExporter'); // Make sure to require your custom exporter

const sdk = new NodeSDK({
  autoDetectResources: true,
  instrumentations: [getNodeAutoInstrumentations()],
  // Here you can add exporters or additional configuration as needed.
  // traceExporter: new ConsoleSpanExporter(), replace the traceExporter with an instance of custom exporter
  traceExporter: new CustomConsoleSpanExporter(),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter(),
  })
});

sdk.start()
//  .then(() => console.log('Tracing initialized.'))
//  .catch((error) => console.error('Failed to initialize tracing:', error));
