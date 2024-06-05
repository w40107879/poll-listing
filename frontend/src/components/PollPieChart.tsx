import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js'
import { PollAnswer, Answer } from '@root/types/pollAnswer';

Chart.register(ArcElement);

interface Props {
  vote: PollAnswer
}

export default function PollPieChart({ vote }: Props) {
  return (
    <Pie
			data={{
				labels: vote.answers.map((answer: Answer) => answer.label),
				datasets: [{
					data: vote.answers.map((answer: Answer) => answer.vote_count),
					backgroundColor: [
						'rgba(255, 99, 132, 0.6)',
						'rgba(54, 162, 235, 0.6)',
						'rgba(255, 206, 86, 0.6)',
						'rgba(75, 192, 192, 0.6)',
						'rgba(153, 102, 255, 0.6)',
						'rgba(255, 159, 64, 0.6)',
					],
				}],
			}}
			options={{
				// title: {
				// 	display: true,
				// 	text: 'Poll Results',
				// 	fontSize: 20,
				// },
				// legend: {
				// 	display: true,
				// 	position: 'right',
				// },
				responsive: true,
				aspectRatio: 4,
			}}
		/>
  );
}
