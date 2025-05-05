import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post("/", async (req, res) => {
  const { techStack, role, experience } = req.body;

  if (!techStack || !role || !experience) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const prompt = `Prepare questions for a job interview.
The job role is ${role}.
The job experience level is ${experience}.
The tech stack used in the job is: ${techStack}.
The amount of questions required is 5.
Please return only the questions, without any additional text.
The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
Return the questions formatted like this:
["Question 1", "Question 2", "Question 3"]
Thank you! <3`;

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      temperature: 0.5,
    });

    const text = result.text;

    // Try to parse the Gemini response into an array
    let parsedArray = [];
    try {
      parsedArray = JSON.parse(text);
    } catch (e) {
      // Fallback: split by new lines if JSON parse fails
      parsedArray = text.split("\n").filter(line => line.trim() !== "");
    }

    // Convert array into an object with indices
    const questionsObject = {};
    parsedArray.forEach((q, i) => {
      questionsObject[i] = q;
    });

    res.status(200).json({ questions: questionsObject });

  } catch (error) {
    console.error("Error generating questions:", error.message);
    res.status(500).json({ error: "Failed to generate questions" });
  }
});

export default router;
