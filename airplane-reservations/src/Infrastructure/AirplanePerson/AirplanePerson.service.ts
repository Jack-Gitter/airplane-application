import { HttpService } from "@nestjs/axios";
import { UUID } from "crypto";
import { firstValueFrom } from "rxjs";
import { FindPersonResponseDTO } from "./FindPersonResponseDTO";

export class AirplanePersonService {

    constructor(private httpService: HttpService) { }

    public async findPerson(personId: UUID): Promise<UUID> {
        const res = await firstValueFrom(this.httpService.get<FindPersonResponseDTO>(`localhost:3001/person/${personId}`)) 
        return res.data.id
    }

}