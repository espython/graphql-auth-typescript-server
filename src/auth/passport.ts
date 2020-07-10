import passport from "passport";
import FacebookTokenStrategy from "passport-facebook-token";
import { Request, Response } from "express";

// FACEBOOK STRATEGY
const FacebookTokenStrategyCallback = (
  accessToken: string,
  refreshToken: string,
  profile: object,
  done: any
): Function =>
  done(null, {
    accessToken,
    refreshToken,
    profile,
  });

passport.use(
  "facebook-auth",
  new FacebookTokenStrategy(
    {
      clientID: "312787405753850",
      clientSecret: "0b57aa34748c88721fe0d2b21117dc07",
    },
    FacebookTokenStrategyCallback
  )
);

// promisified authenticate functions
// promisified authenticate functions
export const authenticateFacebook = (
  req: Request,
  res: Response
): Promise<object> =>
  new Promise((resolve, reject) => {
    passport.authenticate(
      "facebook-token",
      { session: false },
      (err, data, info) => {
        if (err) reject(err);
        resolve({ data, info });
      }
    )(req, res);
  });
