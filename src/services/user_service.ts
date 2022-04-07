import User from "../models/user";

export default class UserService {
  async randomlyPickOneUser(): Promise<User> {
    const random = Math.floor(Math.random() * 10);
    return await User.getRepository().findOneById(random);
  }
}
