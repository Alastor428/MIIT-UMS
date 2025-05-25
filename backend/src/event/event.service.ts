import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>
  ) { }
  // Create a new event
  async create(createEventDto: CreateEventDto): Promise<Event> {
    const exist = await this.eventModel.findOne({ title: createEventDto.title }); // Use findOne and await it

    if (exist) {
      throw new HttpException('Event with this title already exists', HttpStatus.BAD_REQUEST);
    }

    const newEvent = new this.eventModel(createEventDto);
    return await newEvent.save();
  }

  // Get all events
  async findAll(): Promise<Event[]> {
    return await this.eventModel.find().exec();
  }

  // Get a single event by title
  async findOne(title: string): Promise<Event> {
    const event = await this.eventModel.findOne({ title: title }).exec();
    if (!event) {
      throw new NotFoundException(`Event with Title: ${title} not found`);
    }
    return event;
  }

  // Get events by priority
  async getEventsByPriority(priority: string) {
    return await this.eventModel.find({ priority });
  }

  // Update an event by ID
  async update(title: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const updatedEvent = await this.eventModel.findOneAndUpdate({ title: title }, updateEventDto, { new: true }).exec();
    if (!updatedEvent) {
      throw new NotFoundException(`Event with Title: ${title} not found`);
    }
    return updatedEvent;
  }

  // Delete an event by ID
  async remove(title: string): Promise<{ message: string }> {
    const deletedEvent = await this.eventModel.findOneAndDelete({ title: title }).exec();
    if (!deletedEvent) {
      throw new NotFoundException(`Event with Title ${title} not found`);
    }
    return { message: `Event with Title ${title} successfully deleted` };
  }
}
