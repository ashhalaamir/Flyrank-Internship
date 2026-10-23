'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useChat } from '@ai-sdk/react';

export default function Chat() {
  const { messages, sendMessage, status, stop, error } = useChat();
  const [input, setInput] = useState('');
  const [isNearBottom, setIsNearBottom] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isBusy = status === 'submitted' || status === 'streaming';

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container && isNearBottom) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, status, isNearBottom]);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setIsNearBottom(container.scrollHeight - container.scrollTop - container.clientHeight <= 50);
  };

  const jumpToLatest = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setIsNearBottom(true);
    container.scrollTop = container.scrollHeight;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = input.trim();
    if (!text || isBusy) return;

    setInput('');
    void sendMessage({ text });
  };

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <header className="border-b border-slate-200 px-5 py-4">
        <h1 className="text-lg font-semibold text-slate-900">Task Management Assistant</h1>
        <p className="mt-1 text-sm text-slate-500">Ask a question to get started.</p>
      </header>

      <div className="relative min-h-0 flex-1">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="h-full space-y-4 overflow-y-auto p-5"
          aria-live="polite"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-800'
                }`}
              >
                {message.parts.map((part, index) =>
                  part.type === 'text' ? (
                    <span key={`${message.id}-${index}`}>{part.text}</span>
                  ) : null,
                )}
              </div>
            </div>
          ))}

          {status === 'submitted' && (
            <div className="flex justify-start" role="status" aria-label="Assistant is thinking">
              <div className="flex items-center gap-1 rounded-2xl bg-slate-100 px-4 py-3">
                <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400" />
                <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400 [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400 [animation-delay:300ms]" />
              </div>
            </div>
          )}
        </div>

        {!isNearBottom && (
          <button
            type="button"
            onClick={jumpToLatest}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-md hover:bg-slate-50"
          >
            Jump to latest
          </button>
        )}
      </div>

      {error && (
        <p role="alert" className="border-t border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error.message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex gap-3 border-t border-slate-200 p-4">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          disabled={isBusy}
          placeholder="Message the assistant..."
          aria-label="Message"
          className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 disabled:bg-slate-100"
        />
        {status === 'streaming' ? (
          <button
            type="button"
            onClick={stop}
            className="rounded-xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white hover:bg-rose-700"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={isBusy || !input.trim()}
            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send
          </button>
        )}
      </form>
    </section>
  );
}
