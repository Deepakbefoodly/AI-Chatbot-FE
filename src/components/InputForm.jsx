import { Send, Loader2 } from 'lucide-react';
import { useState } from 'react';

const InputForm = (props) => {
    // eslint-disable-next-line react/prop-types
    const {isLoading, setMessages, setIsLoading, getLLMResponseAPI} = props;
    const [input, setInput] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();
        
        if (!input.trim()) {
        alert('Please enter a message!');
        return;
        }

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        getLLMResponseAPI(userMessage?.content);
    };

    return (
        <div className="bg-white border-t px-6 py-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex space-x-3">
                    <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                        sendMessage(e);
                        }
                    }}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                    <button
                    onClick={sendMessage}
                    disabled={isLoading || !input.trim()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Send className="w-5 h-5" />
                        )}
                        <span>Send</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default InputForm;