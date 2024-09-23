import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
// Enable CORS for all routes
app.use(cors());

const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});