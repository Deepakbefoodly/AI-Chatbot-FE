import { Settings, Bot } from 'lucide-react';
import { gptModels } from '../utils/commonUtils';

const Header = (props) => {
    // eslint-disable-next-line react/prop-types
    const { selectedModel, showSettings, temperature, setShowSettings, clearChat } = props;
    return (
        <div className="bg-white shadow-sm border-b px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Bot className="w-8 h-8 text-blue-600" />
                    <div className="align-center">
                        <h1 className="text-xl font-semibold text-gray-900">GitLab ChatBot</h1>
                        <p className="text-sm text-gray-500">
                            Model: {gptModels.find(m => m.value === selectedModel)?.label} | 
                            Temperature: {temperature}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Settings className="w-5 h-5" />
                    </button>
                    <button
                    onClick={clearChat}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                    Clear Chat
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;