# graphql-bangkok-2023

Code for my talk at GraphQL Bangkok 31/07/2023 https://www.meetup.com/graphql-bangkok/events/294721074/

## Links

- https://github.com/rocket-connect/graphql-otel
- https://www.jaegertracing.io/
- https://opentelemetry.io/
- https://rocketconnect.co.uk/

## Starting Jaeger

```
docker run --rm --name jaeger \
  -e COLLECTOR_ZIPKIN_HOST_PORT=:9411 \
  -e COLLECTOR_OTLP_ENABLED=true \
  -p 6831:6831/udp \
  -p 6832:6832/udp \
  -p 5778:5778 \
  -p 16686:16686 \
  -p 4317:4317 \
  -p 4318:4318 \
  -p 14250:14250 \
  -p 14268:14268 \
  -p 14269:14269 \
  -p 9411:9411 \
  jaegertracing/all-in-one:1.35
```

## Starting Postgres

```
docker run -d -p 5432:5432 --name postgres-container -e POSTGRES_PASSWORD=password postgres
```

### Connection String

```
DATABASE_URL="postgres://postgres:password@localhost:5432/dev"
```
