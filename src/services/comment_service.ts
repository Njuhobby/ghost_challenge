import Comment from "../models/comment";
import { getManager } from "typeorm";
import _ from "lodash";
import { injectable } from "inversify";
import { CommentDto } from "../dtos/comment_related_dtos";

@injectable()
export default class CommentService {
  async createComment(
    authorId: number,
    content: string,
    parentId?: number
  ): Promise<number> {
    const comment = new Comment();
    comment.authorId = authorId;
    comment.content = content;
    if (parentId) comment.parentId = parentId;
    await comment.save();
    return comment.id;
  }

  async getComments(onlyRootComments = true): Promise<CommentDto[]> {
    if (onlyRootComments) {
      const comments = await getManager().find(Comment, {
        where: { parentId: null },
      });
      return _.orderBy(comments, (x) => {
        x.createTime.getTime();
      }).map((x) => ({
        id: x.id,
        descents: [],
        content: x.content,
      }));
    } else {
      throw new Error("Not implemented");
    }
  }
}
