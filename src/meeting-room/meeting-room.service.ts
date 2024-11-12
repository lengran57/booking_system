import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMeetingRoomDto } from './dto/create-meeting-room.dto';
import { UpdateMeetingRoomDto } from './dto/update-meeting-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MeetingRoom } from './entities/meeting-room.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class MeetingRoomService {
  @InjectRepository(MeetingRoom)
  private repository: Repository<MeetingRoom>;

  initData() {
    const room1 = new MeetingRoom();
    room1.name = '木星';
    room1.capacity = 10;
    room1.equipment = '白板';
    room1.location = '一层西';

    const room2 = new MeetingRoom();
    room2.name = '金星';
    room2.capacity = 5;
    room2.equipment = '';
    room2.location = '二层东';

    const room3 = new MeetingRoom();
    room3.name = '天王星';
    room3.capacity = 30;
    room3.equipment = '白板，电视';
    room3.location = '三层东';

    this.repository.save([room1, room2, room3]);
  }
  async find(
    pageNo: number,
    pageSize: number,
    name: string,
    capacity: number,
    equipment: string,
  ) {
    if (pageNo < 1) {
      throw new BadRequestException('页码数最小为1');
    }
    const skip = (pageNo - 1) * pageSize;

    const condition: Record<string, any> = {};
    if (name) {
      condition.name = Like(`%${name}%`);
    }
    if (equipment) {
      condition.equipment = Like(`%${equipment}%`);
    }
    if (capacity) {
      condition.capacity = capacity;
    }
    const [meetingRooms, totalCount] = await this.repository.findAndCount({
      skip,
      take: pageSize,
      where: condition,
    });

    return {
      meetingRooms,
      totalCount,
    };
  }

  async create(meetingDto: CreateMeetingRoomDto) {
    const room = await this.repository.findOneBy({
      name: meetingDto.name,
    });

    if (room) {
      throw new BadRequestException('房间名称已存在');
    }
    return this.repository.insert(meetingDto);
  }

  async update(meetingDto: UpdateMeetingRoomDto) {
    const room = await this.repository.findOneBy({
      id: meetingDto.id,
    });
    if (!room) {
      throw new BadRequestException('会议室不存在');
    }

    room.capacity = meetingDto.capacity;
    room.location = meetingDto.location;
    room.name = meetingDto.name;

    if (meetingDto.description) {
      room.description = meetingDto.description;
    }

    if (meetingDto.equipment) {
      room.equipment = meetingDto.equipment;
    }

    await this.repository.update(
      {
        id: meetingDto.id,
      },
      room,
    );

    return 'success';
  }

  async findOneBy(id: number) {
    const room = await this.repository.findOneBy({
      id,
    });
    return room;
  }

  async delete(id: number) {
    // const room = await this.repository.findBy(Booking, {
    //   room: {
    //     id: id,
    //   },
    // });
    await this.repository.delete(id);
    return 'success';
  }
}
