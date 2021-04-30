const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
// var { buildSchema } = require("graphql");

const app = express();

// // GraphQL schema
// var schema = buildSchema(`
//     type Query {
//         message: String
//     }
// `);
// // Root resolver
// var root = {
//   message: () => "Hello World!",
// };

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    // rootValue: root,
    graphiql: true, // to deploy the graphQL playground
  })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    "Express GraphQL Server Now Running On localhost:" + PORT + "/graphql"
  )
);
