import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Response,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { Response as Res } from 'express';
import { CreateRoomDto } from './dto/create-room.dto';
import { IdDto } from './dto/id.dto';
import { UpdateRoomDto } from './dto/update.room.dto';
import { ShowRoomDto } from './dto/show.room.dto';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get()
  async show(@Query() dto: ShowRoomDto, @Response() res: Res) {
    const { result } = await this.roomService.show(dto);

    res.json(result);
  }

  @Post()
  async create(@Body() dto: CreateRoomDto, @Response() res: Res) {
    const result = await this.roomService.create(dto);

    res.json(result);
  }

  @Delete(':id')
  async delete(@Param() dto: IdDto, @Response() res: Res) {
    const result = await this.roomService.delete(dto);

    res.json(result);
  }

  @Put()
  async update(@Body() dto: UpdateRoomDto, @Response() res: Res) {
    const result = await this.roomService.update(dto);

    res.json(result);
  }
}
