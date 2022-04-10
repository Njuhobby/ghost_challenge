export class CommentDto {
  id: number;
  content: string;
  descents: CommentDto[];
  createTime: Date;
  timeFromNow: string;
  authorName: string;
  authorAvatarPath: string;
  upvoted: boolean;
}
