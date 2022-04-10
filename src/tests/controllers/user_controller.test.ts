import { connectionHook } from "../jest.utils";
import { getManager, EntityManager } from "typeorm";
import Upvote from "../../models/upvote";
import UserController from "../../controllers/user_controller";

describe("user_controller", () => {
  connectionHook();
  describe("randomly pick one user", () => {
    it("should return one user", async () => {
      const em = getManager();
      const controller = new UserController();
      const randomUser = await controller.randomlyPickOneUser();
      expect(randomUser).not.toBeNull();
    });
  });

  describe("upvote", () => {
    let em: EntityManager;
    let controller: UserController;
    it("should upvote successfully", async () => {
      em = getManager();
      controller = new UserController();
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
      em = getManager();
      controller = new UserController();
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
