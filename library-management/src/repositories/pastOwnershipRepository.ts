import PastOwnership from '../models/entities/pastOwnership';

export class PastOwnershipRepository {

    async createPastOwnership(userId: number, bookId: number, score: number): Promise<PastOwnership> {
        try {
            return await PastOwnership.create({ userId: userId, bookId: bookId, userScore: score });
        } catch (error: any) {
            throw new Error(`Failed to create past ownership record: ${error.message}`);
        }
    }
}