# ASTRO-AI

ASTRO-AI is a MERN astrology platform with Rashi-driven guidance, a standalone AI microservice, role-based user/admin APIs, and a React dashboard.

## What It Includes

- React frontend with Kundli, Rashi guidance, horoscope, compatibility, Panchang, blogs, astrologer directory, and ChartBot
- Express + MongoDB API with JWT authentication and validation
- Rashi dashboard API that returns horoscope, personality, remedies, and Panchang in one response
- Separate AI service with mock and OpenAI providers
- Role separation for users and admins
- Swagger documentation at `/api/docs`

## Architecture

```text
frontend (Vite + React)  ->  backend API (Express + MongoDB)  ->  ai-service (optional AI provider)
                              |
                              -> JWT, profiles, Rashi, horoscope, admins
```

## Quick Start

1. Install root dependencies:

   ```powershell
   npm install
   ```

2. Create environment files:

   ```powershell
   Copy-Item .env.example .env
   Copy-Item ai-service/.env.example ai-service/.env
   ```

3. Ensure MongoDB is running locally, or set `MONGODB_URI`.

4. Start everything from one terminal:

   ```powershell
   npm.cmd run dev
   ```

## Local URLs

| Service | URL |
| --- | --- |
| React frontend | `http://127.0.0.1:5173` |
| Main API | `http://127.0.0.1:5000` |
| API health | `http://127.0.0.1:5000/health` |
| Swagger docs | `http://127.0.0.1:5000/api/docs` |
| AI service | `http://127.0.0.1:5001` |
| AI health | `http://127.0.0.1:5001/health` |

## Environment Configuration

Main API `.env`:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/astro_ai
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_ORIGIN=http://127.0.0.1:5173
AI_SERVICE_URL=http://127.0.0.1:5001
AI_SERVICE_API_KEY=replace-with-a-private-service-key
```

AI service `ai-service/.env`:

```env
PORT=5001
SERVICE_API_KEY=replace-with-a-private-service-key
AI_PROVIDER=mock
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
```

Use `AI_PROVIDER=mock` for local development. Set `AI_PROVIDER=openai` and provide an API key to use OpenAI.

## Key APIs

### Authentication and User

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/user/me`
- `GET /api/user/history`
- `POST /api/profile`

### Astrology and Rashi

- `POST /api/astrology/calculate`
- `GET /api/rashi/:sign/dashboard`
- `GET /api/horoscope/daily/:sign`
- `GET /api/personality/:sign`
- `GET /api/compatibility/:sign1/:sign2`
- `GET /api/discovery/remedies/:sign`
- `GET /api/discovery/panchang/today`

### ChartBot and Discovery

- `POST /api/chartbot/message`
- `GET /api/discovery/astrologers`
- `GET /api/blogs/:sign`

### Admin

Admin routes require a JWT belonging to a user with `role: admin`.

- `GET /api/admin/dashboard`
- `GET /api/admin/astrologers`
- `POST /api/admin/astrologers`
- `PATCH /api/admin/astrologers/:id`

Promote an existing account locally:

```powershell
npm.cmd run admin:promote -- your-email@example.com
```

## Verification

```powershell
npm.cmd run lint
npm.cmd test
npm.cmd run build:frontend
```

## Important Note

The current Moon Sign/Rashi and Nakshatra functions are deterministic placeholders. Replace them with an ephemeris-backed calculation service before presenting results as astronomical calculations in production.
