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
      const rawResults = await getManager()
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
      const rawResults = await getManager()
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
        .addSelect("c2.id", "child_id")
        .addSelect("c2.content", "child_content")
        .addSelect("c2.create_time", "child_create_time")
        .addSelect("u2.name", "child_user_name")
        .addSelect("u2.avatar_path", "child_avatar_path")
        .addSelect(
          "CASE WHEN uv2.user_id IS NULL THEN false ELSE true END",
          "child_upvoted"
        )
        .from("comment", "c")
        .innerJoin("user", "u", "c.author_id=u.id")
        .leftJoin("upvote", "uv", "uv.comment_id=c.id AND uv.user_id=:userId", {
          userId,
        })
        .leftJoin("comment", "c2", "c2.parent_id=c.id")
        .leftJoin("user", "u2", "c2.author_id=u2.id")
        .leftJoin(
          "upvote",
          "uv2",
          "uv2.comment_id=c2.id AND uv2.user_id=:userId",
          {
            userId,
          }
        )
        .where("c.parent_id IS NULL")
        .orderBy("c.id, c2.id")
        .getRawMany();

      const results: CommentDto[] = [];
      const reduced = rawResults.reduce((p, c) => {
        if (p.id) {
          if (!p.descents) {
            const dto: CommentDto = {
              id: p.id,
              content: p.content,
              createTime: p.create_time,
              authorName: p.user_name,
              authorAvatarPath: p.user_avatar_path,
              upvoted: p.upvoted,
              descents: [],
            };
            if (p.child_id) {
              dto.descents.push({
                id: p.child_id,
                content: p.child_content,
                authorAvatarPath: p.child_avatar_path,
                authorName: p.child_user_name,
                createTime: p.child_create_time,
                upvoted: p.child_upvoted,
                descents: [],
              });
            }
            p = dto;
          }
          if (p.id === c.id) {
            p.descents.push({
              id: c.child_id,
              content: c.child_content,
              createTime: c.child_create_time,
              authorName: c.child_user_name,
              authorAvatarPath: c.child_avatar_path,
              upvoted: c.child_upvoted,
            });
            return p;
          } else {
            results.push(p);
            return c;
          }
        } else return c;
      }, {});
      if (!reduced.descents) {
        const lastElement: CommentDto = {
          id: reduced.id,
          content: reduced.content,
          createTime: reduced.createTime,
          upvoted: reduced.upvoted,
          authorName: reduced.user_name,
          authorAvatarPath: reduced.user_avatar_path,
          descents: [],
        };
        if (reduced.child_id) {
          lastElement.descents.push({
            id: reduced.child_id,
            content: reduced.child_content,
            createTime: reduced.child_create_time,
            upvoted: reduced.child_upvoted,
            descents: [],
            authorName: reduced.child_user_name,
            authorAvatarPath: reduced.child_avatar_path,
          });
        }
        results.push(lastElement);
      }

      return results;
    }
  }
}
