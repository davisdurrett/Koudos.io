import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MessageSquareIcon,
  XIcon,
  MinimizeIcon,
  MaximizeIcon,
  SendIcon,
  BotIcon,
  UserIcon,
} from "lucide-react";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: string;
}

interface ChatPopupProps {
  isOpen?: boolean;
  isMinimized?: boolean;
  onClose?: () => void;
  onToggleMinimize?: () => void;
}

const ChatPopup = ({
  isOpen = false,
  isMinimized = false,
  onClose = () => {},
  onToggleMinimize = () => {},
}: ChatPopupProps) => {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "👋 Hi! I'm your Koudos AI assistant. I can help you with best practices for managing reviews, using the platform, and optimizing your review strategy. What would you like to know?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content:
          "I understand you're asking about best practices. Here are some key tips: 1) Respond to reviews within 24 hours, 2) Personalize your responses, 3) Address specific points mentioned in the review, and 4) Maintain a professional tone.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <Card
      className={`fixed bottom-4 right-4 w-[400px] bg-background shadow-lg transition-all ${isMinimized ? "h-[60px]" : "h-[600px]"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <BotIcon className="w-5 h-5 text-primary" />
          <span className="font-semibold">Koudos AI Assistant</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={onToggleMinimize}
          >
            {isMinimized ? (
              <MaximizeIcon className="w-4 h-4" />
            ) : (
              <MinimizeIcon className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={onClose}
          >
            <XIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <ScrollArea
            ref={scrollRef}
            className="flex-1 p-4 h-[calc(600px-132px)]"
          >
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${message.type === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                  >
                    {message.type === "user" ? (
                      <UserIcon className="w-5 h-5" />
                    ) : (
                      <BotIcon className="w-5 h-5" />
                    )}
                  </div>
                  <div
                    className={`flex-1 rounded-lg p-4 ${message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <time className="text-xs opacity-70 mt-1 block">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </time>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about reviews or the platform..."
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!input.trim()}>
                <SendIcon className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </>
      )}
    </Card>
  );
};

export default ChatPopup;
