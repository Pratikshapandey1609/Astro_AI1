import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Added translation hook

function ZodiacQuiz() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handlePersonalityClick = () => {
    navigate("/zodiac-personality");
  };

  const handleLoveMatchClick = () => {
    navigate("/love-match");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff1cc] to-[#f4d47c] text-black font-serif px-6 py-8">
      <div className="max-w-3xl mx-auto text-center space-y-8 mt-12">
        <h1 className="text-4xl font-bold text-yellow-900 drop-shadow-md">
          {t("zodiac_quiz_zone")}
        </h1>
        <p className="text-lg text-yellow-800">
          {t("quiz_intro")}
        </p>

        <div className="space-y-6">
          <button
            onClick={handlePersonalityClick}
            className="bg-yellow-600 hover:bg-yellow-700 text-white text-lg px-8 py-3 rounded shadow-lg transition duration-300 ease-in-out"
          >
            🧠 {t("discover_personality")}
          </button>

          <br />

          <button
            onClick={handleLoveMatchClick}
            className="bg-pink-600 hover:bg-pink-700 text-white text-lg px-8 py-3 rounded shadow-lg transition duration-300 ease-in-out"
          >
            ❤️ {t("Zodiac Love Match Checker")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ZodiacQuiz;


// import React  from "react";
// import { useNavigate } from "react-router-dom";

// function ZodiacQuiz() {
//   const navigate = useNavigate();
  
//   const handlePersonalityClick = () =>{
//      navigate("/zodiac-personality")
//   };

//   const handleLoveMatchClick = () =>{
//      navigate('/love-match')
//   }
//   return (
//        <div className="min-h-screen bg-gradient-to-b from-[#fff1cc] to-[#f4d47c] text-black font-serif px-6 py-8">

//       <div className="max-w-3xl mx-auto text-center space-y-8 mt-12">
//         <h1 className="text-4xl font-bold text-yellow-900 drop-shadow-md">
//           🧭 Zodiac Quiz Zone
//         </h1>
//         <p className="text-lg text-yellow-800">
//           Unlock the secrets of your sign and discover cosmic connections!
//         </p>

//         <div className="space-y-6">
//           <button
//             onClick={handlePersonalityClick}
//             className="bg-yellow-600 hover:bg-yellow-700 text-white text-lg px-8 py-3 rounded shadow-lg transition duration-300 ease-in-out"
//           >
//             🧠 Discover Your Zodiac Personality
//           </button>

//           <br />

//           <button
//             onClick={handleLoveMatchClick}
//             className="bg-pink-600 hover:bg-pink-700 text-white text-lg px-8 py-3 rounded shadow-lg transition duration-300 ease-in-out"
//           >
//             ❤️ Zodiac Love Match Checker
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ZodiacQuiz














// import React, { useStat
// e } from "react";
// import Navbar from "./Navbar";
// const rashiSigns = [
//   "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
//   "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
// ];

// const questions = [
//   {
//     question: "How do you usually react to conflicts?",
//     options: ["Stay calm", "Walk away", "Talk it out", "Defend myself"],
//   },
//   {
//     question: "Which of these appeals to you the most?",
//     options: ["Adventure", "Loyalty", "Creativity", "Logic"],
//   },
//   {
//     question: "Pick a dream vacation:",
//     options: ["Mountains", "Beach", "Historic city", "Forest"],
//   },
// ];

// const ZodiacQuiz = () => {
//   // Zodiac Personality
//   const [answers, setAnswers] = useState({});
//   const [showZodiacResult, setShowZodiacResult] = useState(false);

//   // Love Match
//   const [yourName, setYourName] = useState("");
//   const [partnerName, setPartnerName] = useState("");
//   const [yourRashi, setYourRashi] = useState("");
//   const [partnerRashi, setPartnerRashi] = useState("");
//   const [loveScore, setLoveScore] = useState(null);

//   const handleOptionChange = (qIndex, option) => {
//     setAnswers({ ...answers, [qIndex]: option });
//   };

//   const handleZodiacSubmit = () => {
//     if (Object.keys(answers).length !== questions.length) {
//       alert("Please answer all questions.");
//       return;
//     }
//     setShowZodiacResult(true);
//   };

//   const calculateLoveScore = () => {
//     if (!yourName || !partnerName || !yourRashi || !partnerRashi) {
//       alert("Please fill all love match fields.");
//       return;
//     }

//     const nameSum =
//       [...yourName, ...partnerName].reduce((acc, char) => acc + char.charCodeAt(0), 0);
//     const signScore = Math.abs(yourRashi.length - partnerRashi.length) * 3;

//     const score = (nameSum + signScore) % 100;
//     setLoveScore(score);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#fff1cc] to-[#f4d47c] text-black font-serif px-4 md:px-12 py-4">
      
//       <div className="max-w-4xl mx-auto mt-10 p-6 bg-white/90 rounded-xl shadow-xl space-y-10">
//         {/* 🌟 Zodiac Personality */}
//         <section>
//           <h2 className="text-2xl font-bold text-yellow-800 mb-4 text-center">
//             🌟 Discover Your Zodiac Personality
//           </h2>

//           {!showZodiacResult ? (
//             <>
//               {questions.map((q, index) => (
//                 <div key={index} className="mb-4">
//                   <p className="font-medium text-yellow-900">{q.question}</p>
//                   {q.options.map((option, idx) => (
//                     <label key={idx} className="block text-sm text-yellow-800 ml-2">
//                       <input
//                         type="radio"
//                         name={`question-${index}`}
//                         value={option}
//                         checked={answers[index] === option}
//                         onChange={() => handleOptionChange(index, option)}
//                         className="mr-2"
//                       />
//                       {option}
//                     </label>
//                   ))}
//                 </div>
//               ))}
//               <button
//                 onClick={handleZodiacSubmit}
//                 className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded shadow-lg mt-4"
//               >
//                 🔍 Reveal Personality
//               </button>
//             </>
//           ) : (
//             <div className="text-center text-yellow-800">
//               <p className="text-lg">You are adventurous, soulful, and emotionally deep 💫</p>
//               <p className="mt-2 font-bold text-orange-600">Zodiac Match: Scorpio ♏ or Sagittarius ♐</p>
//             </div>
//           )}
//         </section>

//         {/* 💘 Love Match */}
//         <section>
//           <h2 className="text-2xl font-bold text-yellow-800 mb-4 text-center">
//             💘 Zodiac Love Match Checker
//           </h2>
//           <div className="grid md:grid-cols-2 gap-4">
//             <input
//               type="text"
//               placeholder="Your Name"
//               value={yourName}
//               onChange={(e) => setYourName(e.target.value)}
//               className="border rounded px-4 py-2"
//             />
//             <input
//               type="text"
//               placeholder="Partner's Name"
//               value={partnerName}
//               onChange={(e) => setPartnerName(e.target.value)}
//               className="border rounded px-4 py-2"
//             />
//             <select
//               value={yourRashi}
//               onChange={(e) => setYourRashi(e.target.value)}
//               className="border rounded px-4 py-2"
//             >
//               <option value="">Your Rashi</option>
//               {rashiSigns.map((rashi, idx) => (
//                 <option key={idx} value={rashi}>
//                   {rashi}
//                 </option>
//               ))}
//             </select>
//             <select
//               value={partnerRashi}
//               onChange={(e) => setPartnerRashi(e.target.value)}
//               className="border rounded px-4 py-2"
//             >
//               <option value="">Partner's Rashi</option>
//               {rashiSigns.map((rashi, idx) => (
//                 <option key={idx} value={rashi}>
//                   {rashi}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <button
//             onClick={calculateLoveScore}
//             className="mt-4 bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded shadow"
//           >
//             💞 Calculate Compatibility
//           </button>

//           {loveScore !== null && (
//             <div className="mt-4 text-center text-pink-800 font-semibold">
//               <p>
//                 Love Compatibility Score: <span className="text-2xl">{loveScore}%</span>
//               </p>
//               <p className="mt-1">
//                 {loveScore > 75
//                   ? "A cosmic connection! 💖"
//                   : loveScore > 50
//                   ? "Great potential, just nurture it ✨"
//                   : "Opposites attract too 😉"}
//               </p>
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// };

// export default ZodiacQuiz;
