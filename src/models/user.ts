import { Column, PrimaryGeneratedColumn, Entity, BaseEntity } from "typeorm";

@Entity("user")
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varying character", {
    name: "name",
    nullable: false,
  })
  name: string;

  @Column("varying character", {
    name: "avatar_path",
    nullable: false,
  })
  avatar_path: string;
}
