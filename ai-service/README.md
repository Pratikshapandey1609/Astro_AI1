# ASTRO-AI Service

This service owns provider-specific AI generation so the primary API stays focused on authentication, profiles, and astrology data.

## Run locally

```bash
npm install
npm run dev
```

The service starts at `http://localhost:5001`.

## Primary API

`POST /v1/predictions`

Request body:

```json
{ "prompt": "A compact ASTRO-AI generation prompt" }
```

Set `SERVICE_API_KEY` and send the same value through `x-service-api-key` in production. Then configure the main API:

```text
AI_SERVICE_URL=http://localhost:5001
AI_SERVICE_API_KEY=replace-with-a-private-service-key
```

`AI_PROVIDER=mock` is the default for local development. Set `AI_PROVIDER=openai` and configure `OPENAI_API_KEY` to enable OpenAI generation.
