import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import translation hook

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("stellara_user");
  
  const { i18n, t } = useTranslation();
  
  const handleLogout = () => {
    localStorage.removeItem("stellara_user");
    navigate("/");
    window.location.reload();
  };

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value); // Change language on selection
  };

  return (
    <nav className="w-full px-6 py-3 flex justify-between items-center bg-[#f0db96c9] text-yellow-900 shadow-sm sticky top-0 z-50">
      <h2 className="text-xl text-yellow-950 font-bold animate-pulse">{t("🔯AstroAI")}</h2>

      <div className="flex items-center space-x-4">
        {!isLoggedIn ? (
          <div className="space-x-4 text-sm">
            <Link to="/login" className="hover:underline">{t("Login")}</Link>
            <Link to="/signup" className="hover:underline">{t("Sign Up")}</Link>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="text-yellow-950 rounded-xl text-sm px-3 py-1 hover:bg-yellow-600"
          >
            {t("Logout")}
          </button>
        )}

        {/* Language Dropdown */}
        <select
          onChange={changeLanguage}
          defaultValue={i18n.language}
          className="bg-white text-black px-3 py-1 rounded border border-yellow-300"
        >
          <option value="en">{t("English")}</option>
          <option value="hi">{t("Hindi")}</option>
          <option value="es">{t("Spanish")}</option>
          <option value="fr">{t("French")}</option>
          <option value="sa">{t("Sanskrit")}</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;

// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next"; // Import translation hook

// const Navbar = () => {
//   const navigate = useNavigate();
//   const isLoggedIn = localStorage.getItem("stellara_user");
  
//  const { i18n } = useTranslation();
//   const {t} = useTranslation();
  
//   const handleLogout = () => {
//     localStorage.removeItem("stellara_user");
//     navigate("/");
//     window.location.reload();
//   };

//   const changeLanguage = (e) => {
//     i18n.changeLanguage(e.target.value); // Change language on selection
//   };

//   return (
//     <nav className="w-full px-6 py-3 flex justify-between items-center bg-[#f0db96c9] text-yellow-900 shadow-sm sticky top-0 z-50">
//       <h2 className="text-xl text-yellow-950 font-bold animate-pulse">{t("🔯AstroAI")}</h2>

//       <div className="flex items-center space-x-4">
//         {!isLoggedIn ? (
//           <div className="space-x-4 text-sm">
//             <Link to="/login" className="hover:underline">{t("Login")}</Link>
//             <Link to="/signup" className="hover:underline">{t("Sign Up")}</Link>
//           </div>
//         ) : (
//           <button
//             onClick={handleLogout}
//             className="text-yellow-950 rounded-xl text-sm px-3 py-1  hover:bg-yellow-600"
//           >
//            {t(" Logout")}
//           </button>
//         )}

//         {/* Language Dropdown */}
//         <select
//           onChange={changeLanguage}
//           defaultValue={i18n.language} // Show current language selected
//           className="bg-white text-black px-3 py-1 rounded border border-yellow-300"
//         >
//           <option value="en">English</option>
//           <option value="hi">Hindi</option>
//           <option value="es">Spanish</option>
//           <option value="fr">French</option>
//           <option value="sa">Sanskrit</option>
//           {/* Add more languages here if needed */}
//         </select>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const isLoggedIn = localStorage.getItem("stellara_user");

//   const handleLogout = () => {
//     localStorage.removeItem("stellara_user");
//     navigate("/");
//     window.location.reload(); // Refresh to re-render Home with login buttons back
//   };

//   return (
//     <nav className="w-full px-6 py-3 flex justify-between items-center bg-[#f0db96c9] text-yellow-900 shadow-sm sticky top-0 z-50">
//       <h2 className="text-xl text-yellow-950 font-bold animate-pulse">🔯AstroAI </h2>

//       {!isLoggedIn ? (
//         <div className="space-x-4 text-sm">
//           <Link to="/login" className="hover:underline">Login</Link>
//           <Link to="/signup" className="hover:underline">Sign Up</Link>
//         </div>
//       ) : (
//         <button
//           onClick={handleLogout}
//           className="text-yellow-950 rounded-xl text-sm px-3 py-1 rounded hover:bg-yellow-600"
//         >
//           Logout
//         </button>
//       )}
//     </nav>
//   );
// };

// export default Navbar;



// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const storedUser = localStorage.getItem("stellara_user");
//   const user = storedUser ? JSON.parse(storedUser) : null;

//   const handleLogout = () => {
//     localStorage.removeItem("stellara_user");
//     navigate("/login");
//   };

//   return (
//     <nav className="w-full bg-yellow-100 shadow-md px-6 py-3 flex justify-between items-center font-serif">
//       <div className="text-2xl font-bold text-yellow-900 cursor-pointer" onClick={() => navigate("/")}>
//         AstroAI
//       </div>

//       <div className="flex items-center gap-6">
//         <Link to="/daily-horoscope" className="text-yellow-900 hover:text-yellow-700 transition">
//           Daily Horoscope
//         </Link>
//         <Link to="/zodiac-quiz" className="text-yellow-900 hover:text-yellow-700 transition">
//           Zodiac Quiz
//         </Link>
//         <Link to="/daily-blog" className="text-yellow-900 hover:text-yellow-700 transition">
//           Blog
//         </Link>

//         {user ? (
//           <div className="relative group">
//             <button className="flex items-center gap-2 px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition">
//               {user.name}
//             </button>
//             <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded opacity-0 group-hover:opacity-100 transition duration-200">
//               <button
//                 onClick={handleLogout}
//                 className="block w-full text-left px-4 py-2 text-red-600 hover:bg-yellow-100 rounded"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         ) : (
//           <Link
//             to="/login"
//             className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
//           >
//             Login
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
