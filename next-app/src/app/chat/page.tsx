import Chat from '@/components/chat/Chat';

export default function ChatPage() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50">
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-6">
        <Chat />
      </div>
    </main>
  );
}
