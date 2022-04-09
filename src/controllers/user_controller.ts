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

  async upvote(param: { userId: number; commentId: number }): Promise<number> {
    await this._upvoteService.upvote(param.userId, param.commentId);
    return param.userId;
  }

  async downvote(param: {
    userId: number;
    commentId: number;
  }): Promise<number> {
    await this._upvoteService.downvote(param.userId, param.commentId);
    return param.userId;
  }
}
