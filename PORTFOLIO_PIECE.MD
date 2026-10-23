Capstone Submission: AI-Enhanced Task Management
1. Project Brief
This project is a task management web application designed to help individuals and small teams organize, prioritize, and track their work. It solves the problem of manual task prioritization and organization by integrating a streaming AI assistant that can help plan and summarize work directly within the app. I chose this idea because it takes an existing functional application and brings it fully to production-readiness—demonstrating that I can ship a complete, accessible, tested, and AI-enhanced frontend.

2. Live, Deployed Application
Main Application (Dashboard): https://flyrank-internship-in66z9zry-ashh23.vercel.app/dashboard

AI Chat Interface: https://flyrank-internship-in66z9zry-ashh23.vercel.app/chat

The application is functional and accessible (WCAG 2.1 AA). The task data is mocked via MSW for the preview deployment, and the AI chat uses the Google Gemini API.

3. Repository with Complete README
GitHub Repository: https://github.com/ashhalaamir/Flyrank-Internship/tree/streaming-ai-chat-interface

Chat Route Handler (Server): src/app/api/chat/route.ts

Chat UI Component (Client): src/components/chat/Chat.tsx

AI Config Module: src/lib/ai-config.ts

Setup & Run Instructions
Clone the repository and navigate to the next-app directory.

Run npm install.

Create a .env.local file and add your Google Gemini API key: GOOGLE_GENERATIVE_AI_API_KEY=your_key_here

Run npm run dev.

Architecture Overview
Next.js App Router: Handles routing, server components, and static generation.

MSW (Mock Service Worker): Intercepts API requests in the browser to provide realistic mock data for tasks and user profiles.

Vercel AI SDK: Handles the complex Server-Sent Events (SSE) streaming protocol between the server and client.

Tailwind CSS: Provides the responsive, utility-first styling.

AI Integration Explained
The AI acts as a task management assistant. It uses Google Gemini (swapped from Anthropic due to API access constraints) via the Vercel AI SDK.

Why: Gemini provides a reliable free tier for development and integrates seamlessly with the SDK.

Prompt: The system prompt in ai-config.ts instructs the model to help users plan, prioritize, and summarize their tasks.

Safety: The API key is strictly server-side, and the route handler gracefully handles missing keys or API failures with a fallback error message.

Known Limitations & Future Improvements
Mock Data: The task data is currently mocked. A future improvement would be connecting to the full .NET backend.

Chat Persistence: Refreshing the page clears the chat. Future iterations could persist chat history to a database or localStorage.

4. Testing Evidence
Unit Tests: Implemented with Vitest and React Testing Library.

Coverage: Tests verify that the Chat component renders correctly, accepts user input, and updates state.

Command: npm run test passes successfully.

5. Performance & Accessibility Audit
Lighthouse Scores: Performance: [Insert Score], Accessibility: [Insert Score] (Mobile).

Accessibility Audit: Passed axe DevTools with 0 WCAG AA violations.

Concrete Improvement: Based on the audit, I identified 80 instances of insufficient color contrast (light gray text on off-white backgrounds) across 11 components. I replaced the failing color (#9A9EB0) with #666B80, which passes the 4.5:1 contrast ratio while preserving the design hierarchy.

6. Deployment & Operation
Deployment Checklist:

☑ Environment variables (GOOGLE_GENERATIVE_AI_API_KEY, NEXT_PUBLIC_API_MOCKING) configured in Vercel.
☑ API keys are kept server-side and never exposed to the client.
☑ The application builds successfully with npm run build.
Fail Safely: If the AI API fails, the route handler catches the error and returns a friendly message. The UI unlocks the input so the user can try again.

Rollback Plan: In the event of a bad deployment, I can instantly roll back to the previous successful build via the Vercel Dashboard or revert the commit on the streaming-ai-chat-interface branch.

7. Reflection
What was hardest?
Implementing the auto-scroll behavior in the streaming chat was surprisingly difficult. It required careful use of useRef and scroll position thresholds to ensure the page didn't yank the user back to the bottom while they were trying to read earlier messages during a stream.

What would you do differently next time?
I would set up my testing environment (Vitest) and run the accessibility audits at the very beginning of the project, rather than at the end. Catching the 80 color contrast issues earlier would have saved a lot of time.

One thing you learned that surprised you:
I was genuinely surprised by how much heavy lifting the Vercel AI SDK does. The useChat hook abstracted away the entire SSE (Server-Sent Events) parsing and state management, making the client-side streaming implementation incredibly clean.

