// Profile Component

'use client';

import { Portfolio } from '@/types/types';

interface ProfileProps {
  profile: Portfolio;
}

const Profile: React.FC<ProfileProps> = ({ profile }) => {
  return (
    <div className="mx-auto max-w-sm rounded-lg text-center">
      <img src={profile.image} alt={profile.name} className="rounded-full w-36 h-36 object-cover mx-auto" />
      <h1 className="text-xl font-semibold mt-4">{profile.name}</h1>
      <h2 className="text-lg text-slate-600">{profile.portfolio_id}</h2>
      <p className="mt-2 text-slate-700">{profile.type}</p>
      <div className="mt-4">
        <h3>Holdings:</h3>
        <ul>
          {Object.entries(profile.holdings).map(([coin, amount]) => (
            <li key={coin}>{coin}: {amount}</li>
          ))}
        </ul>
        <h3>Percentages:</h3>
        <ul>
          {Object.entries(profile.percentages).map(([coin, percentage]) => (
            <li key={coin}>{coin}: {percentage * 100}%</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;