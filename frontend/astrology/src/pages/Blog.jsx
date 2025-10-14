import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Blog = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  const articles = [
    { title: t("blog_article1_title"), content: t("blog_article1_content") },
    { title: t("blog_article2_title"), content: t("blog_article2_content") },
    { title: t("blog_article3_title"), content: t("blog_article3_content") },
    { title: t("blog_article4_title"), content: t("blog_article4_content") },
    { title: t("blog_article5_title"), content: t("blog_article5_content") },
    { title: t("blog_article6_title"), content: t("blog_article6_content") },
    { title: t("blog_article7_title"), content: t("blog_article7_content") },
    { title: t("blog_article8_title"), content: t("blog_article8_content") },
    { title: t("blog_article9_title"), content: t("blog_article9_content") },
  ];

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-b from-[#fff1cc] to-[#f4d47c] min-h-screen px-6 py-10 text-black font-serif">
      <h1 className="text-4xl font-bold text-center text-yellow-900 mb-6 animate-pulse">
        {t("blog_title")}
      </h1>

      <div className="space-y-8 max-w-3xl mx-auto">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article, index) => (
            <article key={index} className="bg-white p-6 rounded shadow">
              <h2 className="text-2xl font-semibold text-yellow-800 mb-2">
                {article.title}
              </h2>
              <p>{article.content}</p>
            </article>
          ))
        ) : (
          <p className="text-center text-gray-600">{t("no_articles")}</p>
        )}
      </div>
    </div>
  );
};

export default Blog;









// import React, { useState } from "react";
// const Blog = () => {
//     const [searchTerm, setSearchTerm] = useState("");

//     const articles = [
//         {
//             title: "What is a Birth Chart?",
//             content: `A birth chart (also known as a natal chart) is a snapshot of the sky at the moment and place of your birth.
// It shows the positions of the sun, moon, and planets across 12 zodiac houses—each linked to different areas of life like relationships, career, and family.
// The sun sign reveals your core identity, the moon sign reflects your emotions, and the rising sign shows how you appear to others.
// Together, these elements provide a personalized blueprint of your personality and destiny.`
//         },
//         {
//             title: "Sun, Moon, and Rising Signs Explained",
//             content: `Your sun sign represents your core personality and conscious self.
// The moon sign reveals your emotional inner world—how you react, feel, and nurture.
// The rising sign (or ascendant) reflects how others see you and how you begin things in life.
// All three work together to create your full astrological profile, beyond just your daily horoscope.`
//         },
//         {
//             title: "What Do the 12 Houses in Astrology Mean?",
//             content: `Each house in your birth chart governs a specific life area:

// 1st House – Self and appearance  
// 2nd House – Money, values, and possessions  
// 3rd House – Communication and siblings  
// 4th House – Home and roots  
// 5th House – Creativity and romance  
// 6th House – Health and routine  
// 7th House – Relationships and partnerships  
// 8th House – Transformation and shared resources  
// 9th House – Travel and beliefs  
// 10th House – Career and reputation  
// 11th House – Friendships and goals  
// 12th House – Subconscious and spirituality

// Planets in these houses influence where and how their energy manifests in your life.`
//         },
//         {
//             title: "Why Are You Drawn to Certain Signs?",
//             content: `Emotional and romantic attraction in astrology goes beyond sun signs.
// Your moon sign rules emotional compatibility, while Venus and Mars indicate love language and passion.
// Some signs naturally harmonize due to their elements (fire, earth, air, water), creating strong bonds.
// This explains why you may feel instantly connected—or repelled—by certain zodiac signs.`
//         },
//         {
//             title: "Mercury Retrograde: What Is It and Should You Worry?",
//             content: `Mercury retrograde is when the planet appears to move backward in its orbit.
// Astrologically, it’s linked to delays, communication issues, tech glitches, and travel problems.
// It’s not a time to fear, but rather to reflect, revise, and pause before making decisions.
// Think of it as a reset period—double-check your plans and stay flexible.`
//         },
//         {
//             title: "Rashi vs Western Zodiac – What’s the Real Difference?",
//             content: `Western astrology is based on the tropical zodiac and focuses on the sun sign.
// Vedic (Indian) astrology uses the sidereal zodiac and emphasizes the moon sign, or Rashi.
// This often results in different signs depending on the system used.
// Western astrology highlights personality, while Rashi reveals karmic patterns and emotional depth.
// Combining both systems provides a more holistic understanding of your astrological blueprint.`
//         },
//         {
//             title: "How Planets Influence Your Career and Ambitions",
//             content: `In astrology, the 10th house governs career, public life, and ambitions.
// Key planets influence your work path:
// - Mercury supports communication and writing careers  
// - Venus leans toward art, fashion, and beauty  
// - Mars brings energy to sports or leadership  
// - Jupiter aligns with teaching, law, or philosophy  
// - Saturn governs structure, discipline, and long-term success

// The signs and planets in your 10th house reveal your professional strengths.`
//         },
//         {
//             title: "New Moon vs Full Moon – What Should You Manifest?",
//             content: `The moon’s phases influence energy and intention.

// - The New Moon is for new beginnings. Set goals, start projects, and plant seeds.  
// - The Full Moon is about culmination. Reflect, celebrate, or release what no longer serves you.

// Aligning your actions with lunar cycles can amplify personal growth and intention setting.`
//         },
//         {
//             title: "Your Rising Sign is the Real Game-Changer",
//             content: `Your rising sign (ascendant) determines how others see you and how you naturally start things.
// It’s the zodiac sign that was on the horizon at your birth and sets the structure of your entire chart.
// While sun signs describe identity, the rising sign shapes first impressions, behavior, and outer expression.
// For accurate astrology readings, always consider your rising sign.`
//         }
//     ];

//     const filteredArticles = articles.filter(
//         (article) =>
//             article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             article.content.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className="bg-gradient-to-b from-[#fff1cc] to-[#f4d47c] min-h-screen px-6 py-10 text-black font-serif">
//             <h1 className="text-4xl font-bold text-center text-yellow-900 mb-6 animate-pulse">📖 Astrology Blog</h1>

//             {/* 🔍 Search Box
//             <div className="max-w-xl mx-auto mb-10">
//                 <input
//                     type="text"
//                     placeholder="🔎 Search articles (e.g., moon, rising, career)"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full p-3 rounded shadow border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                 />
//             </div> */}

//             {/* Articles */}
//             <div className="space-y-8 max-w-3xl mx-auto">
//                 {filteredArticles.length > 0 ? (
//                     filteredArticles.map((article, index) => (
//                         <article key={index} className="bg-white p-6 rounded shadow">
//                             <h2 className="text-2xl font-semibold text-yellow-800 mb-2">{article.title}</h2>
//                             <p>{article.content}</p>
//                         </article>
//                     ))
//                 ) : (
//                     <p className="text-center text-gray-600">No articles found. Try a different keyword.</p>
//                 )}
//             </div>
//         </div>
//     );
// };
// export default Blog;




// import React from "react";

// const Blog = () => {
//   return (
//     <div className="bg-gradient-to-b from-[#fff1cc] to-[#f4d47c] min-h-screen px-6 py-10 text-black font-serif">
//       <h1 className="text-4xl font-bold text-center text-yellow-900 mb-10">📖 Astrology Blog</h1>

//       <div className="space-y-8 max-w-3xl mx-auto">

//         {/* Article 1 */}
//         <article className="bg-white p-6 rounded shadow">
//           <h2 className="text-2xl font-semibold text-yellow-800 mb-2">🔮 What is a Birth Chart?</h2>
//           <p>
//             A birth chart (natal chart) is a celestial snapshot of the sky at the exact moment and place you were born.
//             It includes your sun sign (core self), moon sign (emotions), and rising sign (how others perceive you).
//             It also shows where the planets were located across 12 zodiac houses, each governing an area of your life —
//             like career, love, or family. Birth charts are the foundation of personal astrology.
//           </p>
//         </article>

//         {/* Article 2 */}
//         <article className="bg-white p-6 rounded shadow">
//           <h2 className="text-2xl font-semibold text-yellow-800 mb-2">🌗 Sun, Moon, and Rising Signs Explained</h2>
//           <p>
//             Your <strong>Sun sign</strong> is your basic identity and ego — the essence of who you are.
//             The <strong>Moon sign</strong> reflects your emotional inner world, instincts, and hidden feelings.
//             Meanwhile, your <strong>Rising sign</strong> (ascendant) determines how the world sees you and your first impressions.
//             Understanding all three gives a much deeper picture of your personality than just your zodiac sign.
//           </p>
//         </article>

//         {/* Article 3 */}
//         <article className="bg-white p-6 rounded shadow">
//           <h2 className="text-2xl font-semibold text-yellow-800 mb-2">🏠 What Do the 12 Houses in Astrology Mean?</h2>
//           <p>
//             Each of the 12 astrological houses represents a specific aspect of life:
//             <br />
//             <strong>1st:</strong> Self & appearance<br />
//             <strong>2nd:</strong> Money & possessions<br />
//             <strong>3rd:</strong> Communication<br />
//             <strong>4th:</strong> Home & family<br />
//             <strong>5th:</strong> Love & creativity<br />
//             <strong>6th:</strong> Health & service<br />
//             <strong>7th:</strong> Relationships & marriage<br />
//             <strong>8th:</strong> Transformation & secrets<br />
//             <strong>9th:</strong> Travel & beliefs<br />
//             <strong>10th:</strong> Career & reputation<br />
//             <strong>11th:</strong> Friendships & goals<br />
//             <strong>12th:</strong> Subconscious & spirituality<br />
//             Your planets in these houses reveal where energy flows in your life.
//           </p>
//         </article>

//         {/* Article 4 */}
//         <article className="bg-white p-6 rounded shadow">
//           <h2 className="text-2xl font-semibold text-yellow-800 mb-2">💘 Why Do You Feel Emotionally Drawn to Certain Signs?</h2>
//           <p>
//             Ever felt instantly connected with a stranger? Astrology suggests it might be more than coincidence.
//             Your <strong>moon sign</strong> governs emotions, while their <strong>sun or Venus sign</strong> might match yours, creating instant chemistry.
//             Water signs like Cancer, Scorpio, and Pisces naturally bond deeply, while fire signs like Aries and Leo seek passion.
//             Compatibility isn't just about love — it's about emotional understanding too.
//           </p>
//         </article>

//         {/* Article 5 */}
//         <article className="bg-white p-6 rounded shadow">
//           <h2 className="text-2xl font-semibold text-yellow-800 mb-2">🧘‍♀️ Mercury Retrograde: What Is It & Should You Worry?</h2>
//           <p>
//             When Mercury is in retrograde, it appears to move backward in the sky. This astrological period is often
//             blamed for tech glitches, miscommunication, and delays. While it’s not all doom and gloom, it’s a great time
//             to <em>review, reflect, and reconnect</em>. Avoid signing new contracts and double-check your emails.
//             But remember — growth often comes from revisiting the past!
//           </p>
//         </article>

//         {/* Article 6 */}
//         <article className="bg-white p-6 rounded shadow">
//           <h2 className="text-2xl font-semibold text-yellow-800 mb-2">🌍 Rashi vs Western Zodiac — What’s the Real Difference?</h2>
//           <p>
//             Western astrology uses the <strong>tropical zodiac</strong>, while Vedic (Indian) astrology is based on the <strong>sidereal zodiac</strong>.
//             That’s why your sun sign in Western astrology might be different in your Rashi (moon sign) chart.
//             Western focuses on the <em>external self</em> and personality; Rashi focuses on the <em>inner emotional blueprint</em>.
//             Both systems offer unique insights — combining them gives a 360° view of your destiny.
//           </p>
//         </article>

//         {/* Article 7 */}
//         <article className="bg-white p-6 rounded shadow">
//           <h2 className="text-2xl font-semibold text-yellow-800 mb-2">✨ How Planets Influence Your Career & Ambitions</h2>
//           <p>
//             In astrology, your <strong>10th house</strong> and the planet <strong>Saturn</strong> are closely tied to your career.
//             Mercury favors communication careers, while Mars suits competitive fields. Venus leans toward art & beauty,
//             and Jupiter often blesses teaching or law. Want to decode your professional destiny? Your <strong>birth chart</strong> holds the answer.
//           </p>
//         </article>

//         {/* Article 8 */}
//         <article className="bg-white p-6 rounded shadow">
//           <h2 className="text-2xl font-semibold text-yellow-800 mb-2">🌑 New Moon vs Full Moon — What Should You Manifest?</h2>
//           <p>
//             Each moon phase holds power. The <strong>New Moon</strong> is ideal for setting intentions and planting fresh goals.
//             The <strong>Full Moon</strong> is a time of release, clarity, and letting go of what no longer serves you.
//             Align your actions with the lunar cycle and notice your energy sync with the universe. 🌕🌑
//           </p>
//         </article>

//         {/* Article 9 */}
//         <article className="bg-white p-6 rounded shadow">
//           <h2 className="text-2xl font-semibold text-yellow-800 mb-2">♓ Your Rising Sign is the Real Game-Changer</h2>
//           <p>
//             Think your sun sign defines you completely? Not really.
//             Your <strong>Rising sign (Ascendant)</strong> determines how the world sees you — it sets your chart’s starting point.
//             It influences your appearance, first impressions, and how you naturally respond to life. In fact, many astrologers
//             consider the rising sign even more important than the sun sign for accurate readings!
//           </p>
//         </article>


//       </div>
//     </div>
//   );
// };

// export default Blog;

