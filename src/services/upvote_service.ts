import Upvote from "../models/upvote";

export default class UpvoteService {
  async upvote(userId: number, commentId: number): Promise<number> {
    const upvote = new Upvote();
    upvote.commentId = commentId;
    upvote.userId = userId;
    await upvote.save();
    return upvote.id;
  }

  async downvote(userId: number, commentId: number): Promise<void> {
    const upvote = await Upvote.getRepository().findOne({
      where: { userId, commentId },
    });
    if (upvote !== null) await Upvote.getRepository().remove(upvote);
  }
}
