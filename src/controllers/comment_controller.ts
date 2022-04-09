import { CommentService } from "../services";
import { CommentDto } from "../dtos/comment_related_dtos";
import container from "../ioc/inversify.config";

export default class CommentController {
  private _commentService: CommentService;

  constructor() {
    this._commentService = container.get<CommentService>(CommentService);
  }

  async createComment(param: {
    content: string;
    authorId: number;
    parentId?: number;
  }): Promise<number> {
    return await this._commentService.createComment(
      param.authorId,
      param.content,
      param.parentId
    );
  }

  async getComments(param: {
    userId: number;
    onlyRootComments: boolean;
  }): Promise<CommentDto[]> {
    return await this._commentService.getComments(
      param.userId,
      param.onlyRootComments
    );
  }
}
