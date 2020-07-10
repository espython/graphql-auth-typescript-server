import { Request, Response } from "express";

// Context Interface definitions
export interface Context {
  req: Request;
  res: Response;
}
