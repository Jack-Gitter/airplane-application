import { HttpService } from "@nestjs/axios";
import { UUID } from "crypto";
import { firstValueFrom } from "rxjs";
import { FindPersonResponseDTO } from "./FindPersonResponseDTO";
import { HttpCode, Injectable, NotFoundException } from "@nestjs/common";
import { AxiosError } from "axios";

@Injectable()
export class AirplanePersonService {

    constructor(private httpService: HttpService) { }

    public async findPerson(personId: UUID): Promise<UUID> {
        try {
            const res = await firstValueFrom(this.httpService.get<FindPersonResponseDTO>(`http://localhost:3001/person/${personId}`)) 
            return res.data.id
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.status === 404) {
                    throw new NotFoundException(`Cannot find person with id ${personId}`)
                }
            }
            throw e
        }
    }

}