import User from "../models/user";
import { getManager } from "typeorm";
import { injectable } from "inversify";

@injectable()
export default class UserService {
  async randomlyPickOneUser(): Promise<User> {
    const random = Math.floor(Math.random() * 10) + 1;
    return await getManager().findOneById(User, random);
  }
}
