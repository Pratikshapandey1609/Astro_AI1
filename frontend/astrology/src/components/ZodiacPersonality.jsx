
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const zodiacTraits = {
  aries: "Energetic, courageous, and passionate.",
  taurus: "Reliable, patient, and grounded.",
  gemini: "Witty, curious, and adaptable.",
  cancer: "Sensitive, loyal, and nurturing.",
  leo: "Charismatic, bold, and creative.",
  virgo: "Analytical, organized, and sincere.",
  libra: "Balanced, fair, and diplomatic.",
  scorpio: "Intense, mysterious, and driven.",
  sagittarius: "Optimistic, free-spirited, and curious.",
  capricorn: "Disciplined, responsible, and ambitious.",
  aquarius: "Innovative, independent, and deep thinker.",
  pisces: "Empathetic, dreamy, and artistic."
};

const ZodiacPersonality = () => {
  const [name, setName] = useState("");
  const [sign, setSign] = useState("");
  const [message, setMessage] = useState("");
  const { t } = useTranslation();

  const handleDiscover = () => {
    if (!name || !sign) {
      alert(t("Please enter your name and select your rashi!"));
      return;
    }
    const personality = zodiacTraits[sign.toLowerCase()];
    // For dynamic message interpolation, use t with options
    setMessage(t("personality_message", {
      name: name,
      sign: sign.toUpperCase(),
      personality: personality
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff1cc] to-[#f4d47c] px-6 py-10 text-black font-serif">
      
      <div className="max-w-xl mx-auto text-center space-y-6 mt-10 bg-white/80 rounded-xl shadow-2xl p-6 border border-yellow-400">
        <h1 className="text-3xl font-bold text-yellow-900">✨ {t("discover_personality")}</h1>

        <input
          type="text"
          placeholder={t("Enter your name")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded text-black"
        />

        <select
          value={sign}
          onChange={(e) => setSign(e.target.value)}
          className="w-full px-4 py-2 border rounded text-black"
        >
          <option value="">{t("Select Your Rashi")}</option>
          {Object.keys(zodiacTraits).map((zodiac) => (
            <option key={zodiac} value={zodiac}>
              {t(zodiac.charAt(0).toUpperCase() + zodiac.slice(1))}
            </option>
          ))}
        </select>

        <button
          onClick={handleDiscover}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded shadow-lg"
        >
          🔍 {t("Discover")}
        </button>

        {message && (
          <div className="bg-yellow-100 text-yellow-900 mt-4 p-4 rounded shadow animate-fade-in-up">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ZodiacPersonality;


// import React, { useState } from "react";
// import { useTranslation } from "react-i18next";

// const zodiacTraits = {
//   aries: "Energetic, courageous, and passionate.",
//   taurus: "Reliable, patient, and grounded.",
//   gemini: "Witty, curious, and adaptable.",
//   cancer: "Sensitive, loyal, and nurturing.",
//   leo: "Charismatic, bold, and creative.",
//   virgo: "Analytical, organized, and sincere.",
//   libra: "Balanced, fair, and diplomatic.",
//   scorpio: "Intense, mysterious, and driven.",
//   sagittarius: "Optimistic, free-spirited, and curious.",
//   capricorn: "Disciplined, responsible, and ambitious.",
//   aquarius: "Innovative, independent, and deep thinker.",
//   pisces: "Empathetic, dreamy, and artistic."
// };

// const ZodiacPersonality = () => {
//   const [name, setName] = useState("");
//   const [sign, setSign] = useState("");
//   const [message, setMessage] = useState("");
//   const {t} = useTranslation();
//   const handleDiscover = () => {
//     if (!name || !sign) {
//       alert("Please enter your name and select your rashi!");
//       return;
//     }
//     const personality = zodiacTraits[sign.toLowerCase()];
//     setMessage(`🌟 Hey ${name}, as a ${sign.toUpperCase()} — you are ${personality}`);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#fff1cc] to-[#f4d47c] px-6 py-10 text-black font-serif">
      
//       <div className="max-w-xl mx-auto text-center space-y-6 mt-10 bg-white/80 rounded-xl shadow-2xl p-6 border border-yellow-400">
//         <h1 className="text-3xl font-bold text-yellow-900">✨ {t("discover_personality")}</h1>

//         <input
//           type="text"
//           placeholder="Enter your name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full px-4 py-2 border rounded text-black"
//         />

//         <select
//           value={sign}
//           onChange={(e) => setSign(e.target.value)}
//           className="w-full px-4 py-2 border rounded text-black"
//         >
//           <option value="">{t("Select Your Rashi")}</option>
//           {Object.keys(zodiacTraits).map((zodiac) => (
//             <option key={zodiac} value={zodiac}>{zodiac.charAt(0).toUpperCase() + zodiac.slice(1)}</option>
//           ))}
//         </select>

//         <button
//           onClick={handleDiscover}
//           className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded shadow-lg"
//         >
//           🔍 {t("Discover")}
//         </button>

//         {message && (
//           <div className="bg-yellow-100 text-yellow-900 mt-4 p-4 rounded shadow animate-fade-in-up">
//            { t({message})}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ZodiacPersonality;

