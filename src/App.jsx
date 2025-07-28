import { useState, useRef, useEffect } from 'react';
import Settings from './components/Settings';
import ChatMessage from './components/ChatMessage';
import InputForm from './components/InputForm';
import Header from './components/Header';

const App = () => {
  const [showSettings, setShowSettings] = useState(true);
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');
  const [temperature, setTemperature] = useState(0.7);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
        messagesEndRef={messagesEndRef} 
        isLoading={isLoading} 
      />

      {/* Input Form */}
      <InputForm 
        messages={messages} 
        setMessages={setMessages} 
        isLoading={isLoading} 
        setIsLoading={setIsLoading} 
      />
    </div>
  );
};

export default App;