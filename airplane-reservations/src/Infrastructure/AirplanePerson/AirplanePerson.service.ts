import { HttpService } from "@nestjs/axios";
import { HttpServer } from "@nestjs/common";
import { UUID } from "crypto";

export class AirplanePersonService {

    constructor(private httpService: HttpService) { }

    public findPerson(personId: UUID) {
        const res = this.httpService.get(`localhost:3001/person/${personId}`)
    }

}