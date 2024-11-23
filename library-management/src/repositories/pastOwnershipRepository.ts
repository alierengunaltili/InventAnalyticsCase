import PastOwnership from "@/models/entities/pastOwnership";
import { safeExecute } from '@/utils/repositoryErrorHandler';

export class PastOwnershipRepository {

    async createPastOwnership(userId: number, bookId: number, score: number, transaction: any): Promise<PastOwnership> {
        try {
            return await PastOwnership.create({ userId, bookId, score }, {transaction: transaction });
        } catch (error: any) {
            throw new Error(`Failed to create past ownership record: ${error.message}`);
        }
    }
}