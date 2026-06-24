
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = " https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDquntlAjuGf0yOvP2VUDsz5r2W2jZzggs"; 
const genAI = new GoogleGenerativeAI(API_KEY);

async function runChat() {
    try {
        // Use correct model name
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Send a test message
        const chat = model.startChat();
        const result = await chat.sendMessage("Hello, how can you help?");
        
        console.log(result.response.text()); 
    } catch (error) {
        console.error("Error:", error);
    }
}

runChat();
