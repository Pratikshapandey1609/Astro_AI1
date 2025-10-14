
import React from "react";
import { useTranslation } from "react-i18next";

const RashiCircle = () => {
  const radius = 160;
  const { t } = useTranslation();

  // Define zodiacSigns inside the component so t() can be used
  const zodiacSigns = [
    { name: t("Aries"), emoji: "♈" },
    { name: t("Taurus"), emoji: "♉" },
    { name: t("Gemini"), emoji: "♊" },
    { name: t("Cancer"), emoji: "♋" },
    { name: t("Leo"), emoji: "♌" },
    { name: t("Virgo"), emoji: "♍" },
    { name: t("Libra"), emoji: "♎" },
    { name: t("Scorpio"), emoji: "♏" },
    { name: t("Sagittarius"), emoji: "♐" },
    { name: t("Capricorn"), emoji: "♑" },
    { name: t("Aquarius"), emoji: "♒" },
    { name: t("Pisces"), emoji: "♓" },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#fff1cc] to-[#f4d47c] flex items-center justify-center">
      <div className="relative w-[400px] h-[400px] mx-auto my-12 rounded-full border-4 border-yellow-600 shadow-xl">
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center text-yellow-800 font-bold text-xl animate-pulse">
          🔯 {t("Select Your Rashi")}
        </div>

        {zodiacSigns.map((sign, index) => {
          const angle = (index / zodiacSigns.length) * 2 * Math.PI;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          return (
            <div
              key={sign.name}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 text-center cursor-pointer hover:scale-110 transition duration-300"
              style={{
                left: `${200 + x}px`,
                top: `${190 + y}px`,
              }}
            >
              <div className="text-3xl">{sign.emoji}</div>
              <div className="text-sm text-yellow-700 font-medium">{sign.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RashiCircle;


// import React from "react";
// import { useTranslation } from "react-i18next";

//   const zodiacSigns = [
//   { name: {t("Aries")}, emoji: "♈" },
//   { name: "Taurus", emoji: "♉" },
//   { name: "Gemini", emoji: "♊" },
//   { name: "Cancer", emoji: "♋" },
//   { name: "Leo", emoji: "♌" },
//   { name: "Virgo", emoji: "♍" },
//   { name: "Libra", emoji: "♎" },
//   { name: "Scorpio", emoji: "♏" },
//   { name: "Sagittarius", emoji: "♐" },
//   { name: "Capricorn", emoji: "♑" },
//   { name: "Aquarius", emoji: "♒" },
//   { name: "Pisces", emoji: "♓" },
// ];

// const RashiCircle = () => {
//   const radius = 160;
//   const {t} = useTranslation();

//   return (

//     <div className="w-full min-h-screen bg-gradient-to-b from-[#fff1cc] to-[#f4d47c] flex items-center justify-center">

//       <div className=" relative w-[400px] h-[400px] mx-auto my-12 rounded-full border-4 border-yellow-600 shadow-xl">
//       {/* Center text */}
//       <div className="absolute inset-0 flex items-center justify-center text-yellow-800 font-bold text-xl animate-pulse">
//         🔯 {t("Select Your Rashi")}
//       </div>

//       {zodiacSigns.map((sign, index) => {
//         const angle = (index / zodiacSigns.length) * 2 * Math.PI;
//         const x = radius * Math.cos(angle);
//         const y = radius * Math.sin(angle);

//         return (
//           <div
//             key={sign.name}
//             className="absolute transform -translate-x-1/2 -translate-y-1/2 text-center cursor-pointer hover:scale-110 transition duration-300"
//             style={{
//               left: `${200 + x}px`,
//               top:  `${190 + y}px`,
//             }}
//           >
//             <div className="text-3xl">{sign.emoji}</div>
//             <div className="text-sm text-yellow-700 font-medium">{sign.name}</div>
//           </div>
//         );
//       })}
//     </div>
//     </div>
//   );
// };

// export default RashiCircle;
