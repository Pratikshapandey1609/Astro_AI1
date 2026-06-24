import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import panditji from "../assets/panditji.png";
import FeatureIcon from "../components/FeatureIcon";
import GptBot from "../components/GptBot";
import { useTranslation } from "react-i18next";

const Home = () => {
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("");
  const [pob, setPob] = useState("");
  const [user, setUser] = useState(null);

  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("stellara_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("stellara_user");
    setUser(null);
    navigate("/login");
  };

  const handleGenerate = () => {
    if (!dob || !tob || !pob) {
      alert(t("Please fill all details."));
      return;
    }
    const date = new Date(dob);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const zodiac = getZodiacSign(day, month); // Assuming this is defined elsewhere

    localStorage.setItem("userZodiac", zodiac);
    localStorage.setItem("dob", dob);
    localStorage.setItem("tob", tob);
    localStorage.setItem("pob", pob);

    navigate("/daily-horoscope");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff1cc] to-[#f4d47c] text-black font-serif px-4 md:px-12 py-4">
      <Navbar />

      {user && (
        <h2 className="mt-4 mb-6 text-center text-xl font-bold text-yellow-900">
          {t("Welcome back", { name: user.name })}
        </h2>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10">
        <div className="max-w-xl space-y-6 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-900 drop-shadow-lg">
             {t("discover_your_destiny")}
          </h1>
          <p className="text-lg text-yellow-800">
            {t("Experience")} <span className="text-orange-600 font-semibold">{t("AI Astrology")}</span>{" "}
            {t("crafted for you!")}
          </p>

          <form className="space-y-4">
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="bg-white text-black px-4 py-2 rounded w-full border"
              placeholder={t("Date of Birth")}
            />
            <input
              type="time"
              value={tob}
              onChange={(e) => setTob(e.target.value)}
              className="bg-white text-black px-4 py-2 rounded w-full border"
              placeholder={t("Time of Birth")}
            />
            <input
              type="text"
              value={pob}
              onChange={(e) => setPob(e.target.value)}
              className="bg-white text-black px-4 py-2 rounded w-full border"
              placeholder={t("Place of Birth")}
            />
            <button
              type="button"
              onClick={handleGenerate}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded shadow-lg"
            >
              {t("generate_my_chart")}
            </button>
          </form>

          <div className="flex flex-wrap gap-4 pt-6">
           <FeatureIcon routeKey="selectSign" emoji="♒" />
           <FeatureIcon routeKey="zodiacQuiz" emoji="🧭" />
           <FeatureIcon routeKey="dailyHoroscope" emoji="📅" />
           <FeatureIcon routeKey="dailyBlog" emoji="📖" />
           <FeatureIcon routeKey="chatBot" emoji="💬" />
          </div>
        </div>

        <div className="mb-48 w-64 h-64 rounded-full transform hover:scale-110 transition duration-700 ease-in-out">
          <img
            src={panditji}
            alt={t("Panditji")}
            className="w-64 h-64 object-cover rounded-full shadow-lg shadow-yellow-800"
          />
        </div>

        <GptBot />
      </div>
    </div>
  );
};

export default Home;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";
// import panditji from "../assets/panditji.png";
// import FeatureIcon from "../components/FeatureIcon";
// import GptBot from "../components/GptBot";
// import { useTranslation } from "react-i18next";

// const Home = () => {
//   const [dob, setDob] = useState("");
//   const [tob, setTob] = useState("");
//   const [pob, setPob] = useState("");
//   const [user, setUser] = useState(null);

//   const {t} = useTranslation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("stellara_user");
//     if (storedUser) {
//       try {
//         setUser(JSON.parse(storedUser));
//       } catch {
//         setUser(null); // fallback if parsing fails
//       }
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("stellara_user");
//     setUser(null);
//     navigate("/login");
//   };

//   const handleGenerate = () => {
//     if (!dob || !tob || !pob) {
//       alert("Please fill all details.");
//       return;
//     }
//     const date = new Date(dob);
//     const day = date.getDate();
//     const month = date.getMonth() + 1;
//     const zodiac = getZodiacSign(day, month);

//     localStorage.setItem("userZodiac", zodiac);
//     localStorage.setItem("dob", dob);
//     localStorage.setItem("tob", tob);
//     localStorage.setItem("pob", pob);

//     navigate("/daily-horoscope");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#fff1cc] to-[#f4d47c] text-black font-serif px-4 md:px-12 py-4">
//       <Navbar />
// {/* 
//       {user && (
//         <div className="mt-4 mb-6 px-4 py-2 bg-yellow-100 rounded shadow flex justify-between items-center max-w-md">
//           <h2 className="text-lg font-semibold text-yellow-900">
//             Welcome back, {user.name}!
//           </h2>
//           <button
//             onClick={handleLogout}
//             className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded"
//           >
//             Logout
//           </button>
//         </div>
//       )} */}
      
// {/* Simple welcome text below Navbar */}
// {user && (
//   <h2 className="mt-4 mb-6 jjustify content text-center text-xl font-bold text-yellow-900">
//     {t("Welcome back", { name: user.name })}
//   </h2>
// )}
//       {/* Rest of your Home content */}
//       <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-1">
//         {/* Left */}
//         <div className="max-w-xl space-y-6 animate-fade-in-up">
//           <h1 className="text-4xl md:text-5xl font-bold text-yellow-900 drop-shadow-lg">
//             {t("🔮 Discover Your Destiny")}
//           </h1>
//           <p className="text-lg text-yellow-800">
//            {t(" Experience")} <span className="text-orange-600 font-semibold">{t("AI Astrology")}</span> {t("crafted for you!")}
//           </p>

//           <form className="space-y-4">
//             <input
//               type="date"
//               value={dob}
//               onChange={(e) => setDob(e.target.value)}
//               className="bg-white text-black px-4 py-2 rounded w-full border"
//               placeholder={t("Date of Birth")}
//             />
//             <input
//               type="time"
//               value={tob}
//               onChange={(e) => setTob(e.target.value)}
//               className="bg-white text-black px-4 py-2 rounded w-full border"
//               placeholder={t("Time of Birth")}
//             />
//             <input
//               type="text"
//               value={pob}
//               onChange={(e) => setPob(e.target.value)}
//               className="bg-white text-black px-4 py-2 rounded w-full border"
//               placeholder={t("place of Birth")}
//             />
//             <button
//               type="button"
//               onClick={handleGenerate}
//               className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded shadow-lg"
//             >
//               {t("🔯 Generate My Chart")}
//             </button>
//           </form>

//           <div className="flex flex-wrap gap-4 pt-6">
//             <FeatureIcon title="Select Your Sign" emoji="♒" />
//             <FeatureIcon title="Zodiac Quiz" emoji="🧭" />
//             <FeatureIcon title="Daily Horoscope" emoji="📅" />
//             <FeatureIcon title="Daily Blog" emoji="📖" />
//             <FeatureIcon title="Chat Bot" emoji="💬" />
//           </div>
//         </div>

//         {/* Right */}
//         <div className="mb-48 w-64 h-64 rounded-full transform hover:scale-110 transition duration-700 ease-in-out">
//           <img
//             src={panditji}
//             alt="Panditji"
//             className="w-64 h-64 object-cover rounded-full shadow-lg shadow-yellow-800"
//           />
//         </div>
//         <GptBot />
//       </div>
//     </div>
//   );
// };

// export default Home;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";
// import panditji from "../assets/panditji.png";
// import FeatureIcon from "../components/FeatureIcon";
// import GptBot from "../components/GptBot";

// const getZodiacSign = (day, month) => {
//   if ((month === 3 && day >= 21)  || (month === 4 && day <= 19)) return "aries";
//   if ((month === 4 && day >= 20)  || (month === 5 && day <= 20)) return "taurus";
//   if ((month === 5 && day >= 21)  || (month === 6 && day <= 20)) return "gemini";
//   if ((month === 6 && day >= 21)  || (month === 7 && day <= 22)) return "cancer";
//   if ((month === 7 && day >= 23)  || (month === 8 && day <= 22)) return "leo";
//   if ((month === 8 && day >= 23)  || (month === 9 && day <= 22)) return "virgo";
//   if ((month === 9 && day >= 23)  || (month === 10 && day <= 22)) return "libra";
//   if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "scorpio";
//   if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "sagittarius";
//   if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "capricorn";
//   if ((month === 1 &&  day >= 20) || (month === 2 && day <= 18)) return "aquarius";
//   if ((month === 2 &&  day >= 19) || (month === 3 && day <= 20)) return "pisces";
// };

// const Home = () => {
//   const [dob, setDob] = useState("");
//   const [tob, setTob] = useState("");
//   const [pob, setPob] = useState("");
//   const [user, setUser] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("stellara_user");
//     if (storedUser) setUser(JSON.parse(storedUser));
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("stellara_user");
//     setUser(null);
//     navigate("/login");
//   };

//   const handleGenerate = () => {
//     if (!dob || !tob || !pob) {
//       alert("Please fill all details.");
//       return;
//     }

//     const date = new Date(dob);
//     const day = date.getDate();
//     const month = date.getMonth() + 1;
//     const zodiac = getZodiacSign(day, month);

//     // Save user chart data
//     localStorage.setItem("userZodiac", zodiac);
//     localStorage.setItem("dob", dob);
//     localStorage.setItem("tob", tob);
//     localStorage.setItem("pob", pob);

//     navigate("/daily-horoscope");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#fff1cc] to-[#f4d47c] text-black font-serif px-4 md:px-12 py-4">
//       <Navbar />

//       {/* User Greeting */}
//       {user && (
//         <div className="flex justify-between items-center bg-yellow-100 p-3 rounded shadow mb-6">
//           <h2 className="text-lg font-semibold text-yellow-900">
//             Welcome back, {user.name}!
//           </h2>
//           <button
//             onClick={handleLogout}
//             className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded"
//           >
//             Logout
//           </button>
//         </div>
//       )}

//       <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-8">
//         {/* Left */}
//         <div className="max-w-xl space-y-6 animate-fade-in-up">
//           <h1 className="text-4xl md:text-5xl font-bold text-yellow-900 drop-shadow-lg">🔮 Discover Your Destiny</h1>
//           <p className="text-lg text-yellow-800">
//             Experience <span className="text-orange-600 font-semibold">AI Astrology</span> crafted for you!
//           </p>

//           <form className="space-y-4">
//             <input
//               type="date"
//               value={dob}
//               onChange={(e) => setDob(e.target.value)}
//               className="bg-white text-black px-4 py-2 rounded w-full border"
//               placeholder="Date of Birth"
//             />
//             <input
//               type="time"
//               value={tob}
//               onChange={(e) => setTob(e.target.value)}
//               className="bg-white text-black px-4 py-2 rounded w-full border"
//               placeholder="Time of Birth"
//             />
//             <input
//               type="text"
//               value={pob}
//               onChange={(e) => setPob(e.target.value)}
//               className="bg-white text-black px-4 py-2 rounded w-full border"
//               placeholder="Place of Birth"
//             />
//             <button
//               type="button"
//               onClick={handleGenerate}
//               className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded shadow-lg"
//             >
//               🔯 Generate My Chart
//             </button>
//           </form>

//           <div className="flex flex-wrap gap-4 pt-6">
//             <FeatureIcon title="Select Your Sign" emoji="♒" />
//             <FeatureIcon title="Zodiac Quiz" emoji="🧭" />
//             <FeatureIcon title="Daily Horoscope" emoji="📅" />
//             <FeatureIcon title="Daily Blog" emoji="📖" />
//             <FeatureIcon title="Chat Bot" emoji="💬" />
//           </div>
//         </div>

//         {/* Right */}
//         <div className="mb-48 w-64 h-64 rounded-full transform hover:scale-110 transition duration-700 ease-in-out">
//           <img
//             src={panditji}
//             alt="Panditji"
//             className="w-64 h-64 object-cover rounded-full shadow-lg shadow-yellow-800"
//           />
//         </div>
//         <GptBot />
//       </div>
//     </div>
//   );
// };

// export default Home;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import panditji from "../assets/panditji.png";
// import FeatureIcon from "../components/FeatureIcon";
// import Navbar from "./Navbar";

// const Home = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loggedIn = localStorage.getItem("stellara_user");
//     setIsLoggedIn(!!loggedIn);
//   }, []);

//   // 🚀 Submit Form and Save to LocalStorage
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     const dob = e.target.dob.value;
//     const tob = e.target.tob.value;
//     const pob = e.target.pob.value;

//     try {
//       const response = await fetch(
//         `https://api.opencagedata.com/geocode/v1/json?q=${pob}&key=73ce76106f6d488fb4870798442e849e`
//       );
//       const data = await response.json();

//       if (!data.results.length) {
//         alert("Invalid Place of Birth");
//         return;
//       }

//       const { lat, lng } = data.results[0].geometry;

//       const birthData = {
//         dob,
//         tob,
//         coordinates: {
//           latitude: lat,
//           longitude: lng,
//         },
//       };

//       localStorage.setItem("astro_birth_data", JSON.stringify(birthData));
//       alert("Details saved! Redirecting...");

//       if (localStorage.getItem("stellara_user")) {
//         navigate("/chart");
//       } else {
//         navigate("/login");
//       }
//     } catch (error) {
//       console.error("Error fetching coordinates:", error);
//       alert("Failed to get location. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#fff1cc] to-[#f4d47c] text-black font-serif px-4 md:px-12 py-4 md:py-4 transition-all duration-500">

//       <div className="flex justify-between items-center px-4 py-3 rounded-lg shadow-md mb-4">
//         <h1 className="text-2xl md:text-3xl font-bold text-yellow-900">🔯 AstroAI</h1>
//         {!isLoggedIn ? (
//           <button
//             onClick={() => navigate("/login")}
//             className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded shadow-md transition duration-300"
//           >
//             Login / Signup
//           </button>
//         ) : (
//           <span className="text-green-700 font-medium">Welcome back 👋</span>
//         )}
//       </div>

//       {/* Main Section */}
//       <div className="flex flex-col md:flex-row justify-between items-center gap-10 animate-fade-in-up transition-opacity duration-1000">
//         {/* Left Content */}
//         <div className="max-w-xl space-y-6">
//           <h2 className="text-4xl md:text-5xl font-bold text-yellow-900 drop-shadow-lg animate-pulse">
//             🔮 Discover Your Destiny
//           </h2>
//           <p className="text-lg leading-relaxed text-yellow-800">
//             Experience the magic of <span className="text-orange-600 font-semibold">AI Astrology</span> crafted for your unique birth details!
//           </p>

//           {/* Form */}
//           <form className="space-y-4" onSubmit={handleFormSubmit}>
//             <div className="flex gap-4">
//               <input
//                 name="dob"
//                 type="date"
//                 className="bg-white text-black px-4 py-2 rounded w-full border border-yellow-300 shadow-sm"
//               />
//               <input
//                 name="tob"
//                 type="time"
//                 className="bg-white text-black px-4 py-2 rounded w-full border border-yellow-300 shadow-sm"
//               />
//             </div>
//             <input
//               name="pob"
//               type="text"
//               placeholder="Place of Birth (POB)"
//               className="bg-white text-black px-4 py-2 rounded w-full border border-yellow-300 shadow-sm"
//             />
//             <button
//               type="submit"
//               className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded shadow-lg transition duration-300"
//             >
//               🔯 Generate My Chart
//             </button>
//           </form>

//           {/* Features */}
//           <div className="flex flex-wrap gap-4 pt-6">
//             <FeatureIcon title="Select Your Sign" emoji="♒" />
//             <FeatureIcon title="Ask the Stars" emoji="🔮" />
//             <FeatureIcon title="Zodiac Quiz" emoji="🧭" />
//             <FeatureIcon title="Download Prediction" emoji="⬇️" />
//             <FeatureIcon title="Daily Horoscope" emoji="🗓️" />
//           </div>
//         </div>

//         {/* Panditji Image */}
//         <div className="w-64 h-64 mb-28 rounded-full transform hover:scale-110 transition-transform duration-700 ease-in-out">
//           <img
//             src={panditji}
//             alt="Panditji Astrology Guide"
//             className="w-64 h-64 object-cover rounded-full shadow-xl shadow-yellow-800"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import panditji from "../assets/panditji.png";
// // import FeatureIcon from "../components/FeatureIcon";
// // import Navbar from "./Navbar";

// // const Home = () => {
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const navigate = useNavigate();

// //   // Simulate checking localStorage/session (can be replaced with real auth)
// //   useEffect(() => {
// //     const loggedIn = localStorage.getItem("isLoggedIn") === "true";
// //     setIsLoggedIn(loggedIn);
// //   }, []);

// //   const handleLogin = () => {
// //     setIsLoggedIn(true);
// //     localStorage.setItem("isLoggedIn", "true");
// //   };

// //   const goToNextPage = () => {
// //     if (!isLoggedIn) {
// //       alert("Please login to generate your chart!");
// //       return;
// //     }
// //     navigate("/chart");
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-[#fff1cc] to-[#f4d47c] text-black font-serif px-4 md:px-12 py-4 md:py-4  transition-all duration-500">
      
// //       {/* Navbar */}
// //       <Navbar/>
// //       <div className="flex justify-between items-center  px-4 py-3 rounded-lg shadow-md mb-4">
// //         <h1 className="text-2xl md:text-3xl font-bold text-yellow-900">🔯 AstroAI</h1>
// //         {!isLoggedIn ? (
// //           <button
// //             onClick={handleLogin}
// //             className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded shadow-md transition duration-300"
// //           >
// //             Login / Signup
// //           </button>
// //         ) : (
// //           <span className="text-green-700 font-medium">Welcome back 👋</span>
// //         )}
// //       </div>

// //       {/* Main Section */}
// //       <div className="flex flex-col md:flex-row justify-between items-center gap-10 animate-fade-in-up transition-opacity duration-1000">
        
// //         {/* Left Content */}
// //         <div className="max-w-xl space-y-6">
// //           <h2 className="text-4xl md:text-5xl font-bold text-yellow-900 drop-shadow-lg animate-pulse">
// //             🔮 Discover Your Destiny
// //           </h2>
// //           <p className="text-lg leading-relaxed text-yellow-800">
// //             Experience the magic of <span className="text-orange-600 font-semibold">AI Astrology</span> crafted for your unique birth details!
// //           </p>

// //           {/* Form */}
// //           <form className="space-y-4">
// //             <div className="flex gap-4">
// //               <input
// //                 type="date"
// //                 className="bg-white text-black px-4 py-2 rounded w-full border border-yellow-300 shadow-sm"
// //               />
// //               <input
// //                 type="time"
// //                 className="bg-white text-black px-4 py-2 rounded w-full border border-yellow-300 shadow-sm"
// //               />
// //             </div>
// //             <input
// //               type="text"
// //               placeholder="Place of Birth (POB)"
// //               className="bg-white text-black px-4 py-2 rounded w-full border border-yellow-300 shadow-sm"
// //             />
// //             <button
// //               type="button"
// //               onClick={goToNextPage}
// //               className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded shadow-lg transition duration-300"
// //             >
// //               🔯 Generate My Chart
// //             </button>
// //           </form>

// //           {/* Features */}
// //           <div className="flex flex-wrap gap-4 pt-6">
// //             <FeatureIcon title="Select Your Sign" emoji="♒" />
// //             <FeatureIcon title="Ask the Stars" emoji="🔮" />
// //             <FeatureIcon title="Zodiac Quiz" emoji="🧭" />
// //             <FeatureIcon title="Download Prediction" emoji="⬇️" />
// //           </div>
// //         </div>

// //         {/* Panditji Image */}
// //         <div className="w-64 h-64 mb-28 rounded-full  transform hover:scale-110 transition-transform duration-700 ease-in-out">
// //           <img
// //             src={panditji}
// //             alt="Panditji Astrology Guide"
// //             className="w-64 h-64 object-cover rounded-full shadow-xl shadow-yellow-800"
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Home;
