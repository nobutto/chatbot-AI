import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openAI = new OpenAI({
    apiKey: process.env.APIkey,
});

export default async function handler(req, res) { 

    const message = req.body.message;
    try {
        const chatCompletion = await openAI.chat.completions.create({
            model: 'gpt-4.1-nano',
            messages: [
                {role: "system", content: "あなたは親しみやすい子供です。"},
                {role: "user", content: message},
            ],
        });

        const reply = chatCompletion.choices[0].message.content;
        res.status(200).json({ reply });
    } catch (error) {
        res.status(500).json({error: "AIとの通信に失敗しました。"})
    }
}