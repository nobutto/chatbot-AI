import express from 'express'; 
import OpenAI from 'openai';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
app.use(cors());

app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const message = req.body.message;
  if (!message) {
    return res.status(400).json({ error: 'メッセージが必要です。' });
  }
  try {
    const chatCompletion = await openAI.chat.completions.create({
      model: 'gpt-4.1-nano',
      messages: [
        { role: 'system', content: 'あなたは親しみやすい子供です。' },
        { role: 'user', content: message },
      ],
      max_tokens: 30,
    });
    const reply = chatCompletion.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: 'AIとの通信に失敗しました。' });
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
