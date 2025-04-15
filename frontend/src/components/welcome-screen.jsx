const Welcome = ({ user }) => {
  const displayName = user?.name ?? "there";

  return (
    <div className="flex flex-col items-center justify-center w-full h-full rounded-none bg-gradient-to-br from-[#1d293d] via-[#223046] to-[#2e3e5c] shadow-lg p-10 text-center border border-[#2b3a55]">
      <h1 className="text-6xl font-englebert text-white drop-shadow mb-4">
        Convo
      </h1>

      <h2 className="text-4xl font-semibold text-slate-100 mb-2">
        Hello, {displayName}! 👋
      </h2>

      <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
        Welcome to Convo — your private space to talk, chill, and vibe out.
      </p>
    </div>
  );
};

export default Welcome;
