
import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Added translation hook

// const compatibilityData = {
//     aries: {
//         leo: "🔥 " + "Great fiery match — full of passion!",
//         sagittarius: "🎯 " + "Adventurous and full of energy together!",
//         libra: "💔 " + "Balanced bond but needs compromise.",
//         scorpio: "⚡ " + "Strong attraction but emotional clashes.",
//         cancer: "💔 " + "Can be intense but emotionally unstable."
//     },
//     taurus: {
//         virgo: "🌿 " + "Harmonious and practical love.",
//         capricorn: "💼 " + "Strong, reliable, and goal-oriented pair.",
//         cancer: "💖 " + "Stable and deeply nurturing match.",
//         scorpio: "💔 " + "Passionate but stubbornness may clash.",
//         leo: "🔥 " + "Magnetic but ego clashes possible."
//     },
//     gemini: {
//         libra: "🌀 " + "Mentally stimulating and fun match!",
//         aquarius: "💫 " + "Innovative and exciting connection.",
//         sagittarius: "🌍 " + "Opposites attract — fun and frustrating!",
//         virgo: "🧠 " + "Needs effort to align mindsets.",
//         cancer: "💔 " + "Emotions may overwhelm Gemini's light vibe."
//     },
//     cancer: {
//         scorpio: "💘 " + "Deep, emotional, and loyal match.",
//         pisces: "🌊 " + "Intuitive and emotionally understanding bond.",
//         taurus: "💖 " + "Grounded and nurturing love.",
//         capricorn: "⚖️ " + "Opposites that balance home and ambition.",
//         aries: "💢 " + "Emotional vs impulsive — can be rocky."
//     },
//     leo: {
//         aries: "🔥 " + "Explosive chemistry and drive!",
//         sagittarius: "🎉 " + "Exciting and optimistic pair.",
//         libra: "💎 " + "Glamorous and socially dazzling couple.",
//         taurus: "💔 " + "Strong-willed — power struggles ahead.",
//         scorpio: "⚡ " + "Passionate but controlling mix."
//     },
//     virgo: {
//         taurus: "🌱 " + "Peaceful and steady relationship.",
//         capricorn: "📘 " + "Intelligent, organized, and committed.",
//         cancer: "💖 " + "Caring and nurturing love.",
//         gemini: "🧠 " + "Good communication but different paces.",
//         pisces: "🌗 " + "Opposites that can grow together."
//     },
//     libra: {
//         gemini: "💫 " + "Air signs unite — charm and ideas!",
//         aquarius: "🌬️ " + "Cool, intellectual love connection.",
//         leo: "💛 " + "Balanced glam and charm.",
//         cancer: "💔 " + "Emotions vs diplomacy clash.",
//         capricorn: "⚖️ " + "Work hard for harmony and values."
//     },
//     scorpio: {
//         cancer: "💖 " + "Emotionally intense and loyal bond.",
//         pisces: "🌌 " + "Dreamy, deep, spiritual love.",
//         taurus: "💥 " + "Strong but stubborn relationship.",
//         leo: "🔥 " + "Passionate but possessive.",
//         aries: "⚡ " + "Explosive chemistry — needs control."
//     },
//     sagittarius: {
//         aries: "🎯 " + "Fun, freedom-loving, and wild!",
//         leo: "🌞 " + "Optimistic and daring bond.",
//         aquarius: "🚀 " + "Idealistic and full of adventures.",
//         virgo: "⚠️ " + "Logic vs spontaneity may clash.",
//         pisces: "🌈 " + "Creative match but lacks grounding."
//     },
//     capricorn: {
//         taurus: "💎 " + "Stable, traditional, and loyal.",
//         virgo: "📘 " + "Smart, structured, and goal-oriented.",
//         scorpio: "🛡️ " + "Intense but dependable.",
//         aries: "⚔️ " + "Ambition vs action can clash.",
//         cancer: "🛋️ " + "Home-focused and emotional support."
//     },
//     aquarius: {
//         gemini: "💬 " + "Talkative, curious, and exciting!",
//         libra: "🔮 " + "Social, balanced, and progressive.",
//         sagittarius: "🌍 " + "Philosophical and explorative.",
//         scorpio: "🌀 " + "May struggle with emotional depth.",
//         taurus: "⚠️ " + "Different goals and personalities."
//     },
//     pisces: {
//         cancer: "🌊 " + "Emotionally intuitive and sweet love.",
//         scorpio: "💖 " + "Passionate and deeply spiritual.",
//         virgo: "🌗 " + "Opposites that can teach and heal.",
//         aries: "💢 " + "Dreamy vs impulsive mismatch.",
//         libra: "🎭 " + "Romantic but sometimes idealistic."
//     }
// };

const LoveMatch = () => {

    const { t } = useTranslation();
    const [yourName, setYourName] = useState("");
    const [yourSign, setYourSign] = useState("");
    const [partnerName, setPartnerName] = useState("");
    const [partnerSign, setPartnerSign] = useState("");
    const [matchResult, setMatchResult] = useState("");

    const compatibilityData = {
        aries: {
            leo: "🔥 " + "Great fiery match — full of passion!",
            sagittarius: "🎯 " + "Adventurous and full of energy together!",
            libra: "💔 " + "Balanced bond but needs compromise.",
            scorpio: "⚡ " + "Strong attraction but emotional clashes.",
            cancer: "💔 " + "Can be intense but emotionally unstable."
        },
        taurus: {
            virgo: "🌿 " + "Harmonious and practical love.",
            capricorn: "💼 " + "Strong, reliable, and goal-oriented pair.",
            cancer: "💖 " + "Stable and deeply nurturing match.",
            scorpio: "💔 " + "Passionate but stubbornness may clash.",
            leo: "🔥 " + "Magnetic but ego clashes possible."
        },
        gemini: {
            libra: "🌀 " + "Mentally stimulating and fun match!",
            aquarius: "💫 " + "Innovative and exciting connection.",
            sagittarius: "🌍 " + "Opposites attract — fun and frustrating!",
            virgo: "🧠 " + "Needs effort to align mindsets.",
            cancer: "💔 " + "Emotions may overwhelm Gemini's light vibe."
        },
        cancer: {
            scorpio: "💘 " + "Deep, emotional, and loyal match.",
            pisces: "🌊 " + "Intuitive and emotionally understanding bond.",
            taurus: "💖 " + "Grounded and nurturing love.",
            capricorn: "⚖️ " + "Opposites that balance home and ambition.",
            aries: "💢 " + "Emotional vs impulsive — can be rocky."
        },
        leo: {
            aries: "🔥 " + "Explosive chemistry and drive!",
            sagittarius: "🎉 " + "Exciting and optimistic pair.",
            libra: "💎 " + "Glamorous and socially dazzling couple.",
            taurus: "💔 " + "Strong-willed — power struggles ahead.",
            scorpio: "⚡ " + "Passionate but controlling mix."
        },
        virgo: {
            taurus: "🌱 " + "Peaceful and steady relationship.",
            capricorn: "📘 " + "Intelligent, organized, and committed.",
            cancer: "💖 " + "Caring and nurturing love.",
            gemini: "🧠 " + "Good communication but different paces.",
            pisces: "🌗 " + "Opposites that can grow together."
        },
        libra: {
            gemini: "💫 " + "Air signs unite — charm and ideas!",
            aquarius: "🌬️ " + "Cool, intellectual love connection.",
            leo: "💛 " + "Balanced glam and charm.",
            cancer: "💔 " + "Emotions vs diplomacy clash.",
            capricorn: "⚖️ " + "Work hard for harmony and values."
        },
        scorpio: {
            cancer: "💖 " + "Emotionally intense and loyal bond.",
            pisces: "🌌 " + "Dreamy, deep, spiritual love.",
            taurus: "💥 " + "Strong but stubborn relationship.",
            leo: "🔥 " + "Passionate but possessive.",
            aries: "⚡ " + "Explosive chemistry — needs control."
        },
        sagittarius: {
            aries: "🎯 " + "Fun, freedom-loving, and wild!",
            leo: "🌞 " + "Optimistic and daring bond.",
            aquarius: "🚀 " + "Idealistic and full of adventures.",
            virgo: "⚠️ " + "Logic vs spontaneity may clash.",
            pisces: "🌈 " + "Creative match but lacks grounding."
        },
        capricorn: {
            taurus: "💎 " + "Stable, traditional, and loyal.",
            virgo: "📘 " + "Smart, structured, and goal-oriented.",
            scorpio: "🛡️ " + "Intense but dependable.",
            aries: "⚔️ " + "Ambition vs action can clash.",
            cancer: "🛋️ " + "Home-focused and emotional support."
        },
        aquarius: {
            gemini: "💬 " + "Talkative, curious, and exciting!",
            libra: "🔮 " + "Social, balanced, and progressive.",
            sagittarius: "🌍 " + "Philosophical and explorative.",
            scorpio: "🌀 " + "May struggle with emotional depth.",
            taurus: "⚠️ " + "Different goals and personalities."
        },
        pisces: {
            cancer: "🌊 " + "Emotionally intuitive and sweet love.",
            scorpio: "💖 " + "Passionate and deeply spiritual.",
            virgo: "🌗 " + "Opposites that can teach and heal.",
            aries: "💢 " + "Dreamy vs impulsive mismatch.",
            libra: "🎭 " + "Romantic but sometimes idealistic."
        }
    };

    const handleCheckMatch = () => {
        if (!yourName || !yourSign || !partnerName || !partnerSign) {
            alert(t("Please fill all fields!"));
            return;
        }
        const sign = yourSign.toLowerCase().trim();
        const partner = partnerSign.toLowerCase().trim();

        const result =
            compatibilityData[sign] && compatibilityData[sign][partner]
                ? compatibilityData[sign][partner]
                : t("Compatibility info not available. Try a popular zodiac pair.");

        setMatchResult(
            `💑 ${yourName} (${sign}) ❤️ ${partnerName} (${partner}) — ${result}`
        );
    };

    return (
        <div className="bg-gradient-to-b from-[#fff1cc] to-[#f4d47c] min-h-screen p-8 text-black font-serif">
            <h2 className="text-3xl font-bold text-center text-red-600 mb-6">💖 {t("Zodiac Love Match Checker")}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <div>
                    <label className="block mb-1 font-medium">{t("Your Name")}</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={yourName}
                        onChange={(e) => setYourName(e.target.value)}
                        placeholder={t("e.g., Pihu")}
                    />

                    <label className="block mt-4 mb-1 font-medium">{t("Your Zodiac Sign")}</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={yourSign}
                        onChange={(e) => setYourSign(e.target.value)}
                    >
                        <option value="">{t("-- Select Your Sign --")}</option>
                        {Object.keys(compatibilityData).map((sign) => (
                            <option key={sign} value={sign}>
                                {sign.charAt(0).toUpperCase() + sign.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium">{t("Partner's Name")}</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={partnerName}
                        onChange={(e) => setPartnerName(e.target.value)}
                        placeholder={t("e.g., Rahul")}
                    />

                    <label className="block mt-4 mb-1 font-medium">{t("Partner's Zodiac Sign")}</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={partnerSign}
                        onChange={(e) => setPartnerSign(e.target.value)}
                    >
                        <option value="">{t("-- Select Partner's Sign --")}</option>
                        {Object.keys(compatibilityData).map((sign) => (
                            <option key={sign} value={sign}>
                                {sign.charAt(0).toUpperCase() + sign.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="text-center mt-6">
                <button
                    onClick={handleCheckMatch}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded shadow-lg"
                >
                    🔍 {t("Check Love Match")}
                </button>
            </div>

            {matchResult && (
                <div className="mt-8 p-4 bg-white rounded shadow text-center text-lg text-pink-700 font-medium">
                    {matchResult}
                </div>
            )}
        </div>
    );
};

export default LoveMatch;






// import React, { useState } from "react";

// const compatibilityData = {
//     aries: {
//         leo: "🔥 Great fiery match — full of passion!",
//         sagittarius: "🎯 Adventurous and full of energy together!",
//         libra: "💞 Balanced bond but needs compromise.",
//         scorpio: "⚡ Strong attraction but emotional clashes.",
//         cancer: "💔 Can be intense but emotionally unstable."
//     },
//     taurus: {
//         virgo: "🌿 Harmonious and practical love.",
//         capricorn: "💼 Strong, reliable, and goal-oriented pair.",
//         cancer: "💖 Stable and deeply nurturing match.",
//         scorpio: "💔 Passionate but stubbornness may clash.",
//         leo: "🔥 Magnetic but ego clashes possible."
//     },
//     gemini: {
//         libra: "🌀 Mentally stimulating and fun match!",
//         aquarius: "💫 Innovative and exciting connection.",
//         sagittarius: "🌍 Opposites attract — fun and frustrating!",
//         virgo: "🧠 Needs effort to align mindsets.",
//         cancer: "💔 Emotions may overwhelm Gemini's light vibe."
//     },
//     cancer: {
//         scorpio: "💘 Deep, emotional, and loyal match.",
//         pisces: "🌊 Intuitive and emotionally understanding bond.",
//         taurus: "💖 Grounded and nurturing love.",
//         capricorn: "⚖️ Opposites that balance home and ambition.",
//         aries: "💢 Emotional vs impulsive — can be rocky."
//     },
//     leo: {
//         aries: "🔥 Explosive chemistry and drive!",
//         sagittarius: "🎉 Exciting and optimistic pair.",
//         libra: "💎 Glamorous and socially dazzling couple.",
//         taurus: "💔 Strong-willed — power struggles ahead.",
//         scorpio: "⚡ Passionate but controlling mix."
//     },
//     virgo: {
//         taurus: "🌱 Peaceful and steady relationship.",
//         capricorn: "📘 Intelligent, organized, and committed.",
//         cancer: "💖 Caring and nurturing love.",
//         gemini: "🧠 Good communication but different paces.",
//         pisces: "🌗 Opposites that can grow together."
//     },
//     libra: {
//         gemini: "💫 Air signs unite — charm and ideas!",
//         aquarius: "🌬️ Cool, intellectual love connection.",
//         leo: "💛 Balanced glam and charm.",
//         cancer: "💔 Emotions vs diplomacy clash.",
//         capricorn: "⚖️ Work hard for harmony and values."
//     },
//     scorpio: {
//         cancer: "💖 Emotionally intense and loyal bond.",
//         pisces: "🌌 Dreamy, deep, spiritual love.",
//         taurus: "💥 Strong but stubborn relationship.",
//         leo: "🔥 Passionate but possessive.",
//         aries: "⚡ Explosive chemistry — needs control."
//     },
//     sagittarius: {
//         aries: "🎯 Fun, freedom-loving, and wild!",
//         leo: "🌞 Optimistic and daring bond.",
//         aquarius: "🚀 Idealistic and full of adventures.",
//         virgo: "⚠️ Logic vs spontaneity may clash.",
//         pisces: "🌈 Creative match but lacks grounding."
//     },
//     capricorn: {
//         taurus: "💎 Stable, traditional, and loyal.",
//         virgo: "📘 Smart, structured, and goal-oriented.",
//         scorpio: "🛡️ Intense but dependable.",
//         aries: "⚔️ Ambition vs action can clash.",
//         cancer: "🛋️ Home-focused and emotional support."
//     },
//     aquarius: {
//         gemini: "💬 Talkative, curious, and exciting!",
//         libra: "🔮 Social, balanced, and progressive.",
//         sagittarius: "🌍 Philosophical and explorative.",
//         scorpio: "🌀 May struggle with emotional depth.",
//         taurus: "⚠️ Different goals and personalities."
//     },
//     pisces: {
//         cancer: "🌊 Emotionally intuitive and sweet love.",
//         scorpio: "💖 Passionate and deeply spiritual.",
//         virgo: "🌗 Opposites that can teach and heal.",
//         aries: "💢 Dreamy vs impulsive mismatch.",
//         libra: "🎭 Romantic but sometimes idealistic."
//     }
// };

// const LoveMatch = () => {
//     const [yourName, setYourName] = useState("");
//     const [yourSign, setYourSign] = useState("");
//     const [partnerName, setPartnerName] = useState("");
//     const [partnerSign, setPartnerSign] = useState("");
//     const [matchResult, setMatchResult] = useState("");

//     const handleCheckMatch = () => {
//         if (!yourName || !yourSign || !partnerName || !partnerSign) {
//             alert("Please fill all fields!");
//             return;
//         }
//         const sign = yourSign.toLowerCase().trim();
//         const partner = partnerSign.toLowerCase().trim();


//         const result =
//             compatibilityData[sign] && compatibilityData[sign][partner]
//                 ? compatibilityData[sign][partner]
//                 : "💬 Compatibility info not available. Try a popular zodiac pair.";

//         setMatchResult(`💑 ${yourName} (${sign}) ❤️ ${partnerName} (${partner}) — ${result}`);
//     };

//     return (
//         <div className="bg-gradient-to-b from-[#fff1cc] to-[#f4d47c] min-h-screen p-8 text-black font-serif">
//             <h2 className="text-3xl font-bold text-center text-red-600 mb-6">💘 Zodiac Love Match Checker</h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
//                 <div>
//                     <label className="block mb-1 font-medium">Your Name</label>
//                     <input
//                         type="text"
//                         className="w-full p-2 border rounded"
//                         value={yourName}
//                         onChange={(e) => setYourName(e.target.value)}
//                         placeholder="e.g., Pihu"
//                     />


//                     <label className="block mt-4 mb-1 font-medium">Your Zodiac Sign</label>
//                     <select
//                         className="w-full p-2 border rounded"
//                         value={yourSign}
//                         onChange={(e) => setYourSign(e.target.value)}
//                     >
//                         <option value="">-- Select Your Sign --</option>
//                         {Object.keys(compatibilityData).map((sign) => (
//                             <option key={sign} value={sign}>
//                                 {sign.charAt(0).toUpperCase() + sign.slice(1)}
//                             </option>
//                         ))}
//                     </select>

//                 </div>

//                 <div>
//                     <label className="block mb-1 font-medium">Partner's Name</label>
//                     <input
//                         type="text"
//                         className="w-full p-2 border rounded"
//                         value={partnerName}
//                         onChange={(e) => setPartnerName(e.target.value)}
//                         placeholder="e.g., Rahul"
//                     />

//                     <label className="block mt-4 mb-1 font-medium">Partner's Zodiac Sign</label>
//                     <select
//                         className="w-full p-2 border rounded"
//                         value={partnerSign}
//                         onChange={(e) => setPartnerSign(e.target.value)}
//                     >
//                         <option value="">-- Select Partner's Sign --</option>
//                         {Object.keys(compatibilityData).map((sign) => (
//                             <option key={sign} value={sign}>
//                                 {sign.charAt(0).toUpperCase() + sign.slice(1)}
//                             </option>
//                         ))}
//                     </select>

//                 </div>
//             </div>

//             <div className="text-center mt-6">
//                 <button
//                     onClick={handleCheckMatch}
//                     className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded shadow-lg"
//                 >
//                     🔍 Check Love Match
//                 </button>
//             </div>

//             {matchResult && (
//                 <div className="mt-8 p-4 bg-white rounded shadow text-center text-lg text-pink-700 font-medium">
//                     {matchResult}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default LoveMatch;
