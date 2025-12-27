import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Robot Knowledge Base for "Perfect Response"
const KNOWLEDGE_BASE = {
  greetings: {
    keywords: ["hello", "hi", "hey", "start", "morning", "evening"],
    response:
      "Hello! Welcome to Gurukripa Builders. I am your automated assistant. Ask me about our services, pricing, completed projects, or contact info!",
  },
  services: {
    keywords: ["service", "do", "offer", "work", "construction", "build"],
    response:
      "We offer end-to-end construction services including: 1. Residential & Villas 2. Commercial Buildings 3. Interior Design 4. Landscape Architecture 5. Renovation & Remodeling. Which one interests you?",
  },
  cost: {
    keywords: [
      "price",
      "cost",
      "rate",
      "quote",
      "expensive",
      "cheap",
      "budget",
    ],
    response:
      "Our construction packages start from competitive rates tailored to your material choices (Standard, Premium, Luxury). For an exact quote, please provide your plot size or contact us directly at +91 7558988689.",
  },
  contact: {
    keywords: [
      "contact",
      "call",
      "phone",
      "email",
      "address",
      "location",
      "reach",
    ],
    response:
      "You can visit us at City Center, Cheemeni, Cheruvathur, Kerala. Or Call/WhatsApp: +91 7558988689. Email: gurukripa9070@gmail.com.",
  },
  projects: {
    keywords: ["project", "gallery", "portfolio", "past", "done", "photos"],
    response:
      "We have completed over 50+ residential and commercial projects across Kerala. Check out our 'Gallery' section on the homepage to see our work!",
  },
  time: {
    keywords: ["time", "long", "duration", "finish", "when"],
    response:
      "A typical residential project takes 6-12 months depending on size and complexity. We are known for on-time delivery with strict quality control.",
  },
  default: {
    response:
      "I'm not sure specifically about that, but I can help you connect with a human expert. Please call us at +91 7558988689 for detailed queries.",
  },
};

const findResponse = (input) => {
  const lowerInput = input.toLowerCase();
  for (const key in KNOWLEDGE_BASE) {
    if (key === "default") continue;
    const topic = KNOWLEDGE_BASE[key];
    if (topic.keywords.some((word) => lowerInput.includes(word))) {
      return topic.response;
    }
  }
  return KNOWLEDGE_BASE.default.response;
};

const ChatHub = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Namaste! I am the Gurukripa Bot. How can I assist you with your construction needs today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate "thinking" delay for realism
    setTimeout(() => {
      const responseText = findResponse(userMsg.text);
      const botResponse = {
        id: Date.now() + 1,
        text: responseText,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 600);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      <motion.button
        className="chat-toggle-btn"
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X size={24} /> : <Bot size={28} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            <div className="chat-header">
              <div className="chat-avatar">
                <Bot size={20} />
              </div>
              <div className="chat-info">
                <h4>Architect Bot</h4>
                <span>Automated Assistant</span>
              </div>
              <button onClick={toggleChat} className="chat-close">
                <X size={18} />
              </button>
            </div>

            <div className="chat-messages">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${
                    msg.sender === "user" ? "user" : "bot"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-area">
              <input
                type="text"
                placeholder="Ask about rate, design..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button onClick={handleSend} disabled={!input.trim()}>
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatHub;
