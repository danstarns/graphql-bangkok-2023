import * as api from "@opentelemetry/api";

import { setupOtel } from "./setup-otel";
setupOtel();

const tracer = api.trace.getTracer("manual-trace");

tracer.startActiveSpan("my-custom-span", (span) => {
  tracer.startActiveSpan("my-custom-child-span", (childSpan) => {
    childSpan.setAttribute("my-custom-attribute", "my-custom-value");
    childSpan.end();
  });

  span.end();
});
