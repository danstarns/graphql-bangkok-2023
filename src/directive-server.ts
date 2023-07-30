import { makeExecutableSchema } from "@graphql-tools/schema";
import { upperCaseDirective } from "./upper-case-directive";
import { createServer } from "@graphql-yoga/node";
import gql from "gql-tag";

const typeDefs = gql`
  type User {
    name: String @upperCase
    age: Int
  }

  type Query {
    users: [User]
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      return [{ name: "Dan", age: 23 }];
    },
  },
};

let schema = makeExecutableSchema({
  typeDefs: [typeDefs, upperCaseDirective.typeDefs],
  resolvers,
});

schema = upperCaseDirective.transformer(schema);

const server = createServer({
  schema,
  port: 5000,
});

server
  .start()
  .then(() => console.log("server online"))
  .catch(console.error);
