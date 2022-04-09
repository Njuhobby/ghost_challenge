import Comment from "../models/comment";
import { getManager } from "typeorm";
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
    await getManager().save(Comment, comment);
    return comment.id;
  }

  async getComments(
    userId: number,
    onlyRootComments = true
  ): Promise<CommentDto[]> {
    if (onlyRootComments) {
      const em = getManager();
      const rawResults = await em
        .createQueryBuilder()
        .addSelect("c.id", "id")
        .addSelect("c.content", "content")
        .addSelect("c.create_time", "create_time")
        .addSelect("u.name", "user_name")
        .addSelect("u.avatar_path", "user_avatar_path")
        .addSelect(
          "CASE WHEN uv.user_id IS NULL THEN false ELSE true END",
          "upvoted"
        )
        .from(Comment, "c")
        .innerJoin("user", "u", "c.author_id=u.id")
        .leftJoin("upvote", "uv", "uv.comment_id=c.id AND uv.user_id=:userId", {
          userId,
        })
        .orderBy("c.create_time")
        .getRawMany();
      return rawResults.map((r) => ({
        id: r.id,
        descents: [],
        content: r.content,
        createTime: r.create_time,
        authorName: r.user_name,
        authorAvatarPath: r.user_avatar_path,
        upvoted: r.upvoted,
      }));
    } else {
      throw new Error("Not implemented");
    }
  }
}
