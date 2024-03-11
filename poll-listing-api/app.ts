import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import { RegisterRoutes } from './build/routes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

RegisterRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
