import React from 'react'

const Astrologers = () => {
  return (
    <div>
      
    </div>
  )
}

export default Astrologers;

// import React, { useState } from "react";
// import Navbar from "./Navbar";

// const starMessages = [
//   "The stars are aligning for something beautiful.",
//   "Your energy is magnetic today!",
//   "The universe hears your thoughts — stay focused.",
//   "Patience is your superpower right now.",
//   "You are attracting the right energies. Stay open.",
//   "A positive shift is coming your way.",
// ];

// const moods = {
//   Happy: "Your glow is brighter than Venus tonight! ✨",
//   Anxious: "Even the moon goes through phases. This too shall pass.",
//   Lost: "The stars remind you: not all who wander are lost.",
//   Confident: "Your aura is unstoppable today. Shine on! 🌟",
// };

// const Astrologers = () => {
//   const [question, setQuestion] = useState("");
//   const [reply, setReply] = useState("");
//   const [mood, setMood] = useState("");
//   const [moodMessage, setMoodMessage] = useState("");
//   const [wish, setWish] = useState("");
//   const [wishSent, setWishSent] = useState(false);
//   const [spinMessage, setSpinMessage] = useState("");

//   const handleAsk = () => {
//     if (question.trim() === "") return alert("Type your question first.");
//     const random = starMessages[Math.floor(Math.random() * starMessages.length)];
//     setReply(random);
//   };

//   const handleMood = (e) => {
//     const selectedMood = e.target.value;
//     setMood(selectedMood);
//     setMoodMessage(moods[selectedMood]);
//   };

//   const handleSpin = () => {
//     const random = starMessages[Math.floor(Math.random() * starMessages.length)];
//     setSpinMessage(random);
//   };

//   const handleWish = () => {
//     if (wish.trim() === "") return;
//     setWishSent(true);
//     setTimeout(() => {
//       setWishSent(false);
//       setWish("");
//     }, 3000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#fff1cc] to-[#f4d47c] text-yellow-900 font-serif px-6 md:px-20 py-10">
     
//       <h1 className="text-4xl font-bold mb-6">🔮 Ask the Stars</h1>

//       {/* Ask a question */}
//       <div className="mb-8">
//         <h2 className="text-2xl mb-2">✨ Ask a Question</h2>
//         <input
//           type="text"
//           placeholder="What do you want to know?"
//           className="w-full px-4 py-2 border rounded text-black bg-white"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//         />
//         <button
//           onClick={handleAsk}
//           className="mt-2 px-6 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
//         >
//           Ask
//         </button>
//         {reply && <p className="mt-4 bg-white p-3 rounded shadow">{reply}</p>}
//       </div>

//       {/* Mood Based Insight */}
//       <div className="mb-8">
//         <h2 className="text-2xl mb-2">🧘 How are you feeling?</h2>
//         <select
//           className="w-full px-4 py-2 border rounded text-black bg-white"
//           onChange={handleMood}
//         >
//           <option value="">Select your mood</option>
//           {Object.keys(moods).map((m) => (
//             <option key={m} value={m}>
//               {m}
//             </option>
//           ))}
//         </select>
//         {moodMessage && <p className="mt-4 bg-white p-3 rounded shadow">{moodMessage}</p>}
//       </div>

//       {/* Star Spin */}
//       <div className="mb-8">
//         <h2 className="text-2xl mb-2">🌠 Spin the Star</h2>
//         <button
//           onClick={handleSpin}
//           className="px-6 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
//         >
//           Spin
//         </button>
//         {spinMessage && <p className="mt-4 bg-white p-3 rounded shadow">{spinMessage}</p>}
//       </div>

//       {/* Make a wish */}
//       <div className="mb-8">
//         <h2 className="text-2xl mb-2">💫 Make a Wish</h2>
//         <input
//           type="text"
//           placeholder="What's your wish?"
//           className="w-full px-4 py-2 border rounded text-black bg-white"
//           value={wish}
//           onChange={(e) => setWish(e.target.value)}
//         />
//         <button
//           onClick={handleWish}
//           className="mt-2 px-6 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
//         >
//           Send to the Stars
//         </button>
//         {wishSent && <p className="mt-4 text-green-700 font-semibold">✨ Your wish has been sent to the universe!</p>}
//       </div>
//     </div>
//   );
// };

// export default Astrologers
