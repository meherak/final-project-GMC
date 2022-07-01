// ***
const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");
const Mutation = require("./resolvers/Mutation");
const OnPost = require("./resolvers/OnPost");
const Query = require("./resolvers/Query");
const Post = require("./resolvers/Post");
const AddressModel = require("./models/Address");
const AgencyModel = require("./models/Agency");
const PostModel = require("./models/Post");
const UserModel = require("./models/User");

const isAuth = require("./middlewares/isAuth");
const connectDB = require("./config/connectDB");
require("dotenv").config();

// connect with the database
connectDB();

//graphql resolvers
let resolvers = {
  Query,
  Post,
  OnPost,
  Mutation,
};

// mongoose models
const models = {
  Address: AddressModel,
  Agency: AgencyModel,
  Post: PostModel,
  User: UserModel,
};

// create appolo server
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  cache: "bounded",
  resolvers,
  context: ({ req }) => {
    return {
      user: req && req.headers.authorization ? isAuth(req) : null,
      models,
    };
  },
});

//run the server
server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
