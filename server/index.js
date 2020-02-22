const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");
const { MONGODB } = require("./config");
const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`;

const resolvers = {
  Query: {
    sayHi: () => "Hello World!"
  }
};

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers
});

// in mongoDB site click on connectApp in your cluster to get this connect stings
mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("Mongodb connected");
    return server.listen({ port: 5000 });
  })
  .then(res => {
    console.log(`server is running on ${res.url}`);
  });

// node index to run server
