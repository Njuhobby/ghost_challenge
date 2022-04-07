import { CommentService } from "../services";
import { CommentDto } from "../services/comment_service";

export default class CommentController {
  async createComment(
    content: string,
    author_id: number,
    parent_id?: number
  ): Promise<number> {
    const commentService = new CommentService();
    return await commentService.createComment(author_id, content, parent_id);
  }

  async getComments(onlyRootComments: boolean): Promise<CommentDto[]> {
    const commentService = new CommentService();
    return await commentService.getComments(onlyRootComments);
  }
}
