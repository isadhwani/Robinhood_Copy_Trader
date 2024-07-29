// Profile Component

'use client';

const Profile = ({ profile }) => {
    return (
      <div className="mx-auto max-w-sm rounded-lg text-center">
        <img src={profile.image} alt={profile.name} className="rounded-full w-36 h-36 object-cover mx-auto" />
        <h1 className = "text-xl font-semibold mt-4">{profile.name}</h1>
        <h2 className="text-lg text-slate-600">{profile.portfolio_id}</h2>
        <p className="mt-2 text-slate-700">{profile.type}</p>
        <div className="mt-4">
          <h1>{profile.wallet_ids.holdings}</h1>
          <h1>{profile.wallet_ids.percentages}</h1>
        </div>
      </div>
    );
  };

  export default Profile;
  