import { setupOtel } from "./setup-otel";
setupOtel();

import { makeExecutableSchema } from "@graphql-tools/schema";
import { traceDirective, GraphQLOTELContext } from "graphql-otel";
import { createServer } from "@graphql-yoga/node";
import gql from "gql-tag";

const typeDefs = gql`
  type User {
    name: String
    age: Int
  }

  type Query {
    users: [User] @trace
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      return [{ name: "Dan", age: 23 }];
    },
  },
};

const trace = traceDirective();

let schema = makeExecutableSchema({
  typeDefs: [typeDefs, trace.typeDefs],
  resolvers,
});

schema = trace.transformer(schema);

const server = createServer({
  schema,
  port: 5000,
  context: {
    GraphQLOTELContext: new GraphQLOTELContext(),
  },
});

server
  .start()
  .then(() => console.log("server online"))
  .catch(console.error);
