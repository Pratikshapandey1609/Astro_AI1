import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/authStore.js';

// Public pages (kept from original)
import Home from './pages/Home';
import DailyHoroscope from './pages/DailyHoroscope';
import ZodiacQuiz from './pages/ZodiacQuiz';
import SelectSign from './pages/SelectSign';
import HouseDetail from './pages/HouseDetail';
import Blog from './pages/Blog';

// Auth pages (rebuilt)
import Login from './pages/Login';
import Signup from './pages/Signup';

// Protected pages (rebuilt)
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Kundli from './pages/Kundli';
import AskAI from './pages/AskAI';
import AstrologerList from './pages/AstrologerList';
import ChatSession from './pages/ChatSession';
import WalletPage from './pages/WalletPage';
import Predictions from './pages/Predictions';

// Kept original components used as pages
import ZodiacPersonality from './components/ZodiacPersonality';
import LoveMatch from './components/LoveMatch';
import GptBot from './components/GptBot';

// Footer component
import Footer from './components/ui/Footer.jsx';

function ProtectedRoute({ children }) {
  const { token } = useAuthStore();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/daily-horoscope" element={<DailyHoroscope />} />
            <Route path="/zodiac-quiz" element={<ZodiacQuiz />} />
            <Route path="/select-sign" element={<SelectSign />} />
            <Route path="/zodiac-personality" element={<ZodiacPersonality />} />
            <Route path="/love-match" element={<LoveMatch />} />
            <Route path="/daily-blog" element={<Blog />} />
            <Route path="/house-details" element={<HouseDetail />} />

            {/* Protected */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/kundli" element={<ProtectedRoute><Kundli /></ProtectedRoute>} />
            <Route path="/ask" element={<ProtectedRoute><AskAI /></ProtectedRoute>} />
            <Route path="/astrologers" element={<ProtectedRoute><AstrologerList /></ProtectedRoute>} />
            <Route path="/session/:id" element={<ProtectedRoute><ChatSession /></ProtectedRoute>} />
            <Route path="/wallet" element={<ProtectedRoute><WalletPage /></ProtectedRoute>} />
            <Route path="/predictions" element={<ProtectedRoute><Predictions /></ProtectedRoute>} />
            <Route path="/astro-help" element={<ProtectedRoute><GptBot /></ProtectedRoute>} />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
