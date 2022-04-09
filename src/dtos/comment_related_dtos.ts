export class CommentDto {
  id: number;
  content: string;
  descents: CommentDto[];
}
