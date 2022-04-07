import Upvote from "../models/upvote";

export default class UpvoteService {
  async upvote(user_id: number, comment_id: number): Promise<number> {
    const upvote = new Upvote();
    upvote.comment_id = comment_id;
    upvote.user_id = user_id;
    await upvote.save();
    return upvote.id;
  }

  async downvote(user_id: number, comment_id: number): Promise<void> {
    const upvote = await Upvote.getRepository().findOne({
      where: { user_id: user_id, comment_id: comment_id },
    });
    if (upvote !== null) await Upvote.getRepository().remove(upvote);
  }
}
