import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

function cleanJsonString(rawOutput) {
  return rawOutput
    .replace(/^```json\s*/, '')  // Remove opening ```json (if it exists)
    .replace(/^```/, '')         // Just in case only ``` was used
    .replace(/```$/, '')         // Remove closing ```
    .trim();                     // Remove leading/trailing whitespace
}

router.post("/", async (req, res) => {
  try {
    // Log the entire request body for debugging
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    // Extract transcript from req.body.messages
    const transcript = req.body.messages;

    // Validate transcript
    if (!transcript) {
      console.error('Messages property is missing or undefined');
      return res.status(400).json({ error: 'Messages property is missing or undefined' });
    }
    if (!Array.isArray(transcript)) {
      console.error('Messages is not an array:', transcript);
      return res.status(400).json({ error: 'Messages must be an array' });
    }
    if (transcript.length === 0) {
      console.error('Messages array is empty');
      return res.status(400).json({ error: 'Messages array is empty' });
    }

    // Validate transcript entries
    const validTranscript = transcript.every((msg, index) => {
      const isValid = msg && typeof msg === 'object' && 'role' in msg && 'content' in msg;
      if (!isValid) {
        console.error(`Invalid messages entry at index ${index}:`, msg);
      }
      return isValid;
    });
    if (!validTranscript) {
      return res.status(400).json({ error: 'Messages array contains invalid entries (must have role and content)' });
    }

    // Log the received transcript
    console.log('Received messages:', JSON.stringify(transcript, null, 2));

    // Remove the first entry from the transcript
    let transcriptSliced = transcript.length > 0 ? transcript.slice(1) : [];

    // Log the modified transcript
    console.log('Modified messages (after removing first entry):', JSON.stringify(transcriptSliced, null, 2));

    // Format the transcript
    const formattedTranscript = transcriptSliced
      .filter(msg => msg.role && msg.content)
      .map(msg => `${msg.role === 'user' ? 'Candidate' : 'Interviewer'}: ${msg.content}`)
      .join("\n");

    // Log the formatted transcript
    console.log('Formatted transcript:', formattedTranscript);

    const prompt = `You are an expert interview evaluator. Please analyze the following mock interview transcript and provide detailed feedback.

Interview Transcript:
${formattedTranscript}

Please provide a comprehensive evaluation with the following structure:
1. A total score out of 100
2. Category scores (out of 100) and comments for:
   - Technical Knowledge
   - Communication
   - Problem Solving
   - Confidence
3. At least 3 specific strengths
4. At least 3 specific areas for improvement
5. A final assessment paragraph (3-5 sentences)

Format your response as a JSON object following this structure:
{
  "totalScore": number,
  "categoryScores": [
    {
      "name": "Technical Knowledge",
      "score": number,
      "comment": "string"
    },
    {
      "name": "Communication",
      "score": number,
      "comment": "string"
    },
    {
      "name": "Problem Solving",
      "score": number,
      "comment": "string"
    },
    {
      "name": "Confidence",
      "score": number,
      "comment": "string"
    }
  ],
  "strengths": ["string", "string", "string"],
  "areasForImprovement": ["string", "string", "string"],
  "finalAssessment": "string"
}`;

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      temperature: 0.2,
      responseFormat: { type: "json" },
      generationConfig: {
        maxOutputTokens: 1024
      }
    });

    // Parse the JSON response
    let feedbackData;
    try {
      console.log("AI response:", result);
      const resultText = result.text;
      console.log("Raw AI response text:", resultText);
      feedbackData = JSON.parse(cleanJsonString(resultText));
      
      // Validation - ensure all required fields are present
      if (!feedbackData.totalScore || 
          !feedbackData.categoryScores || 
          !feedbackData.strengths || 
          !feedbackData.areasForImprovement || 
          !feedbackData.finalAssessment) {
        throw new Error("Invalid feedback structure");
      }
      
      // Ensure scores are numbers between 0-100
      feedbackData.totalScore = Math.min(Math.max(0, feedbackData.totalScore), 100);
      feedbackData.categoryScores.forEach(category => {
        category.score = Math.min(Math.max(0, category.score), 100);
      });
      
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      
      // Fallback response if parsing fails
      feedbackData = {
        totalScore: 70,
        categoryScores: [
          {
            name: "Technical Knowledge",
            score: 70,
            comment: "Demonstrated basic understanding of concepts with some gaps."
          },
          {
            name: "Communication",
            score: 75,
            comment: "Generally clear communication with occasional ambiguity."
          },
          {
            name: "Problem Solving",
            score: 65,
            comment: "Shows potential but needs more structured approach."
          },
          {
            name: "Confidence",
            score: 70,
            comment: "Reasonable confidence with moments of uncertainty."
          }
        ],
        strengths: [
          "Shows willingness to tackle challenges",
          "Good basic understanding of concepts",
          "Communicates thought process clearly"
        ],
        areasForImprovement: [
          "Deepen technical knowledge in key areas",
          "Practice more complex problem-solving scenarios",
          "Work on concise explanations of complex concepts"
        ],
        finalAssessment: "The candidate shows promise with good foundational skills. With focused improvement in technical depth and problem-solving approach, they could become a solid contributor. Recommend additional practice with technical interviews."
      };
    }

    // Log the final feedback data
    console.log('Validated feedback data:', JSON.stringify(feedbackData, null, 2));

    res.status(200).json({ feedback: feedbackData });

  } catch (error) {
    console.error("Error generating feedback:", error);
    res.status(500).json({ error: "Failed to generate feedback", details: error.message });
  }
});

export default router;
