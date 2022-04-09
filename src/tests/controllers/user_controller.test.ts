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
      await controller.upvote(0, 0);
      const upvote = await em.findOne(Upvote, {
        where: { commentId: 0, userId: 0 },
      });
      expect(upvote).not.toBeNull();
    });

    it("should downvote successfully", async () => {
      await controller.downvote(0, 0);
      const upvote = await em.findOne(Upvote, {
        where: { commentId: 0, userId: 0 },
      });
      expect(upvote).toBeNull();
    });
  });
});
