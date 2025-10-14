import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
//import i18n from './i18n'; // your i18n setup file

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DailyHoroscope from './pages/DailyHoroscope';
import ZodiacQuiz from './pages/ZodiacQuiz';
import SelectSign from './pages/SelectSign';
import AskStars from './pages/Astrologers';
import Prediction from './pages/Prediction';
import HouseDetail from './pages/HouseDetail';
import ZodiacPersonality from './components/ZodiacPersonality';
import LoveMatch from './components/LoveMatch';
import Blog from './pages/Blog';
import GptBot from './components/GptBot';
import Astrologers from './pages/Astrologers';
import ChartPage from './pages/ChartPage';
import Profile from './pages/Profile';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chart" element={<ChartPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/daily-horoscope" element={<DailyHoroscope />} />
          <Route path="/zodiac-quiz" element={<ZodiacQuiz />} />
          <Route path="/select-sign" element={<SelectSign />} />
          <Route path="/astrologers" element={<Astrologers />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/house-details" element={<HouseDetail />} />
          <Route path="/zodiac-personality" element={<ZodiacPersonality />} />
          <Route path="/love-match" element={<LoveMatch />} />
          <Route path="/daily-blog" element={<Blog />} />
          <Route path="/astro-help" element={<GptBot />} />
        </Routes>
      </Router>
  );
}

export default App;


// import React from 'react'
// import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
// import Home from './pages/Home'
// import Login from './pages/Login'
// import Signup from './pages/Signup'
// import DailyHoroscope from './pages/DailyHoroscope'
// import ZodiacQuiz from "./pages/ZodiacQuiz"; 
// import SelectSign from "./pages/SelectSign"
// import AskStars from './pages/Astrologers'
// import Prediction from './pages/Prediction'
// import HouseDetail from './pages/HouseDetail'
// import ZodiacPersonality from './components/ZodiacPersonality'
// import LoveMatch from './components/LoveMatch'
// import Blog from './pages/Blog'
// import GptBot from './components/GptBot'
// import Astrologers from './pages/Astrologers'
// import ChartPage from './pages/ChartPage'
// import Profile from './pages/Profile'

// function App() {
//   return (
//     <Router>
//        <Routes>
//           <Route path='/' element = {<Home/>}/>
//           <Route path='/login' element = {<Login/>}/>
//           <Route path='/signup' element = {<Signup/>}/>
//           <Route path='/chart' element= {<ChartPage/>}/>
//           <Route path='/profile' element = {<Profile/>}/>
//           <Route path = '/daily-horoscope' element ={<DailyHoroscope/>}/>
//           <Route path="/zodiac-quiz" element={<ZodiacQuiz />} />
//           <Route path='/select-sign' element = {<SelectSign/>}/>
//           <Route path='/astrologers' element={<Astrologers/>}/>
//           <Route path='/prediction' element={<Prediction/>}/>
//           <Route path='/house-details' element={<HouseDetail/>}/>
//           <Route path='/zodiac-personality' element={<ZodiacPersonality/>}/>
//           <Route path='/love-match' element={<LoveMatch/>}/>
//           <Route path='/daily-blog' element = {<Blog/>}/>
//           <Route path='/astro-help' element={<GptBot/>}/>
//        </Routes>
//     </Router>
//   )
// }

// export default App


// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import ChartPage from "./pages/ChartPage";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// //import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       {/* <Route
//         path="/chart"
//         element={
//           <ProtectedRoute>
//             <ChartPage />
//           </ProtectedRoute>
//         }
//       /> */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//     </Routes>
//   );
// }

// export default App;
