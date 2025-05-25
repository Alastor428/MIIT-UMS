import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { eventSchema } from './schemas/event.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Event.name, schema: eventSchema }])],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService, MongooseModule]
})
export class EventModule { }
