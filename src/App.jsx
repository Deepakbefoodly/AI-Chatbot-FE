import { useState, useRef, useEffect } from 'react';
import Settings from './components/Settings';
import ChatMessage from './components/ChatMessage';
import Header from './components/Header';
import { gptModels } from './utils/commonUtils';

const App = () => {
  const [showSettings, setShowSettings] = useState(true);
  const [selectedModel, setSelectedModel] = useState(gptModels[0].value);
  // const [selectLLM, setSelectLLM] = useState("gemini");
  const [temperature, setTemperature] = useState(0.2);
  const [messages, setMessages] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const clearChat = () => {
    setMessages([]);
  };

  const getLLMResponseAPI = async (userMessage) => {
    try {
          const response = await fetch('http://127.0.0.1:8000/v1/chat', {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                model: selectedModel,
                question: userMessage,
                temp: temperature,
                llm: "gemini"
              })
          });

          if (!response.ok) {
              throw new Error(`Failed to send message: ${response.status}`);
          }

          const data = await response.json();
          const botMessage = {
              role: 'assistant',
              content: data.answer
          };

          setMessages(prev => [...prev, botMessage]);
          setIsLoading(false)

        } catch (error) { 
          
          const errorMessage = {
              role: 'assistant',
              content: `Error: ${error.message}. Please try again Later.`
          };
          setMessages(prev => [...prev, errorMessage]);
        } finally {
          setIsLoading(false);
        }
        setIsLoading(false)
  }

    
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <Header 
        selectedModel={selectedModel} 
        showSettings={showSettings} 
        setShowSettings={setShowSettings} 
        temperature={temperature}
        clearChat={clearChat}
      />

      {/* Settings Panel */}
      {showSettings && (
        <Settings 
          selectedModel={selectedModel} 
          setSelectedModel={setSelectedModel} 
          temperature={temperature} 
          setTemperature={setTemperature}
        />
      )}

      {/* Chat Messages */}
      <ChatMessage
        messages={messages}
        setMessages={setMessages}
        messagesEndRef={messagesEndRef}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        getLLMResponseAPI={getLLMResponseAPI}
      />
    </div>
  );
};

export default App;