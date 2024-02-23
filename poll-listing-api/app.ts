import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
