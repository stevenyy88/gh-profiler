import { DeterministicSummary } from '../types/summary';

export default function SummaryPanel({ summary }: { summary: DeterministicSummary }) {
  const latestActivityStr = summary.latestActivity 
    ? new Date(summary.latestActivity).toLocaleDateString()
    : 'Unknown';

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center justify-between text-gray-800">
        Account Summary
        {summary.isMaintained ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Actively Maintained
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Inactive ({">"} 6 months)
          </span>
        )}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 border border-gray-100 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Metrics</h3>
          <ul className="space-y-2 text-sm text-gray-900">
            <li className="flex justify-between"><span>Repository Stars:</span> <span className="font-semibold">{summary.totalStars}</span></li>
            <li className="flex justify-between"><span>Repository Forks:</span> <span className="font-semibold">{summary.totalForks}</span></li>
            <li className="flex justify-between"><span>Active Repos:</span> <span className="font-semibold">{summary.activeReposCount}</span></li>
            <li className="flex justify-between"><span>Latest Activity:</span> <span className="font-semibold text-gray-600">{latestActivityStr}</span></li>
          </ul>
        </div>

        <div className="bg-gray-50 border border-gray-100 p-4 rounded-lg md:col-span-2">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Language Focus</h3>
          {summary.predominantLanguages.length === 0 ? (
            <p className="text-sm text-gray-500">No language data found.</p>
          ) : (
            <div className="space-y-3">
              {summary.predominantLanguages.map(lang => (
                <div key={lang.language} className="flex items-center gap-4 text-sm text-gray-900">
                  <span className="w-24 font-medium text-gray-700">{lang.language}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full max-w-full" 
                      style={{ width: `${Math.min(100, (lang.starCount / Math.max(1, summary.totalStars)) * 100)}%` }}
                    />
                  </div>
                  <span className="w-32 text-right text-gray-500 text-xs">
                    {lang.repoCount} repos · {lang.starCount} stars
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
