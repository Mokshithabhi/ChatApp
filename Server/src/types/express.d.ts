import { IUser } from "../Models/declarations/modelDec";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
