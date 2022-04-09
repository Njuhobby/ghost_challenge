import { UpvoteService, UserService } from "../services";
import User from "../models/user";
import { inject } from "inversify";

export default class UserController {
  @inject(UserService)
  private _userService: UserService;

  @inject(UpvoteService)
  private _upvoteService: UpvoteService;

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
