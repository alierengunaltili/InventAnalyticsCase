import { PastOwnershipRepository } from '../repositories/pastOwnershipRepository';
import PastOwnership from '../models/entities/pastOwnership';


export class PastOwnershipService {

    private pastOwnershipRepository: PastOwnershipRepository;

    constructor(){
        this.pastOwnershipRepository = new PastOwnershipRepository();
    }
    

    async createPastOwnership(userId: number, bookId: number, score: number): Promise<PastOwnership> {
        return this.pastOwnershipRepository.createPastOwnership(userId, bookId, score);
    }
}