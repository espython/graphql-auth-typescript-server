import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema, Resolver, Query, Arg } from "type-graphql";
import { createConnection } from "typeorm";

// import { RegisterResolver } from "./modules/user/Register";
@Resolver()
class HelloResolver {
  @Query(() => String) // eslint-disable-line 
  async helloWorld() {
    return "Hello World!";
  }

  @Query(() => String) // eslint-disable-line
  async HelloName(@Arg("name") name: string) {
    return `Hello ${name} i like you soooooooooooooooo`;
  }
}

const main = async () => {
  try {
    // { online database
    //   type: "postgres",
    //   url: process.env.PGSQL_URL,
    // }
    await createConnection();
  } catch (error) {
    console.log("Error", error);
  }

  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
  });

  const app = Express();
  // // The GraphQL endpoint
  // app.use("/api/graphql", Express.json());

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started on http://localhost:4000/graphql");
  });
};

main();
