export class CommentDto {
  id: number;
  content: string;
  descents: CommentDto[];
  createTime: Date;
  authorName: string;
  authorAvatarPath: string;
  upvoted: boolean;
}
