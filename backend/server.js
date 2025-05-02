
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;



const ai = new GoogleGenAI({ apiKey: API_KEY });

try {
    const prompt = `
Act like an interviewer and generate 5 technical interview questions for the following candidate:

Role: "Frontend Developer"
Tech Stack: "MERN Stack"
Experience: 3 years
    `;

    
    const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
    });
    console.log(result.text);

    
  } catch (error) {
    console.error("Error generating questions:", error.message);
    
  }


//   const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });

//   async function main() {
//     const response = await ai.models.generateContent({
//       model: "gemini-2.0-flash",
//       contents: "Explain how AI works in a few words",
//     });
//     console.log(response.text);
//   }
  
//   main();