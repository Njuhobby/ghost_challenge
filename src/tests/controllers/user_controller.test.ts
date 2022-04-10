import { connectionHook, transactionHook } from "../jest.utils";
import { getManager } from "typeorm";
import Upvote from "../../models/upvote";
import UserController from "../../controllers/user_controller";

describe("user_controller", () => {
  connectionHook();
  describe("randomly pick one user", () => {
    transactionHook();
    it("should return one user", async () => {
      const em = getManager();
      const controller = new UserController();
      const randomUser = await controller.randomlyPickOneUser();
      expect(randomUser).not.toBeNull();
    });
  });

  describe("upvote", () => {
    transactionHook();
    const em = getManager();
    const controller = new UserController();
    it("should upvote successfully", async () => {
      await controller.upvote({
        userId: 1,
        commentId: 1,
        io: null,
      });
      const upvote = await em.findOne(Upvote, {
        where: { commentId: 1, userId: 1 },
      });
      expect(upvote).not.toBeNull();
    });

    it("should downvote successfully", async () => {
      await controller.downvote({
        userId: 1,
        commentId: 1,
        io: null,
      });
      const upvote = await em.findOne(Upvote, {
        where: { commentId: 1, userId: 1 },
      });
      expect(upvote).toBeNull();
    });
  });
});
