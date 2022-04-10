import { connectionHook } from "../jest.utils";
import { getManager } from "typeorm";
import Comment from "../../models/comment";
import CommentController from "../../controllers/comment_controller";

describe("comment_controller", () => {
  connectionHook();
  describe("create comment", () => {
    it("should create comment successfully", async () => {
      const em = getManager();
      const controller = new CommentController();
      const newCommentId = await controller.createComment({
        content: "test comment",
        authorId: 1,
        parentId: null,
      });
      const newComment = await em.findOne(Comment, {
        where: { id: newCommentId },
      });
      expect(newComment).toMatchObject({
        id: newCommentId,
        parentId: null,
        content: "test comment",
      });
      await em.remove(newComment);
    });
  });

  describe("get comment", () => {
    it("should get all root comments", async () => {
      const controller = new CommentController();
      const rootComments = await controller.getComments({
        userId: 1,
        onlyRootComments: true,
      });
      expect(rootComments).toHaveLength(3);
    });
  });
});
