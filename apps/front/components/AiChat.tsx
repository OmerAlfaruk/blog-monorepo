"use client"

import { useState } from "react"
import { BACKEND_URL } from "@/lib/constants"

export default function AiChat() {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([{role: 'ai', content: 'Hello! I\'m your AI assistant. How can I help you?'}])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  console.log('AiChat component loaded, BACKEND_URL:', BACKEND_URL)

  const sendMessage = async () => {
    if (!input.trim()) return
    
    const currentInput = input; // Store input before clearing
    const userMessage = { role: 'user' as const, content: currentInput }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      console.log('Sending to:', `${BACKEND_URL}/ai/chat`)
      console.log('Message:', currentInput)
      
      const response = await fetch(`${BACKEND_URL}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput })
      })
      
      console.log('Response status:', response.status)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json()
      console.log('Response data:', data)
      const aiResponse = data?.response || 'No response received'
      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }])
    } catch (error) {
      console.error('Frontend error:', error)
      setMessages(prev => [...prev, { role: 'ai', content: 'Sorry, I encountered an error.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-xl border">
      <div className="p-4 border-b">
        <h3 className="font-semibold">AI Assistant</h3>
      </div>
      
      <div className="h-64 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={`p-2 rounded ${msg.role === 'user' ? 'bg-blue-100 ml-8' : 'bg-gray-100 mr-8'}`}>
            <div className="text-sm">{msg.content}</div>
          </div>
        ))}
        {loading && <div className="text-center text-gray-500">AI is typing...</div>}
      </div>
      
      <div className="p-4 border-t flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask me anything..."
          className="flex-1 px-3 py-2 border rounded-lg text-sm"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  )
}