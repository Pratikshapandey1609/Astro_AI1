import React, { useState, useRef, } from "react";
import { IoMdSend } from "react-icons/io";
import { IoChatbubbleOutline, IoClose } from "react-icons/io5";
import axios from 'axios';

// function GptBot() {
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [answer]);

//   const handleSend = () => {
//     if (!question.trim()) return;

//     setAnswer("🌟 Thank you for your question! The stars are aligning... (API coming soon)");
//   };

function GptBot() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);


  async function generateAnswer() {
    console.log("loading....");

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDquntlAjuGf0yOvP2VUDsz5r2W2jZzggs", // ✅ use your key
        {
          contents: [
            {
              role: "user", // ✅ this was missing
              parts: [
                {
                  text: `You are AstroBot, a virtual astrologer trained to give daily horoscope readings based on zodiac signs. 
                  If the question is outside your training, respond politely and respectfully.
                  Instructions:
                  - Greet the user first.
                  - Provide a simple daily horoscope.
                  - Use plain English with bullet points.
                  - Include some example names that typically start with that zodiac sign.
                  - Keep the tone light-hearted and positive.
                  - Avoid using any symbols like asterisks (*), underscores (_) or emojis.
                  Here is the user's question: ${question}`
                }
              ]
            }
          ]
        }
      );

      const result = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      setAnswer(result || "❌ No answer returned.");
    } catch (error) {
      console.error("Error fetching answer:", error);
      setAnswer("⚠️ Something went wrong. Try again later.");
    }
  }


  return (
    <div className="fixed bottom-5 right-5 z-50 font-serif">
      {/* Floating Chat Button */}
      <button
        className="bg-yellow-600 text-white p-3 rounded-full shadow-lg hover:bg-yellow-700 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <IoClose size={24} /> : <IoChatbubbleOutline size={24} />}
      </button>

      {/* Chat Box */}
      {isOpen && (
        <div className="w-80 max-h-[450px] text-yellow-900 rounded-xl shadow-2xl border border-yellow-400 overflow-hidden bg-gradient-to-b from-[#fff8e1] to-[#fbe2a8] flex flex-col">
          {/* Header */}
          <div className="bg-yellow-700 text-white px-4 py-3 flex justify-between items-center">
            <h3 className="text-lg font-bold">🔮 AstroBot</h3>
            <button onClick={() => setIsOpen(false)} className="hover:text-yellow-200 text-xl">
              ✖
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto max-h-[300px] custom-scrollbar">
            {question && (
              <div className="text-right mb-2">
                <p className="inline-block bg-yellow-300 text-yellow-900 px-3 py-2 rounded-md">
                  <b>Me:</b> {question}
                </p>
              </div>
            )}
            {answer && (
              <div className="text-left">
                <p className="inline-block bg-yellow-200 text-yellow-800 px-3 py-2 rounded-md">
                  <b>AstroBot:</b> {answer}
                </p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Field */}
          <div className="p-3 border-t border-yellow-400 bg-[#fff8e1] flex items-center gap-2">
            <input
              type="text"
              className="flex-1 border border-yellow-400 rounded px-3 py-2 text-sm bg-white text-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-600"
              placeholder="Ask about your zodiac..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generateAnswer()}

            />
            <button
              className="bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded-full" onClick={generateAnswer}
            >
              <IoMdSend size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GptBot;

