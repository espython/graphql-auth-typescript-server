import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express, { Request, Response } from "express";
import { buildSchema, Resolver, Query, Arg } from "type-graphql";
import { createConnection } from "typeorm";
import { Context } from "./typesDef";

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
    context: (req: Request, res: Response): Context => ({ req, res }),
  });

  const app = Express();
  // // The GraphQL endpoint
  // app.use("/api/graphql",);
  // apolloServer.graphqlPath = "/api/graphql";

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started on http://localhost:4000/graphql");
  });
};

main();
