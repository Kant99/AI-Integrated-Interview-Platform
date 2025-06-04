import { GoogleGenAI } from "@google/genai";

function cleanJsonString(rawOutput) {
  return rawOutput
    .replace(/^```json\s*/, '')  // Remove opening ```json (if it exists)
    .replace(/^```/, '')         // Just in case only ``` was used
    .replace(/```$/, '')         // Remove closing ```
    .trim();                     // Remove leading/trailing whitespace
}

const transcript=[
    {
        "role": "",
        "content": ""
    },
    {
        "role": "assistant",
        "content": "Hi, Reshu. I'm your mock interviewer."
    },
    {
        "role": "assistant",
        "content": "Ready to begin."
    },
    {
        "role": "user",
        "content": "Yes. Let's start."
    },
    {
        "role": "assistant",
        "content": "Alright. Let's dive in."
    },
    {
        "role": "assistant",
        "content": "First question, what is your understanding of React components and their life cycle methods?"
    },
    {
        "role": "user",
        "content": "React component"
    },
    {
        "role": "user",
        "content": "are the"
    },
    {
        "role": "user",
        "content": "basic building block of a"
    },
    {
        "role": "user",
        "content": "React application."
    },
    {
        "role": "user",
        "content": "The React component"
    },
    {
        "role": "user",
        "content": "life cycle"
    },
    {
        "role": "user",
        "content": "includes 3 phases."
    },
    {
        "role": "user",
        "content": "Mounting,"
    },
    {
        "role": "user",
        "content": "updating, and unmounting."
    },
    {
        "role": "assistant",
        "content": "Interesting."
    },
    {
        "role": "user",
        "content": "Each"
    },
    {
        "role": "assistant",
        "content": "Uh, I see you were"
    },
    {
        "role": "user",
        "content": "each"
    },
    {
        "role": "assistant",
        "content": "Gotcha."
    },
    {
        "role": "user",
        "content": "each phase"
    },
    {
        "role": "user",
        "content": "has"
    },
    {
        "role": "user",
        "content": "different"
    },
    {
        "role": "user",
        "content": "life cycles like"
    },
    {
        "role": "user",
        "content": "mounting consist of"
    },
    {
        "role": "user",
        "content": "uh, wait a minute."
    },
    {
        "role": "assistant",
        "content": "No problem."
    },
    {
        "role": "assistant",
        "content": "Take your time."
    },
    {
        "role": "user",
        "content": "Hello?"
    },
    {
        "role": "assistant",
        "content": "I'm here."
    },
    {
        "role": "assistant",
        "content": "Whenever you're ready, continue with your answer."
    },
    {
        "role": "user",
        "content": "Sorry. I got a call."
    },
    {
        "role": "user",
        "content": "That's why I got disconnected. Uh, now I'll continue."
    },
    {
        "role": "assistant",
        "content": "No worries at all."
    },
    {
        "role": "assistant",
        "content": "Go ahead when you're ready."
    },
    {
        "role": "user",
        "content": "Mounting consists of"
    },
    {
        "role": "user",
        "content": "3"
    },
    {
        "role": "user",
        "content": "life cycle methods,"
    },
    {
        "role": "user",
        "content": "constructed"
    },
    {
        "role": "user",
        "content": "static get derived straight from props,"
    },
    {
        "role": "user",
        "content": "render, and component remote."
    },
    {
        "role": "assistant",
        "content": "Got it."
    },
    {
        "role": "assistant",
        "content": "Thanks."
    },
    {
        "role": "user",
        "content": "Updating consists of static get"
    },
    {
        "role": "user",
        "content": "derived state from props,"
    },
    {
        "role": "user",
        "content": "should component update"
    },
    {
        "role": "user",
        "content": "get snaps before update,"
    },
    {
        "role": "user",
        "content": "component did update."
    },
    {
        "role": "user",
        "content": "And unmounting consists of component will unmount."
    },
    {
        "role": "assistant",
        "content": "Thanks for the detailed explanation, Reshu."
    },
    {
        "role": "assistant",
        "content": "Let's move on to the next question. Can you describe a time you encountered a"
    },
    {
        "role": "assistant",
        "content": "bug while using React and how you resolved it?"
    },
    {
        "role": "user",
        "content": "Uh, okay."
    },
    {
        "role": "assistant",
        "content": "Take your time."
    },
    {
        "role": "assistant",
        "content": "No rush."
    },
    {
        "role": "user",
        "content": "To solve bug in React,"
    },
    {
        "role": "user",
        "content": "like,"
    },
    {
        "role": "assistant",
        "content": "Alright. Go"
    },
    {
        "role": "user",
        "content": "the main steps which I took was, like,"
    },
    {
        "role": "user",
        "content": "identify the bug, isolate it,"
    },
    {
        "role": "user",
        "content": "debug the code, and fix it."
    },
    {
        "role": "assistant",
        "content": "that makes sense."
    },
    {
        "role": "assistant",
        "content": "Can you share a specific example of a bug you encountered?"
    },
    {
        "role": "assistant",
        "content": "Encountered and the steps you took to resolve it?"
    },
    {
        "role": "user",
        "content": "I used error boundaries"
    },
    {
        "role": "user",
        "content": "to solve the bugs, and also I used React dev tools."
    },
    {
        "role": "user",
        "content": "Reactotron,"
    },
    {
        "role": "user",
        "content": "React Native management tools,"
    },
    {
        "role": "user",
        "content": "etcetera, for solving the bugs."
    },
    {
        "role": "assistant",
        "content": "Great tools indeed."
    },
    {
        "role": "assistant",
        "content": "Thanks for sharing that."
    },
    {
        "role": "assistant",
        "content": "Alright. Next question. What are some advantages of using React for front end development?"
    },
    {
        "role": "user",
        "content": "The main advantages of React"
    },
    {
        "role": "user",
        "content": "is that"
    },
    {
        "role": "user",
        "content": "it has"
    },
    {
        "role": "user",
        "content": "very good community support and"
    },
    {
        "role": "user",
        "content": "it is easy to learn."
    },
    {
        "role": "user",
        "content": "The"
    },
    {
        "role": "user",
        "content": "main advantages"
    },
    {
        "role": "user",
        "content": "of React is that"
    },
    {
        "role": "user",
        "content": "the component reusability"
    },
    {
        "role": "user",
        "content": "and also it is SEO friendly."
    },
    {
        "role": "assistant",
        "content": "Nice points."
    },
    {
        "role": "assistant",
        "content": "Um, let's move on."
    },
    {
        "role": "assistant",
        "content": "Explain the difference between state and props in React."
    },
    {
        "role": "user",
        "content": "State is used to manage data."
    },
    {
        "role": "user",
        "content": "That is internal to a component"
    },
    {
        "role": "user",
        "content": "and can change over time."
    },
    {
        "role": "assistant",
        "content": "Gotcha."
    },
    {
        "role": "user",
        "content": "It is initialized"
    },
    {
        "role": "user",
        "content": "within the component"
    },
    {
        "role": "user",
        "content": "and can be updated using the set state method."
    },
    {
        "role": "assistant",
        "content": "Alright."
    },
    {
        "role": "user",
        "content": "When the state is updated, React rerenders"
    },
    {
        "role": "user",
        "content": "the component."
    },
    {
        "role": "user",
        "content": "To reflect the changes."
    },
    {
        "role": "assistant",
        "content": "Okay. Good."
    },
    {
        "role": "assistant",
        "content": "And what about"
    },
    {
        "role": "user",
        "content": "Props props"
    },
    {
        "role": "user",
        "content": "is a short form for properties."
    },
    {
        "role": "user",
        "content": "That are used to pass data from"
    },
    {
        "role": "user",
        "content": "a parent component to its children."
    },
    {
        "role": "user",
        "content": "They are immutable within the child component."
    },
    {
        "role": "user",
        "content": "Meaning"
    },
    {
        "role": "user",
        "content": "a child component cannot directly modify the props"
    },
    {
        "role": "user",
        "content": "it receives."
    },
    {
        "role": "assistant",
        "content": "Great explanation."
    },
    {
        "role": "assistant",
        "content": "Thanks. Now could you describe a simple React project you have worked on and what you learned from it?"
    },
    {
        "role": "user",
        "content": "Uh, a simple React project which I built was, uh,"
    },
    {
        "role": "user",
        "content": "like,"
    },
    {
        "role": "user",
        "content": "cryptocurrency"
    },
    {
        "role": "user",
        "content": "tracker web app."
    },
    {
        "role": "user",
        "content": "In which I was getting"
    },
    {
        "role": "user",
        "content": "the"
    },
    {
        "role": "user",
        "content": "data from a"
    },
    {
        "role": "user",
        "content": "web API."
    },
    {
        "role": "user",
        "content": "Uh, an open source web API for cryptocurrency."
    },
    {
        "role": "user",
        "content": "And the real time"
    },
    {
        "role": "user",
        "content": "data like"
    },
    {
        "role": "user",
        "content": "uh, the price and"
    },
    {
        "role": "user",
        "content": "the graph of that"
    },
    {
        "role": "user",
        "content": "of a particular cryptocurrency was displayed in that website."
    },
    {
        "role": "user",
        "content": "And there was also an option"
    },
    {
        "role": "user",
        "content": "which I, uh, like,"
    },
    {
        "role": "user",
        "content": "which shows the"
    },
    {
        "role": "user",
        "content": "list of all the cryptocurrencies available on different platforms."
    },
    {
        "role": "assistant",
        "content": "That sounds like a great project."
    },
    {
        "role": "assistant",
        "content": "What did you learn from working on it?"
    },
    {
        "role": "user",
        "content": "The first thing which I learned was how to"
    },
    {
        "role": "user",
        "content": "how to"
    },
    {
        "role": "user",
        "content": "make a website in"
    },
    {
        "role": "user",
        "content": "React JS."
    },
    {
        "role": "user",
        "content": "How to manage state,"
    },
    {
        "role": "user",
        "content": "What are hooks? How to call an API?"
    },
    {
        "role": "user",
        "content": "And etcetera."
    },
    {
        "role": "assistant",
        "content": "Those are valuable skills in React development."
    },
    {
        "role": "assistant",
        "content": "Thanks for sharing that, Rishu. That wraps up our mock interview."
    },
    {
        "role": "assistant",
        "content": "Best of luck with your future interviews."
    },
    {
        "role": "user",
        "content": "Thank you."
    }
]

const formattedTranscript = transcript
      .filter(msg => msg.role && msg.content)
      .map(msg => `${msg.role === 'user' ? 'Candidate' : 'Interviewer'}: ${msg.content}`)
      .join("\n");

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
      model: "gemini-2.0-flash", // You can use "gemini-2.0-pro" for more nuanced analysis
      contents: prompt,
      temperature: 0.2,
      responseFormat: { type: "json" },
      generationConfig: {
        maxOutputTokens: 1024
      }
    });
    
    // Parse the JSON response
   
    try {
      console.log("AI response:", result);
      const resultText = result.text;
      const feedbackData= JSON.parse(cleanJsonString(resultText));
      console.log("Parsed feedback data:", feedbackData);
      
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
    }