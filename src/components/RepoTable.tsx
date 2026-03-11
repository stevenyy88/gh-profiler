import { GitHubRepository } from '../types/github';

export default function RepoTable({ repos }: { repos: GitHubRepository[] }) {
  if (repos.length === 0) {
    return <div className="text-gray-500 italic p-4">No public repositories found.</div>;
  }

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-800">Notable Repositories</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Repository</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stars / Forks</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {repos.map(repo => (
              <tr key={repo.name} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-blue-600 hover:underline">
                    <a href={`https://github.com/${repo.name.includes('/') ? repo.name : '#-todo-' + repo.name}`} target="_blank" rel="noopener noreferrer">
                      {repo.name}
                    </a>
                  </div>
                  {repo.description && (
                    <div className="text-gray-500 mt-1 line-clamp-1">{repo.description}</div>
                  )}
                  {repo.isFork && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 mt-1">Fork</span>}
                  {repo.isArchived && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 mt-1 ml-1">Archived</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {repo.language || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  <span className="flex items-center gap-2">
                    <span className="flex items-center gap-1 font-medium text-gray-700">⭐ {repo.stars}</span>
                    <span className="flex items-center gap-1">🔀 {repo.forks}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {new Date(repo.updatedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
