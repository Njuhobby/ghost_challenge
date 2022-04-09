import { UpvoteService, UserService } from "../services";
import User from "../models/user";
import container from "../ioc/inversify.config";

export default class UserController {
  private _userService: UserService;
  private _upvoteService: UpvoteService;

  constructor() {
    this._userService = container.get<UserService>(UserService);
    this._upvoteService = container.get<UpvoteService>(UpvoteService);
  }

  async randomlyPickOneUser(): Promise<User> {
    return await this._userService.randomlyPickOneUser();
  }

  async upvote(userId: number, commentId: number): Promise<void> {
    await this._upvoteService.upvote(userId, commentId);
  }

  async downvote(userId: number, commentId: number): Promise<void> {
    await this._upvoteService.downvote(userId, commentId);
  }
}
