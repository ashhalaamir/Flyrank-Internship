# Task Management Frontend

A task management frontend built with the Next.js App Router and Tailwind CSS. It uses Mock Service Worker (MSW) to provide sample API data without a backend, and includes a Gemini-powered streaming assistant at `/chat`.

## Getting Started

From this directory, install dependencies and start the development server:

```bash
npm install
npm run dev
```

To use the sample API data, create a `.env.local` file with:

```env
NEXT_PUBLIC_API_MOCKING=enabled
```

The chat API route also requires a Google Gemini API key:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-api-key
```

Keep the Gemini key server-side: do not prefix it with `NEXT_PUBLIC_` or commit it to source control.

## Architecture Overview

- **App Router:** Pages and API handlers live under `src/app`. The chat UI is at `/chat`, and its server-side POST handler is at `/api/chat`.
- **UI and shared state:** Reusable features live in `src/components`. The root layout wraps the app in the authentication and MSW providers.
- **Mock API layer:** `src/mocks/handlers.ts` defines sample responses for tasks, dashboard statistics, and user profile requests. The browser worker is initialized by `src/app/MSWProvider.tsx` only when `NEXT_PUBLIC_API_MOCKING=enabled`. Unmatched requests are configured to bypass MSW.
- **AI route handler:** `src/app/api/chat/route.ts` receives chat messages, converts them to model messages, and streams a response from Gemini back to the browser. The API key is read on the server.

## AI Integration Explained

The chat uses the Vercel AI SDK with Google's Gemini Flash Lite model (`gemini-3.1-flash-lite`), selected in `src/lib/ai-config.ts` for fast responses and broad availability. The system prompt keeps the assistant focused on task-management questions.

When the chat client submits a message, `POST /api/chat` converts the UI message history with `convertToModelMessages`, calls `streamText`, and returns a UI-compatible streaming response. This lets the assistant's response appear as it is generated rather than waiting for the full answer. The route returns a clear server error if `GOOGLE_GENERATIVE_AI_API_KEY` is missing, and maps provider errors to a user-facing temporary-unavailability message.

The chat UI shows a “thinking” indicator while the request is submitted. While a response is streaming, the Send button is replaced with a Stop button connected to the AI SDK's `stop` action. The message area scrolls to the latest content while the user is near the bottom; if the user has scrolled up, it preserves their position and offers a “Jump to latest” control.

## Testing and Quality

Unit tests use Vitest, React Testing Library, and `user-event`:

```bash
npm run test
npm run test:watch
```

The project has passed an axe DevTools accessibility check. **Lighthouse score:** [INSERT SCORE]

## Known Limitations & Future Improvements

- MSW supplies in-memory sample responses; there is no persistent backend, so task and profile changes are not stored by a server.
- Chat history is held by the client and is not saved to a database. It will not persist across sessions.
- The chat depends on a configured Gemini API key and access to the provider. If the key is missing or Gemini is unavailable, the request returns an error for the chat UI to display.
- MSW currently mocks only selected API endpoints. Other requests bypass the worker and require a real backend to succeed.
- Add an App Router `error.tsx` boundary and review API error handling before production deployment. No global route-level error boundary or general API fallback is currently configured.
- Future work could include a persistent backend, user-owned chat history, broader API coverage, and end-to-end testing of the main task flows.

## Deployment Checklist

- [ ] Set `GOOGLE_GENERATIVE_AI_API_KEY` in the deployment environment as a server-side secret. Do not expose it as a `NEXT_PUBLIC_` variable.
- [ ] Set `NEXT_PUBLIC_API_MOCKING=enabled` only when the deployed demo should use the MSW sample data. Disable or omit it when connecting to a real API; the existing MSW handlers are not a production backend.
- [ ] Verify the chat route with a valid Gemini key and check the missing-key/provider-error behavior. Verify that API errors are shown in the relevant UI rather than mistaken for successful responses.
- [ ] Remember that there is no global App Router error boundary or general API fallback yet. Add and test an `error.tsx` boundary before relying on a global recovery screen in production.
- [ ] Run `npm run test`, `npm run lint`, and `npm run build` before promoting a deployment.
- [ ] After deployment, smoke-test task pages, authentication screens, and `/chat`, and review the accessibility audit and Lighthouse result.
- [ ] **Rollback plan:** In the Vercel project dashboard, open **Deployments**, select the last known-good deployment, and promote or redeploy it according to the project's Vercel workflow. Confirm the restored deployment is serving the expected version.

## Reflection

The hardest part was moving the project into the Next.js App Router structure while keeping the existing task-management experience coherent. The streaming chat added a different kind of UI challenge: the message area needed to follow new content without pulling the reader away when they had intentionally scrolled up. Tracking whether the reader was near the bottom and providing a “Jump to latest” action made that behavior more predictable.

If I started the project again, I would introduce tests earlier. Testing the UI as it was built would have helped catch regressions sooner and made it easier to change components with confidence, instead of treating tests as a later validation step.

I was surprised by how straightforward the Vercel AI SDK made streaming. Its client and server helpers handled much of the message and stream plumbing, leaving me to focus on the interaction details: the submitted/thinking state, the Stop action, and keeping the chat usable while responses arrive.
