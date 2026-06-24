import { useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  BookOpen,
  CalendarDays,
  Compass,
  Clock3,
  Bot,
  Gem,
  HeartHandshake,
  Home,
  Loader2,
  LayoutDashboard,
  MessageCircle,
  Moon,
  Phone,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Sun,
  UserRound,
  X,
  Send,
  WalletCards
} from "lucide-react";
import { astroApi } from "./services/astroApi";

const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

const signGlyphs = {
  Aries: "♈",
  Taurus: "♉",
  Gemini: "♊",
  Cancer: "♋",
  Leo: "♌",
  Virgo: "♍",
  Libra: "♎",
  Scorpio: "♏",
  Sagittarius: "♐",
  Capricorn: "♑",
  Aquarius: "♒",
  Pisces: "♓"
};

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/kundli", label: "Kundli", icon: Moon },
  { path: "/horoscope", label: "Horoscope", icon: Sun },
  { path: "/astrologers", label: "Astrologers", icon: MessageCircle },
  { path: "/matchmaking", label: "Match", icon: HeartHandshake },
  { path: "/panchang", label: "Panchang", icon: CalendarDays },
  { path: "/blogs", label: "Blogs", icon: BookOpen }
];

const astrologers = [
  { name: "Anaya Sharma", skill: "Vedic, Tarot", rating: "4.96", orders: "18k", lang: "Hindi, English", rate: "₹42/min", live: "Chat", experience: "12 yrs" },
  { name: "Ritvik Rao", skill: "Kundli, Career", rating: "4.91", orders: "12k", lang: "English, Telugu", rate: "₹35/min", live: "Call", experience: "9 yrs" },
  { name: "Meera Iyer", skill: "Love, Numerology", rating: "4.98", orders: "21k", lang: "Tamil, English", rate: "₹55/min", live: "Chat", experience: "15 yrs" },
  { name: "Dev Malhotra", skill: "Vastu, Finance", rating: "4.89", orders: "9k", lang: "Hindi, Punjabi", rate: "₹31/min", live: "Call", experience: "8 yrs" }
];

const marketplace = [
  { icon: Gem, title: "Gemstone Guide", copy: "AI-assisted gemstone suggestions based on sign and goal." },
  { icon: WalletCards, title: "Wallet Remedies", copy: "Simple color, mantra, and timing remedies for daily planning." },
  { icon: ShoppingBag, title: "Puja Booking", copy: "A future-ready surface for rituals, reports, and paid services." }
];

const focusModes = {
  focus: {
    title: "Focus Window",
    label: "Best use of your energy",
    message: "Protect one undistracted hour for the task that makes everything else easier."
  },
  career: {
    title: "Career Signal",
    label: "Momentum cue",
    message: "Send the update, share the draft, or ask for the decision that has been waiting."
  },
  love: {
    title: "Connection Signal",
    label: "Relationship cue",
    message: "Trade assumptions for one honest question and give the answer room to land."
  },
  wellbeing: {
    title: "Wellbeing Signal",
    label: "Reset cue",
    message: "Make the next choice slightly gentler: water, a walk, or a clean boundary."
  }
};

function getInitialAuth() {
  const token = localStorage.getItem("astro_ai_token");
  const rawUser = localStorage.getItem("astro_ai_user");
  return { token, user: rawUser ? JSON.parse(rawUser) : null };
}

function getPath() {
  return window.location.pathname === "/index.html" ? "/" : window.location.pathname;
}

function getMentionedSign(message) {
  return signs.find((sign) => new RegExp(`\\b${sign}\\b`, "i").test(message)) || null;
}

export function App() {
  const initialAuth = useMemo(getInitialAuth, []);
  const [path, setPath] = useState(getPath);
  const [token, setToken] = useState(initialAuth.token);
  const [user, setUser] = useState(initialAuth.user);
  const [authMode, setAuthMode] = useState("login");
  const [authOpen, setAuthOpen] = useState(false);
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });
  const [birthForm, setBirthForm] = useState({ dob: "1998-08-10", tob: "14:30", pob: "Mumbai" });
  const [selectedSign, setSelectedSign] = useState("Leo");
  const [secondSign, setSecondSign] = useState("Aries");
  const [mood, setMood] = useState("motivated");
  const [relationshipStatus, setRelationshipStatus] = useState("single");
  const [focusMode, setFocusMode] = useState("focus");
  const [chart, setChart] = useState(null);
  const [daily, setDaily] = useState(null);
  const [personality, setPersonality] = useState(null);
  const [compatibility, setCompatibility] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [experts, setExperts] = useState([]);
  const [panchang, setPanchang] = useState(null);
  const [remedies, setRemedies] = useState([]);
  const [adminDashboard, setAdminDashboard] = useState(null);
  const [adminExperts, setAdminExperts] = useState([]);
  const [rashiDashboard, setRashiDashboard] = useState(null);
  const [botOpen, setBotOpen] = useState(false);
  const [botInput, setBotInput] = useState("");
  const [botMessages, setBotMessages] = useState([{ role: "bot", text: "I am ChartBot. Ask about your career, relationships, timing, or your birth chart." }]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const isAuthed = Boolean(token);

  useEffect(() => {
    const onPopState = () => setPath(getPath());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    loadRashiDashboard();
  }, [selectedSign]);

  useEffect(() => {
    if (path === "/astrologers") loadExperts();
    if (path === "/panchang") {
      loadPanchang();
      loadRemedies();
    }
    if (path === "/admin" && user?.role === "admin") {
      loadAdminDashboard();
      loadAdminExperts();
    }
  }, [path, selectedSign, user?.role]);

  function navigate(nextPath) {
    window.history.pushState({}, "", nextPath);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function runTask(label, task) {
    setLoading(label);
    setError("");
    try {
      return await task();
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading("");
    }
  }

  async function submitAuth(event) {
    event.preventDefault();
    await runTask("auth", async () => {
      const payload = authMode === "signup" ? authForm : { email: authForm.email, password: authForm.password };
      const result = authMode === "signup" ? await astroApi.signup(payload) : await astroApi.login(payload);
      localStorage.setItem("astro_ai_token", result.token);
      localStorage.setItem("astro_ai_user", JSON.stringify(result.user));
      setToken(result.token);
      setUser(result.user);
      setAuthOpen(false);
    });
  }

  function logout() {
    localStorage.removeItem("astro_ai_token");
    localStorage.removeItem("astro_ai_user");
    setToken("");
    setUser(null);
    setPrediction(null);
  }

  async function calculateChart(event) {
    event?.preventDefault();
    await runTask("chart", async () => {
      const result = isAuthed ? await astroApi.createProfile(birthForm) : await astroApi.calculateAstrology(birthForm);
      const nextChart = result.profile || result;
      setChart(nextChart);
      setSelectedSign(nextChart.moonSign || nextChart.zodiacSign);
      return nextChart;
    });
  }

  async function loadDaily(sign = selectedSign) {
    await runTask("daily", async () => {
      const result = await astroApi.getDailyHoroscope(sign);
      setDaily(result.horoscope);
    });
  }

  async function loadPersonality(sign = selectedSign) {
    await runTask("personality", async () => {
      const result = await astroApi.getPersonality(sign);
      setPersonality(result.signInfo);
    });
  }

  async function loadCompatibility() {
    await runTask("compatibility", async () => {
      const result = await astroApi.getCompatibility(selectedSign, secondSign);
      setCompatibility(result);
    });
  }

  async function loadPrediction() {
    await runTask("prediction", async () => {
      const result = await astroApi.generatePersonalizedPrediction({
        zodiacSign: selectedSign,
        moonSign: chart?.moonSign,
        nakshatra: chart?.nakshatra,
        mood,
        relationshipStatus,
        focusArea: "general"
      });
      setPrediction(result.prediction);
    });
  }

  async function loadBlogs() {
    await runTask("blogs", async () => {
      const result = await astroApi.getBlogsBySign(selectedSign, { page: 1, limit: 6 });
      setBlogs(result.items);
    });
  }

  async function loadRashiDashboard() {
    await runTask("rashi", async () => {
      const result = await astroApi.getRashiDashboard(selectedSign, { location: birthForm.pob });
      setRashiDashboard(result);
      setDaily(result.daily);
      setPersonality(result.personality);
      setRemedies(result.remedies);
      setPanchang(result.panchang);
    });
  }

  async function loadExperts(filters = {}) {
    await runTask("experts", async () => {
      const result = await astroApi.getAstrologers(filters);
      setExperts(result.items);
    });
  }

  async function loadPanchang() {
    await runTask("panchang", async () => {
      const result = await astroApi.getPanchang({ location: birthForm.pob });
      setPanchang(result.panchang);
    });
  }

  async function loadRemedies() {
    await runTask("remedies", async () => {
      const result = await astroApi.getRemedies(selectedSign);
      setRemedies(result.remedies);
    });
  }

  async function loadAdminDashboard() {
    await runTask("admin", async () => {
      const result = await astroApi.getAdminDashboard();
      setAdminDashboard(result);
    });
  }

  async function loadAdminExperts() {
    await runTask("adminExperts", async () => {
      const result = await astroApi.getAdminAstrologers();
      setAdminExperts(result.items);
    });
  }

  async function sendChartbot(event) {
    event.preventDefault();
    const message = botInput.trim();
    if (!message) return;
    const requestedSign = getMentionedSign(message) || selectedSign;
    if (requestedSign !== selectedSign) setSelectedSign(requestedSign);
    setBotMessages((items) => [...items, { role: "user", text: message }]);
    setBotInput("");
    const result = await runTask("chartbot", () =>
      astroApi.sendChartbotMessage({
        message,
        zodiacSign: requestedSign,
        moonSign: chart?.moonSign,
        mood
      })
    );
    setBotMessages((items) => [...items, {
      role: "bot",
      text: result?.reply || "I could not reach the guidance service just now. Please try again in a moment."
    }]);
  }

  const shared = {
    isAuthed,
    birthForm,
    setBirthForm,
    selectedSign,
    setSelectedSign,
    secondSign,
    setSecondSign,
    mood,
    setMood,
    relationshipStatus,
    setRelationshipStatus,
    focusMode,
    setFocusMode,
    chart,
    daily,
    personality,
    compatibility,
    prediction,
    blogs,
    experts,
    panchang,
    remedies,
    adminDashboard,
    adminExperts,
    rashiDashboard,
    loading,
    calculateChart,
    loadDaily,
    loadPersonality,
    loadCompatibility,
    loadPrediction,
    loadBlogs,
    loadRashiDashboard,
    loadExperts,
    loadPanchang,
    loadRemedies,
    loadAdminDashboard,
    navigate
  };

  return (
    <main className="site-shell">
      <AnimatedNavbar
        path={path}
        navigate={navigate}
        isAdmin={user?.role === "admin"}
        isAuthed={isAuthed}
        user={user}
        onOpenAuth={() => setAuthOpen(true)}
        logout={logout}
      />
      <section className="page-wrap">
        <AuthModal
          open={authOpen}
          close={() => setAuthOpen(false)}
          isAuthed={isAuthed}
          user={user}
          authMode={authMode}
          setAuthMode={setAuthMode}
          authForm={authForm}
          setAuthForm={setAuthForm}
          submitAuth={submitAuth}
          logout={logout}
          loading={loading}
        />
        <ChartBot
          open={botOpen}
          setOpen={setBotOpen}
          messages={botMessages}
          input={botInput}
          setInput={setBotInput}
          sendMessage={sendChartbot}
          loading={loading === "chartbot"}
        />
        {error && <div className="error-banner">{error}</div>}
        {path === "/" && <HomePage {...shared} />}
        {path === "/kundli" && <KundliPage {...shared} />}
        {path === "/horoscope" && <HoroscopePage {...shared} />}
        {path === "/astrologers" && <AstrologersPage experts={experts} loadExperts={loadExperts} loading={loading} />}
        {path === "/matchmaking" && <MatchmakingPage {...shared} />}
        {path === "/panchang" && <PanchangPage selectedSign={selectedSign} panchang={panchang} remedies={remedies} loading={loading} />}
        {path === "/blogs" && <BlogsPage {...shared} />}
        {path === "/admin" && user?.role === "admin" && <AdminPage dashboard={adminDashboard} experts={adminExperts} loading={loading} />}
        {![...navItems, ...(user?.role === "admin" ? [{ path: "/admin" }] : [])].some((item) => item.path === path) && <HomePage {...shared} />}
      </section>
    </main>
  );
}

function AnimatedNavbar({ path, navigate, isAdmin, isAuthed, user, onOpenAuth, logout }) {
  const items = isAdmin ? [...navItems, { path: "/admin", label: "Admin", icon: LayoutDashboard }] : navItems;
  return (
    <header className="animated-nav">
      <div className="nav-glow" />
      <button className="nav-brand" onClick={() => navigate("/")}>
        <span><Sparkles size={22} /></span>
        <strong>ASTRO-AI</strong>
      </button>
      <nav aria-label="Primary navigation">
        {items.map(({ path: itemPath, label, icon: Icon }) => (
          <button key={itemPath} className={path === itemPath ? "active" : ""} onClick={() => navigate(itemPath)}>
            <Icon size={17} />
            {label}
          </button>
        ))}
      </nav>
      <div className="nav-account">
        {isAuthed ? (
          <>
            <span><UserRound size={16} />{user?.name || "Member"}</span>
            <button onClick={logout}>Sign out</button>
          </>
        ) : <button className="nav-login" onClick={onOpenAuth}><UserRound size={16} />Login</button>}
      </div>
    </header>
  );
}

function AuthModal({ open, close, isAuthed, user, authMode, setAuthMode, authForm, setAuthForm, submitAuth, logout, loading }) {
  if (!open) return null;
  return (
    <div className="auth-modal-backdrop" role="presentation" onMouseDown={close}>
      <aside className="auth-modal" role="dialog" aria-modal="true" aria-label="Account access" onMouseDown={(event) => event.stopPropagation()}>
        <button className="auth-close" onClick={close} aria-label="Close login"><X size={18} /></button>
      {isAuthed ? (
        <>
          <span><UserRound size={16} />{user?.name || "Member"}</span>
          <button className="ghost-button dark" onClick={logout}>Sign out</button>
        </>
      ) : (
        <form onSubmit={submitAuth}>
          <div className="segmented light">
            <button type="button" className={authMode === "login" ? "active" : ""} onClick={() => setAuthMode("login")}>Login</button>
            <button type="button" className={authMode === "signup" ? "active" : ""} onClick={() => setAuthMode("signup")}>Signup</button>
          </div>
          {authMode === "signup" && <input value={authForm.name} onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })} placeholder="Name" />}
          <input value={authForm.email} onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })} placeholder="Email" type="email" />
          <input value={authForm.password} onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })} placeholder="Password" type="password" />
          <button className="primary-button" type="submit">{loading === "auth" ? <Loader2 className="spin" size={16} /> : null}{authMode === "login" ? "Login" : "Create"}</button>
        </form>
      )}
      </aside>
    </div>
  );
}

function HomePage({ navigate, selectedSign, daily, loading, loadDaily, loadPersonality, focusMode, setFocusMode }) {
  return (
    <section className="route-page">
      <div className="home-hero">
        <div className="hero-media">
          <ZodiacWheel selectedSign={selectedSign} onSelect={(sign) => loadDaily(sign)} />
        </div>
        <div className="home-copy">
          <p className="eyebrow">Your private cosmic workspace</p>
          <h1>Practical guidance for the choices already on your mind.</h1>
          <p>ASTRO-AI blends your sign, daily rhythm, expert consultation, and AI reflection into a calmer astrology experience.</p>
          <div className="action-row">
            <button className="primary-button" onClick={() => navigate("/kundli")}><Moon size={16} />Free Kundli</button>
            <button className="soft-button" onClick={() => navigate("/astrologers")}><MessageCircle size={16} />Consult Now</button>
          </div>
        </div>
      </div>

      <div className="trust-strip wide">
        <span><BadgeCheck size={16} />Verified astrologers</span>
        <span><Clock3 size={16} />24x7 chat and call</span>
        <span><ShieldCheck size={16} />Secure account</span>
        <span><Star size={16} />AI enhanced insights</span>
      </div>

      <div className="dashboard-grid">
        <div className="forecast-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Today | Rashi context</p>
              <h2>{selectedSign} guidance</h2>
            </div>
            <button className="soft-button" onClick={() => loadDaily()}>{loading === "daily" ? <Loader2 className="spin" size={16} /> : <Sun size={16} />}Refresh</button>
          </div>
          <Metric label="General" value={daily?.generalPrediction || "Load today's horoscope to view prediction."} />
          <Metric label="Love" value={daily?.lovePrediction || "Relationship guidance appears here."} />
          <Metric label="Career" value={daily?.careerPrediction || "Career guidance appears here."} />
        </div>
        <FeatureRail loadPersonality={loadPersonality} navigate={navigate} />
      </div>

      <section className="signature-grid">
        <CosmicRhythm />
        <DecisionCompass focusMode={focusMode} setFocusMode={setFocusMode} />
      </section>
    </section>
  );
}

function KundliPage(props) {
  return (
    <section className="route-page split-page">
      <BirthForm {...props} />
      <BirthProfile {...props} />
      <AiPanel {...props} />
    </section>
  );
}

function HoroscopePage({ selectedSign, setSelectedSign, daily, personality, loading, loadDaily, loadPersonality }) {
  return (
    <section className="route-page">
      <PageTitle eyebrow="Daily Rashi guidance" title="Choose a Moon Sign context for love, career, finance, and personality guidance." />
      <div className="sign-picker">
        {signs.map((sign) => (
          <button key={sign} className={selectedSign === sign ? "active" : ""} onClick={() => setSelectedSign(sign)}>
            <span>{signGlyphs[sign]}</span>{sign}
          </button>
        ))}
      </div>
      <div className="dashboard-grid">
        <div className="forecast-panel">
          <div className="section-heading">
            <h2>{selectedSign}</h2>
            <button className="primary-button" onClick={() => loadDaily()}>{loading === "daily" ? <Loader2 className="spin" size={16} /> : <Sun size={16} />}Get Daily</button>
          </div>
          <Metric label="General" value={daily?.generalPrediction || "Daily prediction will appear here."} />
          <Metric label="Love" value={daily?.lovePrediction || "Love prediction will appear here."} />
          <Metric label="Career" value={daily?.careerPrediction || "Career prediction will appear here."} />
          <Metric label="Finance" value={daily?.financePrediction || "Finance prediction will appear here."} />
        </div>
        <div className="result-panel">
          <div className="section-heading">
            <h2>Personality</h2>
            <button className="soft-button" onClick={() => loadPersonality()}><Star size={16} />Load</button>
          </div>
          <p>{personality?.personality || "Sign profile, strengths, love traits, and career traits load from the backend."}</p>
          {personality && (
            <div className="trait-grid compact">
              <Metric label="Love" value={personality.loveTraits} />
              <Metric label="Career" value={personality.careerTraits} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function AstrologersPage({ experts, loadExperts, loading }) {
  return (
    <section className="route-page">
      <PageTitle eyebrow="Live consultation" title="Chat and call astrologers with filters, ratings, languages, and pricing." />
      <div className="filter-bar">
        <button className="active" onClick={() => loadExperts()}>All</button>
        <button onClick={() => loadExperts({ specialty: "Vedic" })}>Vedic</button>
        <button onClick={() => loadExperts({ specialty: "Love" })}>Love</button>
        <button onClick={() => loadExperts({ specialty: "Career" })}>Career</button>
        <button onClick={() => loadExperts({ specialty: "Tarot" })}>Tarot</button>
        <button onClick={() => loadExperts({ specialty: "Vastu" })}>Vastu</button>
      </div>
      <div className="astrologer-grid expanded">
        {(experts.length ? experts : astrologers).map((item) => (
          <article className="astrologer-card" key={item.name}>
            <div className="avatar">{item.name.split(" ").map((part) => part[0]).join("")}</div>
            <div className="astro-main">
              <h3>{item.name}</h3>
              <p>{item.specialties?.join(", ") || item.skill}</p>
              <span>{item.languages?.join(", ") || item.lang} • {item.experienceYears ? `${item.experienceYears} yrs` : item.experience}</span>
            </div>
            <div className="astro-meta">
              <strong><Star size={14} />{item.rating}</strong>
              <span>{typeof item.orders === "number" ? item.orders.toLocaleString() : item.orders} orders</span>
              <b>{item.ratePerMinute ? `Rs ${item.ratePerMinute}/min` : item.rate}</b>
            </div>
            <button className="primary-button">{item.availability === "call" || item.live === "Call" ? <Phone size={16} /> : <MessageCircle size={16} />}{loading === "experts" ? "Loading" : item.availability === "call" || item.live === "Call" ? "Call" : "Chat"}</button>
          </article>
        ))}
      </div>
    </section>
  );
}

function MatchmakingPage({ selectedSign, setSelectedSign, secondSign, setSecondSign, compatibility, loadCompatibility }) {
  return (
    <section className="route-page split-page two-column">
      <div className="tool-panel">
        <PageTitle eyebrow="Matchmaking" title="Compatibility score for relationships, marriage, and long-term rhythm." />
        <label>Your sign<select value={selectedSign} onChange={(e) => setSelectedSign(e.target.value)}>{signs.map((sign) => <option key={sign}>{sign}</option>)}</select></label>
        <label>Partner sign<select value={secondSign} onChange={(e) => setSecondSign(e.target.value)}>{signs.map((sign) => <option key={sign}>{sign}</option>)}</select></label>
        <button className="primary-button" onClick={loadCompatibility}><HeartHandshake size={16} />Check match</button>
      </div>
      <div className="result-panel match-panel">
        <h2>{compatibility ? `${compatibility.sign1} + ${compatibility.sign2}` : "Match Result"}</h2>
        <div className="score-ring">{compatibility?.score || 88}<span>%</span></div>
        <p>{compatibility?.summary || "Choose two signs to view compatibility energy."}</p>
      </div>
    </section>
  );
}

function PanchangPage({ selectedSign, panchang, remedies, loading }) {
  return (
    <section className="route-page">
      <PageTitle eyebrow="Panchang and tools" title="Daily timing, muhurat-style modules, calculators, and remedy surfaces." />
      <div className="tools-grid">
        <ToolCard icon={CalendarDays} title={panchang?.tithi || "Today Panchang"} copy={panchang ? `${panchang.nakshatra} • Sunrise ${panchang.sunrise} • Sunset ${panchang.sunset}` : "Loading tithi, nakshatra, sunrise, and sunset."} />
        <ToolCard icon={Clock3} title="Shubh Muhurat" copy={panchang?.shubhMuhurat || "Loading favorable time window."} />
        <ToolCard icon={Gem} title={`${selectedSign} Remedies`} copy={remedies.length ? remedies.join(" ") : loading === "remedies" ? "Loading practical sign remedies." : "Sign-based remedy guidance will appear here."} />
        {marketplace.map((item) => <ToolCard key={item.title} {...item} />)}
      </div>
    </section>
  );
}

function ChartBot({ open, setOpen, messages, input, setInput, sendMessage, loading }) {
  return (
    <aside className={open ? "chartbot open" : "chartbot"}>
      {open && (
        <div className="chartbot-panel">
          <header>
            <div><Bot size={19} /><strong>ChartBot</strong><span>AI astrology companion</span></div>
            <button aria-label="Close ChartBot" onClick={() => setOpen(false)}><X size={18} /></button>
          </header>
          <div className="chartbot-messages">
            {messages.map((item, index) => <p key={`${item.role}-${index}`} className={item.role}>{item.text}</p>)}
            {loading && <p className="bot">ChartBot is thinking...</p>}
          </div>
          <form onSubmit={sendMessage}>
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about your chart..." />
            <button type="submit" aria-label="Send message"><Send size={17} /></button>
          </form>
        </div>
      )}
      <button className="chartbot-trigger" onClick={() => setOpen(!open)}><Bot size={19} />{open ? "Close" : "Ask ChartBot"}</button>
    </aside>
  );
}

function AdminPage({ dashboard, experts, loading }) {
  const stats = [
    ["Users", dashboard?.users],
    ["Profiles", dashboard?.profiles],
    ["Predictions", dashboard?.predictions],
    ["Experts", dashboard?.experts],
    ["Online now", dashboard?.onlineExperts]
  ];
  return (
    <section className="route-page">
      <PageTitle eyebrow="Admin console" title="Operations overview and astrologer management." />
      <div className="admin-grid">
        {stats.map(([label, value]) => <article key={label}><span>{label}</span><strong>{loading === "admin" ? "..." : value ?? 0}</strong></article>)}
      </div>
      <div className="result-panel">
        <h2>Astrologer operations</h2>
        {experts.length ? <div className="admin-expert-list">{experts.map((expert) => <div key={expert._id}><strong>{expert.name}</strong><span>{expert.specialties.join(", ")} • {expert.isOnline ? "Online" : "Offline"}</span></div>)}</div> : <p>No managed astrologers yet. Add them through the protected <code>/api/admin/astrologers</code> API.</p>}
      </div>
    </section>
  );
}

function BlogsPage({ selectedSign, blogs, loadBlogs }) {
  const fallbackBlogs = [
    { title: `${selectedSign} career patterns`, category: "Career", content: "Seed articles will appear here after adding blog records." },
    { title: `${selectedSign} love language`, category: "Love", content: "Use the backend blog API to publish sign-specific content." },
    { title: "How free kundli works", category: "Kundli", content: "Explain birth details, rashi, nakshatra, and chart interpretation." }
  ];

  return (
    <section className="route-page">
      <div className="section-heading">
        <PageTitle eyebrow="Astrology journal" title="Blogs, reports, sign guides, and prediction articles." />
        <button className="primary-button" onClick={loadBlogs}><BookOpen size={16} />Load from API</button>
      </div>
      <div className="blog-grid">
        {(blogs.length ? blogs : fallbackBlogs).map((blog) => (
          <article className="blog-card" key={blog.title}>
            <span>{blog.category}</span>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BirthForm({ birthForm, setBirthForm, calculateChart, loading }) {
  return (
    <form className="tool-panel" onSubmit={calculateChart}>
      <PageTitle eyebrow="Free kundli" title="Calculate birth profile." />
      <label>Date of birth<input type="date" value={birthForm.dob} onChange={(e) => setBirthForm({ ...birthForm, dob: e.target.value })} /></label>
      <label>Time of birth<input type="time" value={birthForm.tob} onChange={(e) => setBirthForm({ ...birthForm, tob: e.target.value })} /></label>
      <label>Place of birth<input value={birthForm.pob} onChange={(e) => setBirthForm({ ...birthForm, pob: e.target.value })} /></label>
      <button className="primary-button" type="submit">{loading === "chart" ? <Loader2 className="spin" size={16} /> : <Search size={16} />}Calculate</button>
    </form>
  );
}

function BirthProfile({ chart, selectedSign, birthForm }) {
  return (
    <div className="result-panel">
      <h2>Birth Profile</h2>
      <div className="result-list">
        <Result label="Zodiac" value={chart?.zodiacSign || selectedSign} />
        <Result label="Rashi" value={chart?.moonSign || "Calculate chart"} />
        <Result label="Nakshatra" value={chart?.nakshatra || "Calculate chart"} />
        <Result label="Birth place" value={chart?.pob || birthForm.pob} />
      </div>
    </div>
  );
}

function AiPanel({ isAuthed, selectedSign, mood, setMood, relationshipStatus, setRelationshipStatus, prediction, loadPrediction, loading }) {
  return (
    <div className="tool-panel">
      <PageTitle eyebrow="AI prediction" title={`${selectedSign} personal guidance.`} />
      <label>Mood<input value={mood} onChange={(e) => setMood(e.target.value)} /></label>
      <label>Relationship status<input value={relationshipStatus} onChange={(e) => setRelationshipStatus(e.target.value)} /></label>
      <button className="primary-button" onClick={loadPrediction} disabled={!isAuthed}>{loading === "prediction" ? <Loader2 className="spin" size={16} /> : <Sparkles size={16} />}Generate</button>
      {!isAuthed && <p className="hint dark-text">Login to save AI prediction history.</p>}
      {prediction && Object.entries(prediction).map(([key, value]) => (
        <div className="mini-prediction" key={key}>
          <strong>{key.replace(/([A-Z])/g, " $1")}</strong>
          <p>{value}</p>
        </div>
      ))}
    </div>
  );
}

function FeatureRail({ loadPersonality, navigate }) {
  return (
    <div className="tools-grid feature-rail">
      <ToolCard icon={Moon} title="Free Kundli" copy="Birth chart, rashi, nakshatra, and AI interpretation." onClick={() => navigate("/kundli")} />
      <ToolCard icon={MessageCircle} title="Chat Astrologer" copy="Expert listings with chat/call surfaces and trust signals." onClick={() => navigate("/astrologers")} />
      <ToolCard icon={HeartHandshake} title="Matchmaking" copy="Compatibility for love and marriage decisions." onClick={() => navigate("/matchmaking")} />
      <ToolCard icon={CalendarDays} title="Panchang" copy="Tithi, muhurat, and daily timing modules." onClick={() => navigate("/panchang")} />
      <ToolCard icon={BookOpen} title="Blogs" copy="Astrology content by sign and category." onClick={() => navigate("/blogs")} />
      <ToolCard icon={Star} title="Personality" copy="Load sign strengths and traits from backend." onClick={() => loadPersonality()} />
    </div>
  );
}

function CosmicRhythm() {
  return (
    <article className="rhythm-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Cosmic rhythm</p>
          <h2>Make a little space for the day.</h2>
        </div>
        <CalendarDays size={22} />
      </div>
      <div className="rhythm-track" aria-label="Daily energy rhythm">
        <span className="high"><b>09:00</b>Deep work</span>
        <span><b>13:00</b>Connect</span>
        <span className="high"><b>17:30</b>Decide</span>
        <span><b>21:00</b>Reflect</span>
      </div>
      <p className="rhythm-note">A quiet planning surface that turns horoscope guidance into a usable daily rhythm.</p>
    </article>
  );
}

function DecisionCompass({ focusMode, setFocusMode }) {
  const current = focusModes[focusMode];
  return (
    <article className="compass-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Decision compass</p>
          <h2>{current.title}</h2>
        </div>
        <Compass size={22} />
      </div>
      <div className="compass-tabs">
        {Object.keys(focusModes).map((mode) => (
          <button key={mode} className={focusMode === mode ? "active" : ""} onClick={() => setFocusMode(mode)}>{mode}</button>
        ))}
      </div>
      <div className="compass-message">
        <span>{current.label}</span>
        <p>{current.message}</p>
      </div>
    </article>
  );
}

function ZodiacWheel({ selectedSign, onSelect }) {
  return (
    <div className="cosmic-visual compact-wheel" aria-label="Zodiac wheel">
      {signs.map((sign, index) => (
        <button
          key={sign}
          className={selectedSign === sign ? "zodiac-dot selected" : "zodiac-dot"}
          style={{ "--i": index }}
          onClick={() => onSelect(sign)}
          title={sign}
        >
          {signGlyphs[sign]}
        </button>
      ))}
      <div className="wheel-core">
        <span>{signGlyphs[selectedSign]}</span>
        <strong>{selectedSign}</strong>
      </div>
    </div>
  );
}

function PageTitle({ eyebrow, title }) {
  return (
    <div className="page-title">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  );
}

function ToolCard({ icon: Icon, title, copy, onClick }) {
  return (
    <article className={onClick ? "tool-card clickable" : "tool-card"} onClick={onClick}>
      <Icon size={22} />
      <h3>{title}</h3>
      <p>{copy}</p>
    </article>
  );
}

function Metric({ label, value }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <p>{value}</p>
    </div>
  );
}

function Result({ label, value }) {
  return (
    <div className="result-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
