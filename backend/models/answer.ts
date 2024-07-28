import prisma from '../lib/db';

export default class AnswerModel {
	async increaseVotes(ids: number[]) {
		return prisma.answer.updateMany({
			where: {
				id: {
					in: ids
				}
			},
			data: {
				vote_count: {
					increment: 1
				}
			}
		})
	}
}
