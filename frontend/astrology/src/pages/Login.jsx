import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Added translation hook
import { login } from "../api/auth";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data = await login({ email, password });
      if (data.success) {
        localStorage.setItem(
          "stellara_user",
          JSON.stringify({ name: data.user.name, email: data.user.email, token: data.token })
        );
        navigate("/chart");
      } else {
        alert(data.message || t("Login failed"));
      }
    } catch (error) {
      console.log("Login Failed :", error);
      alert(t("An error occurred, please try again"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff1cc]">
      <div className="bg-[#d5c085] p-8 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-yellow-900">{t("Login to AstroAI")}</h2>
        <input
          type="text"
          placeholder={t("Enter Email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-3"
        />
        <input
          type="password"
          placeholder={t("Enter Password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4"
        />
        <button
          onClick={handleLogin}
          className="bg-yellow-600 text-white px-4 py-2 rounded w-full"
        >
          {t("Login")}
        </button>
      </div>
    </div>
  );
};

export default Login;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { login } from "../api/auth";

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     try {

//       const data = await login({ email, password });
//       if (data.success) {
//         localStorage.setItem(
//           "stellara_user",
//           JSON.stringify({ name: data.user.name, email: data.user.email, token: data.token })
//         );
//         //localStorage.setItem("stellara_user", data.token);

//         console.log("Navigating to /chart page")
//         navigate("/chart");
//       } else {
//         alert(data.message || "Login failed");
//       }
//     } catch (error) {
//       console.log("Login Failed :", error);
//       alert("An Error Occurred, Please try again !!")
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#fff1cc]">
//       <div className="bg-[#d5c085] p-8 rounded shadow-lg w-full max-w-sm">
//         <h2 className="text-xl font-bold mb-4 text-yellow-900">🔐 Login to AstroAI</h2>
//         <input
//           type="text"
//           placeholder="Enter Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full px-4 py-2 border rounded mb-3"
//         />
//         <input
//           type="password"
//           placeholder="Enter Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full px-4 py-2 border rounded mb-4"
//         />
//         <button
//           onClick={handleLogin}
//           className="bg-yellow-600 text-white px-4 py-2 rounded w-full"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;
