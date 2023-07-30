import { makeExecutableSchema } from "@graphql-tools/schema";
import { createServer } from "@graphql-yoga/node";
import gql from "gql-tag";

const typeDefs = gql`
  type User {
    name: String
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
  typeDefs: [typeDefs],
  resolvers,
});

const server = createServer({
  schema,
  port: 5000,
});

server
  .start()
  .then(() => console.log("server online"))
  .catch(console.error);
