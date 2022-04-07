import { UserService } from "../services";
import User from "../models/user";

export default class UserController {
  async randomlyPickOneUser(): Promise<User> {
    const userService = new UserService();
    return await userService.randomlyPickOneUser();
  }
}
