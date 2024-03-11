import prisma from '../lib/db';

export default class PollModel {
	getAll() {
		return prisma.poll.findMany();
	}
}
