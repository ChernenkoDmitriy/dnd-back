import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    unique: true,
  })
  login: string;

  @Column({
    nullable: true,
    default: null,
  })
  confirmation_send_at: Date;

  @Column({
    nullable: true,
    default: null,
  })
  activated_at: Date;
}
