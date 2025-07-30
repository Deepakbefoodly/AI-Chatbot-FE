import { useState } from 'react';
import { gptModels } from '../utils/commonUtils';
import './common.css';

const Settings = (props) => {
    // eslint-disable-next-line react/prop-types
    const { selectedModel, setSelectedModel, temperature, setTemperature } = props;
    const [apiKey, setApiKey] = useState('');
    const [isGeminiModel, setIsGeminiModel] = useState(true);

    const changeGPTModel = gptModel => {
      setSelectedModel(gptModel);
      setIsGeminiModel(gptModel == gptModels[0].value);
    }
    
    return (
        <div className="bg-white border-b px-6 py-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* API Key Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OpenAI API Key (Optional)
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isGeminiModel}
              />
            </div>

            {/* Model Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LLM Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => changeGPTModel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {gptModels.map((model) => (
                  <option key={model.value} value={model.value}>
                    {model.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Temperature Slider */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temperature: <span className='text-red-600'>{temperature}</span>
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Focused (0)</span>
                <span>Balanced (1)</span>
                <span>Creative (2)</span>
              </div>
            </div>
          </div>
        </div>
    );
}

export default Settings;