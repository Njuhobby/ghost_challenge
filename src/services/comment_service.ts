import Comment from "../models/comment";
import { getManager } from "typeorm";
import _ from "lodash";

export class CommentDto {
  id: number;
  content: string;
  descents: CommentDto[];
}

export default class CommentService {
  async createComment(
    author_id: number,
    content: string,
    parent_id?: number
  ): Promise<number> {
    const comment = new Comment();
    comment.author_id = author_id;
    comment.content = content;
    if (parent_id) comment.parent_id = parent_id;
    await comment.save();
    return comment.id;
  }

  async getComments(onlyRootComments = true): Promise<CommentDto[]> {
    if (onlyRootComments) {
      const comments = await getManager().find(Comment, {
        where: { parent_id: null },
      });
      return _.orderBy(comments, (x) => {
        x.create_time.getTime();
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
