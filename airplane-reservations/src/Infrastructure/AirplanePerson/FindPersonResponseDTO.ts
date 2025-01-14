import { UUID } from "crypto"

export class FindPersonResponseDTO {
    id: UUID
    name: {
        firstName: string
        middleName: string
        lastName: string
    }
    email: {
        emailPrefix: string
        emailPostfix: string
    }
}