import Upvote from "../models/upvote";
import { getManager } from "typeorm";
import { injectable } from "inversify";

@injectable()
export default class UpvoteService {
  async upvote(userId: number, commentId: number): Promise<number> {
    const em = getManager();
    const existing = await em.findOne(Upvote, {
      where: { commentId, userId },
    });
    if (existing) return existing.id;
    const upvote = new Upvote();
    upvote.commentId = commentId;
    upvote.userId = userId;
    await em.save(Upvote, upvote);
    return upvote.id;
  }

  async downvote(userId: number, commentId: number): Promise<void> {
    const upvote = await Upvote.getRepository().findOne({
      where: { userId, commentId },
    });
    if (upvote !== null) await getManager().remove(upvote);
  }
}
