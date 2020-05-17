import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema, Resolver, Query, Arg } from "type-graphql";
import { createConnection } from "typeorm";

// import { RegisterResolver } from "./modules/user/Register";

@Resolver()
class HelloResolver {
  @Query(() => String)
  async helloWorld() {
    return "Hello World!";
  }

  @Query(() => String)
  async HelloName(@Arg("name") name: string) {
    return `Hello ${name} i like you soooooooooo much beautiful very very hot hot cold`;
  }
}

const main = async () => {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  const apolloServer = new ApolloServer({ schema });

  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started on http://localhost:4000/graphql");
  });
};

main();
