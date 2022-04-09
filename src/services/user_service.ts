import User from "../models/user";
import { getManager } from "typeorm";

export default class UserService {
  async randomlyPickOneUser(): Promise<User> {
    const random = Math.floor(Math.random() * 10);
    return await getManager().findOneById(User, random);
  }
}
