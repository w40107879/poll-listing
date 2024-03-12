import prisma from '../lib/db';

export default class PollModel {
	async getAll() {
		return prisma.poll.findMany();
	}

	async getVoteByPoll(id: number) {
		return prisma.poll.findFirst({
			where: {
				id
			},
			include: {
				answer: true
			}
		})
	}
}
