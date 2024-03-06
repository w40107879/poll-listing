import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const main = async () => {
	try {
		const bitcoin = await prisma.poll.create({
			data: {
				title: 'Is bitcoin worth the time and money that mining requires?',
				type: 'Single'
			}
		})
		const chatbots = await prisma.poll.create({
			data: {
				title: 'Should chatbots replace humans in customer service jobs?',
				type: 'Single'
			}
		})
		const feeling = await prisma.poll.create({
			data: {
				title: 'How are we feeling about 2024?',
				type: 'Single'
			}
		})
		const country = await prisma.poll.create({
			data: {
				title: 'Which country/region have you ever visited? (Select all that applies)',
				type: 'Multi'
			}
		})
		const benefits = await prisma.poll.create({
			data: {
				title: 'Will new benefits encourage you to study or work in mainland?',
				type: 'Single'
			}
		})

		await prisma.answer.createMany({
			data: [
				{
					label: 'Yes',
					poll_id: bitcoin.id
				},
				{
					label: 'No',
					poll_id: bitcoin.id
				},
				{
					label: "Yes",
					poll_id: chatbots.id
				},
				{
					label: "No",
					poll_id: chatbots.id
				},
				{
					label: "Hopeful",
					poll_id: feeling.id
				},
				{
					label: "Doubtful",
					poll_id: feeling.id
				},
				{
					label: "Hong Kong",
					poll_id: country.id
				},
				{
					label: "China",
					poll_id: country.id
				},
				{
					label: "Australia",
					poll_id: country.id
				},
				{
					label: "Thailand",
					poll_id: country.id
				},
				{
					label: "Korea",
					poll_id: country.id
				},
				{
					label: "Japan",
					poll_id: country.id
				},
				{
					label: 'Yes',
					poll_id: benefits.id
				},
				{
					label: 'No',
					poll_id: benefits.id
				},
			]
		})

		console.log({ bitcoin, chatbots, feeling, country, benefits })
	} catch (error) {
		throw error;
	}
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
