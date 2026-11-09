import Chat from "@/components/pages/chat/Chat";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Chat",
  description: "Ask questions about Aditya Punmiya's work and projects.",
  path: "/chat",
});

export default function ChatPage() {
  return <Chat />;
}
