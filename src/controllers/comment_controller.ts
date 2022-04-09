import { CommentService } from "../services";
import { CommentDto } from "../dtos/comment_related_dtos";
import { inject } from "inversify";

export default class CommentController {
  @inject(CommentService)
  private _commentService: CommentService;

  async createComment(
    content: string,
    authorId: number,
    parentId?: number
  ): Promise<number> {
    return await this._commentService.createComment(
      authorId,
      content,
      parentId
    );
  }

  async getComments(onlyRootComments: boolean): Promise<CommentDto[]> {
    return await this._commentService.getComments(onlyRootComments);
  }
}
