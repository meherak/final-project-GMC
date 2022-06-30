// ***
const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");
const Query = require("./resolvers/Query");
const Post = require("./resolvers/Post");
const OnPost = require("./resolvers/OnPost");
const connectDB = require("./config/connectDB");
require("dotenv").config();

// connect with the database
connectDB();

//graphql resolvers
let resolvers = {
  Query,
  Post,
  OnPost,
};

// create appolo server
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
});

//run the server
server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
