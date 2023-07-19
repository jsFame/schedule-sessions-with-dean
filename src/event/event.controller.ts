import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { EventService } from './event.service'
import { CreateEventDto } from './dto/create-event.dto'
import { UpdateEventDto } from './dto/update-event.dto'
import { PrismaService } from '../prisma/prisma.service'
import { JwtGuard } from '../auth/guard'
import { GetUser } from '../auth/decorator'
import { User } from '@prisma/client'

@UseGuards(JwtGuard)
@Controller('events')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly prisma: PrismaService,
  ) {}

  @Post()
  create(@GetUser() user: User, @Body() createEventDto: CreateEventDto) {
    createEventDto.hostId = user.id
    return this.eventService.create(createEventDto)
  }

  @Get()
  findAll() {
    return this.eventService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(id, updateEventDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id)
  }
}
