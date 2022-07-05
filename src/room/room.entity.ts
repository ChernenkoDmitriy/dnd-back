import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
@Unique('UQ_ROOM', ['name'])
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  description: string;

  @Column()
  maxUsers: number;

  @ManyToOne(() => User, (user) => user.id)
  users: User[];
}
