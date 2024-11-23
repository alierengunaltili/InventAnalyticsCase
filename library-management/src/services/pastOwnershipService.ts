import PastOwnership from "@/models/entities/pastOwnership";
import { PastOwnershipRepository } from "@/repositories/pastOwnershipRepository";


export class PastOwnershipService {

    private pastOwnershipRepository: PastOwnershipRepository;

    constructor(){
        this.pastOwnershipRepository = new PastOwnershipRepository();
    }
    

    async createPastOwnership(userId: number, bookId: number, score: number, transaction: any): Promise<PastOwnership> {
        return this.pastOwnershipRepository.createPastOwnership(userId, bookId, score, transaction);
    }
}