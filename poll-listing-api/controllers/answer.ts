import { Example, Route, Post, Controller, Body } from 'tsoa';
import AnswerModel from '../models/answer';
import AnswerService from '../services/answer';

@Route('answer')
export class AnswerController extends Controller {
  private answerModel: AnswerModel
  private answerService: AnswerService
  constructor() {
    super();
    this.answerModel = new AnswerModel();
    this.answerService = new AnswerService(this.answerModel);
  }

  @Post('/')
  @Example({
    code: 200,
  })
	public async vote (@Body() body: any) {
		const { id } = body;
		return await this.answerService.increaseVote(id);
	}

}

// export const createVotes = (req: any, res: any) => {
//   const { id } = req.params;
//   const { option } = req.body;

// 	const filePath = resolve(__dirname, "../db/polls-vote.json");
//   // Read the existing JSON file
//   readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//       console.error('Error reading file:', err);
//       return res.status(500).send('Internal Server Error');
//     }

//     // Parse the JSON data
//     const votes = JSON.parse(data);

//     // Add the new vote to the votes array
//     votes.votes.push({
//       id: votes.votes.length + 1, // Assign a new ID (you might want to improve this logic)
//       polls_id: parseInt(id),
//       answers_id: parseInt(option)
//     });

//     // Convert the votes object back to JSON
//     const updatedData = JSON.stringify(votes, null, 2); // 2 spaces for indentation

//     // Write the updated JSON data back to the file
//     writeFile(filePath, updatedData, 'utf8', (err) => {
//       if (err) {
//         console.error('Error writing file:', err);
//         return res.status(500).send('Internal Server Error');
//       }

//       console.log('Vote added successfully:', { id, option });
//       res.status(200).send('Poll submitted successfully');
//     });
//   });
// }
