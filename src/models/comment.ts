import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity("comment")
export default class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("integer", {
    name: "parent_id",
  })
  parent_id: number;

  @Column("character varying", {
    name: "content",
    nullable: false,
  })
  content: string;

  @Column("integer", {
    name: "author_id",
    nullable: false,
  })
  author_id: number;

  @Column("timestamp with time zone", {
    name: "create_time",
    nullable: false,
  })
  create_time: Date;
}
