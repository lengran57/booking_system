import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
  DefaultValuePipe,
  Put,
} from '@nestjs/common';
import { MeetingRoomService } from './meeting-room.service';
import { CreateMeetingRoomDto } from './dto/create-meeting-room.dto';
import { UpdateMeetingRoomDto } from './dto/update-meeting-room.dto';
import { generateParseIntPipe } from 'src/utils/pipes';

@Controller('meeting-room')
export class MeetingRoomController {
  constructor(private readonly meetingRoomService: MeetingRoomService) {}

  @Inject(MeetingRoomService)
  private mettingService: MeetingRoomService;

  @Get('init-data')
  initData() {
    this.mettingService.initData();
  }

  @Get('list')
  async list(
    @Query('pageNo', new DefaultValuePipe(1), generateParseIntPipe('pageNo'))
    pageNo: number,
    @Query(
      'paegSize',
      new DefaultValuePipe(2),
      generateParseIntPipe('paegSize'),
    )
    pageSize: number,
    @Query('name') name: string,
    @Query('capacity') capacity: number,
    @Query('equipment') equipment: string,
  ) {
    return await this.meetingRoomService.find(
      pageNo,
      pageSize,
      name,
      capacity,
      equipment,
    );
  }

  @Get(':id')
  async find(@Param('id') id: number) {
    return await this.mettingService.findOneBy(id);
  }

  @Post('create')
  async create(@Body() meetingDto: CreateMeetingRoomDto) {
    return await this.mettingService.create(meetingDto);
  }

  @Put('update')
  async update(@Body() meetingDto: UpdateMeetingRoomDto) {
    return await this.mettingService.update(meetingDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.meetingRoomService.delete(id);
  }
}
