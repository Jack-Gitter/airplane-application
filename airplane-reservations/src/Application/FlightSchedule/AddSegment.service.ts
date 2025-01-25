import { BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UUID } from "crypto";
import { Segment } from "src/Domain/FlightSchedule/Entity/Segment";
import { FlightSchedule } from "src/Domain/FlightSchedule/FlightSchedule";
import { Location } from "src/Domain/FlightSchedule/ValueObjects/Location";
import { Repository } from "typeorm";

export class AddSegmentService {

    constructor(
        @InjectRepository(FlightSchedule) private flightScheduleRepository: Repository<FlightSchedule>
    ) {}

    public async addSegment(scheduleId: UUID, toName: string, toLongitude: number, toLatitude: number, fromName: string, fromLongitude: number, fromLatitude: number, start: Date, end: Date) {
        await this.flightScheduleRepository.manager.transaction(async (entityManager) => {
            const to = new Location(toName, toLongitude, toLatitude)
            const from = new Location(fromName, fromLongitude, fromLatitude)
            const segment = new Segment(to, from, start, end)
            const flightScheduleRepository = entityManager.getRepository(FlightSchedule)
            
            const flightSchedule = await flightScheduleRepository.findOne({
                relations: ['segments'],
                where: {id: scheduleId}
            })

            if (!flightSchedule) {
                throw new BadRequestException(`No schedule with id ${scheduleId}`)
            }

            flightSchedule.addSegment(segment)

            return await this.flightScheduleRepository.save(flightSchedule)
        })
    }

}