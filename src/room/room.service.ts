import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './room.entity';

@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room) private roomRepository) {}

  async show(data) {
    const query = await this.roomRepository.createQueryBuilder('room');

    if (data.id) query.where({ id: data.id });

    if (data.name || data.description) {
      query.andWhere(
        `room.name LIKE '%${data.name}%' OR room.description LIKE '%${data.description}%'`,
      );
    }

    if (data.maxUsers) {
      query.andWhere({ maxUsers: data.maxUsers });
    }

    if (data.page && data.perPage) {
      query.offset((data.page - 1) * data.perPage).limit(data.perPage);
    }

    const [result, count] = await query.getManyAndCount();

    return { result: { data: result, count } };
  }

  async create(data) {
    const room = this.roomRepository.create(data);

    return await this.roomRepository.save(room);
  }

  async delete({ id }) {
    await this.roomRepository
      .createQueryBuilder()
      .delete()
      .from(Room)
      .where({ id })
      .execute();

    return 'Room successfully deleted';
  }

  async update(data) {
    await this.roomRepository
      .createQueryBuilder()
      .update(Room)
      .set(data)
      .where({ id: data.id })
      .execute();
  }
}
