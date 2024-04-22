const { trace, SpanKind } = require('@opentelemetry/api');
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
//const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-base');
//const provider = new NodeTracerProvider();
//provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
//provider.register();
const { CustomConsoleSpanExporter } = require('./CustomConsoleSpanExporter');

const provider = new NodeTracerProvider();
provider.register();
const customExporter = new CustomConsoleSpanExporter();
const processor = new SimpleSpanProcessor(customExporter);
provider.addSpanProcessor(processor);

// Declare tracer after provider has been registered
const tracer = trace.getTracer('manual_instrumentation-tracer');

function BusinessLogic() {
  const span = tracer.startSpan('BusinessLogic', {
    kind: SpanKind.INTERNAL,
  });

  try {
    // Simulated business logic
    console.log('Running business logic');
    span.addEvent('Doing work');
    setTimeout(() => {
      // Simulate async work completion
      span.end();
      console.log('Business logic completed');
    }, 1000); // Delay to simulate async operation
  } catch (error) {
    span.recordException(error);
    span.end();
  }
}

BusinessLogic();
