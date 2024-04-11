import prisma from '../lib/db';

export default class AnswerModel {
	async increaseVote(id: number) {
		return prisma.answer.update({
			where: {
				id
			},
			data: {
				vote_count: {
					increment: 1
				}
			}
		})
	}
}
