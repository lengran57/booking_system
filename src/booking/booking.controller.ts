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
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { RequireLogin, UserInfo } from 'src/custom.decorator';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('init-data')
  initData() {
    return this.bookingService.initData();
  }

  @Get('list')
  async list(
    @Query('pageNo', new DefaultValuePipe(1)) pageNo: number,
    @Query('pageSize', new DefaultValuePipe(2)) pageSize: number,
    @Query('username') username: string,
    @Query('meetingRoomName') meetingRoomName: string,
    @Query('meetingRoomPosition') meetingRoomPosition: string,
    @Query('bookingTimeRangeStart') bookingTimeRangeStart: number,
    @Query('bookingTimeRangeEnd') bookingTimeRangeEnd: number,
  ) {
    return this.bookingService.find(
      pageNo,
      pageSize,
      username,
      meetingRoomName,
      meetingRoomPosition,
      bookingTimeRangeStart,
      bookingTimeRangeEnd,
    );
  }

  @Post('create')
  @RequireLogin()
  async create(
    @Body() booking: CreateBookingDto,
    @UserInfo('userId') userId: number,
  ) {
    return await this.bookingService.create(booking, userId);
  }

  @Get('status')
  async changeStatus(@Query('id') id: number, @Query('type') type: number) {
    return await this.bookingService.changeStatus(id, type);
  }

  @Get('urge/:id')
  async urge(@Param('id') id: number) {
    return this.bookingService.urge(id);
  }
}
