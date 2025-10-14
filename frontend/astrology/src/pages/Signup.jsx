import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Added translation hook
import { signup } from "../api/auth";

const Signup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const data = await signup({ name, email, password });
      if (data.success) {
        localStorage.setItem(
          "stellara_user",
          JSON.stringify({ name: data.user.name, email: data.user.email, token: data.token })
        );
        navigate("/login");
      } else {
        alert(data.error || data.message || t("Signup failed"));
      }
    } catch (error) {
      console.log("signup failed :", error);
      alert(t("An error occurred, please try again"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff1cc] font-serif">
      <div className="bg-[#d5c085] p-8 rounded shadow-xl w-full max-w-sm text-black">
        <h2 className="text-2xl font-bold mb-4 text-yellow-900">{t("signup_title")}</h2>

        <input
          type="text"
          placeholder={t("full_name")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-yellow-300 rounded mb-3"
        />
        <input
          type="email"
          placeholder={t("Enter Email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-yellow-300 rounded mb-3"
        />
        <input
          type="password"
          placeholder={t("Enter Password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-yellow-300 rounded mb-4"
        />

        <button
          onClick={handleSignup}
          className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 transition duration-300"
        >
          {t("Create Account")}
        </button>

        <p className="mt-4 text-sm text-gray-700">
          {t("Already have an account?")}
          <span
            onClick={() => navigate("/login")}
            className="text-yellow-700 hover:underline cursor-pointer"
          >
            {t("Login")}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { signup } from "../api/auth";

// const Signup = () => {
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSignup = async () => {
//     try {
//       const data = await signup({ name, email, password });
//       if (data.success) {
//         // Save login status (simulated)
//         localStorage.setItem(
//           "stellara_user",
//           JSON.stringify({ name: data.user.name, email: data.user.email, token: data.token })
//         );
//         //localStorage.setItem("stellara_user", data.token);
//         navigate("/login");
//       } else {
//         alert(data.error || data.message || "Signup failed...")
//       }
//     } catch (error) {
//       console.log("signup failed :", error);
//       alert("An error Occurred , please try  again...")
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#fff1cc] font-serif">
//       <div className="bg-[#d5c085] p-8 rounded shadow-xl w-full max-w-sm text-black">
//         <h2 className="text-2xl font-bold mb-4 text-yellow-900">📝 Sign Up to AstroAI </h2>

//         <input
//           type="text"
//           placeholder="Full Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full px-4 py-2 border border-yellow-300 rounded mb-3"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full px-4 py-2 border border-yellow-300 rounded mb-3"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full px-4 py-2 border border-yellow-300 rounded mb-4"
//         />

//         <button
//           onClick={handleSignup}
//           className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 transition duration-300"
//         >
//           Create Account
//         </button>

//         <p className="mt-4 text-sm text-gray-700">
//           Already have an account?{" "}
//           <span
//             onClick={() => navigate("/login")}
//             className="text-yellow-700 hover:underline cursor-pointer"
//           >
//             Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;
