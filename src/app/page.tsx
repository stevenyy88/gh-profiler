'use client';
import { useState } from 'react';
import UrlInput from '../components/UrlInput';
import ProfileCard from '../components/ProfileCard';
import SummaryPanel from '../components/SummaryPanel';
import RepoTable from '../components/RepoTable';
import { ProfileOutput } from '../types/summary';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ProfileOutput | null>(null);

  const handleAnalyze = async (url: string) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      });

      const json = await res.json();
      
      if (!json.success) {
        setError(json.error || 'An error occurred');
      } else {
        setData(json.data);
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
  };

  const handleSaveMarkdown = () => {
    if (!data) return;
    const latestActivityStr = data.summary.latestActivity 
      ? new Date(data.summary.latestActivity).toLocaleDateString()
      : 'Unknown';

    let md = `# GitHub Profile Summary for @${data.profile.login}\n\n`;
    md += `## Profile Info\n`;
    md += `- **Name:** ${data.profile.name || data.profile.login}\n`;
    if (data.profile.bio) md += `- **Bio:** ${data.profile.bio}\n`;
    md += `- **Followers:** ${data.profile.followers} | **Following:** ${data.profile.following}\n`;
    md += `- **Public Repos:** ${data.profile.publicRepos}\n\n`;
    
    md += `## Account Summary\n`;
    md += `- **Repository Stars:** ${data.summary.totalStars}\n`;
    md += `- **Repository Forks:** ${data.summary.totalForks}\n`;
    md += `- **Active Repos:** ${data.summary.activeReposCount}\n`;
    md += `- **Latest Activity:** ${latestActivityStr}\n`;
    md += `- **Maintained:** ${data.summary.isMaintained ? 'Yes' : 'No'}\n\n`;

    md += `## Language Focus\n`;
    if (data.summary.predominantLanguages.length > 0) {
      data.summary.predominantLanguages.forEach(lang => {
        md += `- **${lang.language}:** ${lang.repoCount} repos, ${lang.starCount} stars\n`;
      });
    } else {
      md += `*No language data found*\n`;
    }
    md += `\n`;

    md += `## Notable Repositories\n`;
    if (data.summary.notableRepos.length > 0) {
      data.summary.notableRepos.forEach(repo => {
        const repoUrl = repo.name.includes('/') ? repo.name : `${data.profile.login}/${repo.name}`;
        md += `### [${repo.name}](https://github.com/${repoUrl})\n`;
        if (repo.description) md += `${repo.description}\n`;
        md += `- **Language:** ${repo.language || 'N/A'}\n`;
        md += `- **Stars:** ${repo.stars} | **Forks:** ${repo.forks}\n`;
        md += `- **Last Updated:** ${new Date(repo.updatedAt).toLocaleDateString()}\n\n`;
      });
    } else {
      md += `*No public repositories*\n\n`;
    }

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.profile.login}-summary.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSavePdf = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <header className="mb-8 print:hidden">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">GitHub Profile Summarizer</h1>
        <p className="text-gray-500 mt-2 text-lg">Extracts deterministic insights from public GitHub profiles.</p>
      </header>

      {!data && <div className="print:hidden"><UrlInput onSubmit={handleAnalyze} isLoading={loading} /></div>}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {data && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-blue-50 p-4 rounded-md border border-blue-100 print:hidden gap-4">
             <div className="text-blue-800 font-medium flex items-center gap-2">
               ✅ Analysis Complete
             </div>
             <div className="flex gap-2">
               <button onClick={handleSavePdf} className="text-sm px-3 py-1.5 bg-white border border-gray-300 text-gray-700 shadow-sm rounded-md hover:bg-gray-50 transition-colors">
                 Save as PDF
               </button>
               <button onClick={handleSaveMarkdown} className="text-sm px-3 py-1.5 bg-white border border-gray-300 text-gray-700 shadow-sm rounded-md hover:bg-gray-50 transition-colors">
                 Save as Markdown
               </button>
               <button onClick={reset} className="text-sm px-3 py-1.5 bg-blue-600 border border-transparent text-white shadow-sm rounded-md hover:bg-blue-700 transition-colors">
                 Analyze Another
               </button>
             </div>
          </div>

          {data.warnings.length > 0 && (
             <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-md print:hidden">
               <h3 className="text-sm font-medium text-yellow-800">Warnings ({data.warnings.length})</h3>
               <ul className="mt-2 text-sm text-yellow-700 list-disc list-inside">
                 {data.warnings.map((w, idx) => (
                   <li key={idx}><span className="font-semibold">{w.field}:</span> {w.message}</li>
                 ))}
               </ul>
             </div>
          )}

          <ProfileCard profile={data.profile} />
          <SummaryPanel summary={data.summary} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-white shadow-sm border border-gray-200 p-6 rounded-lg break-inside-avoid">
               <h3 className="text-lg font-semibold text-gray-800 mb-4">Overview Data</h3>
               <ul className="text-gray-700 space-y-2 text-sm">
                 <li><span className="font-semibold text-gray-900">Total Contributions (1yr):</span> {data.overview.totalContributionsLastYear || 'N/A'}</li>
                 <li><span className="font-semibold text-gray-900">Pinned Repos:</span> {data.overview.pinnedRepos.length > 0 ? data.overview.pinnedRepos.join(', ') : 'None'}</li>
               </ul>
             </div>
             <div className="bg-white shadow-sm border border-gray-200 p-6 rounded-lg print:hidden">
               <h3 className="text-lg font-semibold text-gray-800 mb-4">Raw Output (JSON)</h3>
               <details className="text-sm text-gray-600">
                 <summary className="cursor-pointer text-blue-600 hover:underline">View JSON Data</summary>
                 <pre className="mt-4 p-4 bg-gray-50 rounded-md overflow-x-auto text-xs font-mono border border-gray-100 max-h-64">
                   {JSON.stringify(data, null, 2)}
                 </pre>
               </details>
             </div>
          </div>

          <RepoTable repos={data.summary.notableRepos} />
        </div>
      )}
    </div>
  );
}
