"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;
import { Sparkles, X, Send, Bot } from "lucide-react";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    { role: "bot", content: "Hi! I'm Lumina, your AR Menu Assistant. How can I help you today?" },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;
    
    const userMessage = { role: "user", content: message };
    setChat(prev => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: chat.concat(userMessage).map(m => ({
            role: m.role === 'bot' ? 'assistant' : 'user',
            content: m.content
          }))
        }),
      });
      
      const data = await response.json();
      setChat(prev => [...prev, { role: "bot", content: data.content }]);
    } catch (error) {
      setChat(prev => [...prev, { role: "bot", content: "I'm having trouble connecting to my brain. Please try again later!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-6 w-[350px] md:w-[400px] h-[500px] glass rounded-[2.5rem] border border-primary/20 flex flex-col overflow-hidden shadow-[0_0_50px_rgba(207,150,255,0.2)]"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-primary/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Bot className="w-6 h-6 text-background" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Lumina <span className="text-primary tracking-tighter">AI</span></h4>
                  <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest">Always Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {chat.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                    msg.role === 'user' 
                    ? 'bg-primary text-background font-medium' 
                    : 'glass border border-white/5'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="glass border border-white/5 p-4 rounded-2xl text-xs flex gap-1 items-center">
                    <span className="w-1 h-1 bg-primary rounded-full animate-bounce" />
                    <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-top border-white/5">
              <div className="relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Lumina anything..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-primary/50 transition-colors pr-12"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-background hover:brightness-110"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>

      <MotionButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-dim flex items-center justify-center shadow-[0_0_30px_rgba(207,150,255,0.4)] group"
      >
        <Sparkles className="w-8 h-8 text-background group-hover:rotate-12 transition-transform" />
      </MotionButton>
    </div>
  );
}
