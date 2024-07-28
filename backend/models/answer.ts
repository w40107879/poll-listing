import prisma from '../lib/db';

export default class AnswerModel {
	async increaseVote(ids: number[]) {
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
