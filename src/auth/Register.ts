import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
} from "type-graphql";
import * as bcrypt from "bcryptjs";

import { User } from "../models/User";
// import { authenticateFacebook } from "./passport";

@Resolver(User)
export class RegisterResolver {
  @Query(() => String)
  hello(): string {
    return "Hello World!";
  }

  @FieldResolver()
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Mutation(() => User)
  async register(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();

    return user;
  }

  // @Mutation(() => User)
  // async authFacebook(
  //   _,
  //   { input: { accessToken } },
  //   { req, res }
  // ): Promise<User> {
  //   req.body = {
  //     ...req.body,
  //     access_token: accessToken,
  //   };

  //   try {
  //     // data contains the accessToken, refreshToken and profile from passport
  //     const { data, info } = await authenticateFacebook(req, res);

  //     if (data) {
  //       const user = await User.upsertFbUser(data);

  //       if (user) {
  //         return {
  //           name: user.name,
  //           token: user.generateJWT(),
  //         };
  //       }
  //     }

  //     if (info) {
  //       console.log(info);
  //       switch (info.code) {
  //         case "ETIMEDOUT":
  //           return new Error("Failed to reach Facebook: Try Again");
  //         default:
  //           return new Error("something went wrong");
  //       }
  //     }
  //     return Error("server error");
  //   } catch (error) {
  //     return error;
  //   }
  // }
}
