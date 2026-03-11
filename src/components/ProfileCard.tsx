import { GitHubProfile } from '../types/github';
import Image from 'next/image';

export default function ProfileCard({ profile }: { profile: GitHubProfile }) {
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 mb-6 flex lg:flex-row flex-col gap-6 items-start">
      {profile.avatarUrl ? (
        <Image 
          src={profile.avatarUrl} 
          alt={`${profile.login} avatar`}
          width={128}
          height={128}
          className="rounded-full shadow-sm"
          unoptimized
        />
      ) : (
        <div className="w-32 h-32 bg-gray-200 rounded-full animate-pulse flex-shrink-0" />
      )}
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-900">{profile.name || profile.login}</h1>
        <a href={`https://github.com/${profile.login}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-lg hover:underline mb-2 block">
          @{profile.login}
        </a>
        <p className="text-gray-700 text-base mb-4 break-words">
          {profile.bio || 'No bio provided'}
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
          {profile.company && (
             <div className="flex items-center gap-1.5 font-medium">🏢 {profile.company}</div>
          )}
          {profile.location && (
             <div className="flex items-center gap-1.5 font-medium">📍 {profile.location}</div>
          )}
          {profile.websiteUrl && (
             <div className="flex items-center gap-1.5 font-medium">
               🔗 <a href={profile.websiteUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">{profile.websiteUrl}</a>
             </div>
          )}
          <div className="flex items-center gap-1.5 font-medium">👥 {profile.followers} followers · {profile.following} following</div>
          <div className="flex items-center gap-1.5 font-medium">📦 {profile.publicRepos} public repos</div>
        </div>
      </div>
    </div>
  );
}
