import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Post('create')
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get('all')
  findAll() {
    return this.eventService.findAll();
  }

  @Get('/get-event')
  findOne(@Body('title') title: string) {
    return this.eventService.findOne(title);
  }

  @Get(':priority')
  async getEventsByPriority(@Param('priority') priority: string) {
    return this.eventService.getEventsByPriority(priority)
  }

  @Patch('update/:title')
  update(@Param('title') title: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(title, updateEventDto);
  }

  @Delete(':title')
  remove(@Param('title') title: string) {
    return this.eventService.remove(title);
  }
}
