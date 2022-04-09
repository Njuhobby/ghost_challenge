import { connectionHook, transactionHook } from "../jest.utils";
import { getManager } from "typeorm";
import Comment from "../../models/comment";
import CommentController from "../../controllers/comment_controller";

describe("comment_controller", () => {
  connectionHook();
  describe("create comment", () => {
    transactionHook();
    it("should create comment successfully", async () => {
      const em = getManager();
      const controller = new CommentController();
      const newCommentId = await controller.createComment(
        "test comment",
        0,
        null
      );
      const newComment = await em.findOneById(Comment, newCommentId);
      expect(newComment).toMatchObject({
        id: newCommentId,
        parentId: null,
        content: "test comment",
      });
    });
  });

  describe("get comment", () => {
    transactionHook();
    it("should get all root comments", async () => {
      const controller = new CommentController();
      const rootComments = await controller.getComments(true);
      expect(rootComments).toHaveLength(3);
    });
  });
});
