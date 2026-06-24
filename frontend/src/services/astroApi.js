import { apiClient } from "./apiClient";

export const astroApi = {
  signup: (payload) => apiClient.post("/auth/signup", payload).then((res) => res.data),
  login: (payload) => apiClient.post("/auth/login", payload).then((res) => res.data),
  createProfile: (birthData) => apiClient.post("/profile", birthData).then((res) => res.data),
  calculateAstrology: (birthData) => apiClient.post("/astrology/calculate", birthData).then((res) => res.data),
  getDailyHoroscope: (sign) => apiClient.get(`/horoscope/daily/${sign}`).then((res) => res.data),
  getPersonality: (sign) => apiClient.get(`/personality/${sign}`).then((res) => res.data),
  getCompatibility: (sign1, sign2) => apiClient.get(`/compatibility/${sign1}/${sign2}`).then((res) => res.data),
  getBlogsBySign: (sign, params = {}) => apiClient.get(`/blogs/${sign}`, { params }).then((res) => res.data),
  getAstrologers: (params = {}) => apiClient.get("/discovery/astrologers", { params }).then((res) => res.data),
  getPanchang: (params = {}) => apiClient.get("/discovery/panchang/today", { params }).then((res) => res.data),
  getRemedies: (sign) => apiClient.get(`/discovery/remedies/${sign}`).then((res) => res.data),
  getRashiDashboard: (sign, params = {}) => apiClient.get(`/rashi/${sign}/dashboard`, { params }).then((res) => res.data),
  sendChartbotMessage: (payload) => apiClient.post("/chartbot/message", payload).then((res) => res.data),
  getMyAccount: () => apiClient.get("/user/me").then((res) => res.data),
  getMyHistory: () => apiClient.get("/user/history").then((res) => res.data),
  getAdminDashboard: () => apiClient.get("/admin/dashboard").then((res) => res.data),
  getAdminAstrologers: () => apiClient.get("/admin/astrologers").then((res) => res.data),
  createAdminAstrologer: (payload) => apiClient.post("/admin/astrologers", payload).then((res) => res.data),
  generatePersonalizedPrediction: (payload) =>
    apiClient.post("/horoscope/personalized", payload).then((res) => res.data)
};
