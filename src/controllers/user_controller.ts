import { UpvoteService, UserService } from "../services";
import User from "../models/user";
import container from "../ioc/inversify.config";
import { Server } from "socket.io";

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

  async upvote(param: {
    userId: number;
    commentId: number;
    io: Server;
  }): Promise<number> {
    await this._upvoteService.upvote(param.userId, param.commentId);
    param.io.emit("upvote", {
      userId: param.userId,
      commentId: param.commentId,
      upvoted: true,
    });
    return param.userId;
  }

  async downvote(param: {
    userId: number;
    commentId: number;
    io: Server;
  }): Promise<number> {
    await this._upvoteService.downvote(param.userId, param.commentId);
    param.io.emit("upvote", {
      userId: param.userId,
      commentId: param.commentId,
      upvoted: false,
    });
    return param.userId;
  }
}
