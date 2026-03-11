'use client';
import { useState } from 'react';

export default function UrlInput({ onSubmit, isLoading }: { onSubmit: (url: string) => void, isLoading: boolean }) {
  const [url, setUrl] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) onSubmit(url);
  };
  
  return (
    <div className="w-full bg-white shadow-sm border border-gray-200 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Analyze a GitHub Account</h2>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input 
          type="url"
          required
          placeholder="https://github.com/username"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onFocus={(e) => e.target.select()}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 bg-white"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
        >
          {isLoading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>
    </div>
  );
}
