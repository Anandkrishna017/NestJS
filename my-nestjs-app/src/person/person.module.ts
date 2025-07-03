import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { PersonInfo } from './entities/person-info.entity';
import { PersonDetails } from './entities/person-details.entity';
import { PersonEvent } from './entities/person-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonInfo, PersonDetails, PersonEvent])],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}
