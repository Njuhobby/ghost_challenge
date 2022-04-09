import { Column, PrimaryGeneratedColumn, Entity, BaseEntity } from "typeorm";

@Entity("upvote")
export default class Upvote extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("integer", {
    name: "comment_id",
  })
  commentId: number | null;

  @Column("integer", {
    name: "user_id",
    nullable: false,
  })
  userId: number;
}
