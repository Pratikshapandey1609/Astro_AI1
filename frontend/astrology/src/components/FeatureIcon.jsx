import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const FeatureIcon = ({ routeKey, emoji }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const routeMap = {
    selectSign: "/select-sign",
    astrologers: "/astrologers",
    zodiacQuiz: "/zodiac-quiz",
    prediction: "/prediction",
    dailyHoroscope: "/daily-horoscope",
    chart: "/chart",
    dailyBlog: "/daily-blog",
    chatBot: "/astro-help"
  };

  const handleClick = () => {
    const path = routeMap[routeKey];
    if (path) navigate(path);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer flex items-center gap-2 bg-white px-4 py-2 rounded shadow hover:bg-yellow-100 transition"
    >
      <span className="text-2xl">{emoji}</span>
      {/* ✅ Translate using key */}
      <span className="text-sm font-medium text-yellow-900">{t(routeKey)}</span>
    </div>
  );
};

export default FeatureIcon