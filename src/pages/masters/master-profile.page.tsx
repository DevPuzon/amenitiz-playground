import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import chessApi from "@api/axios";
import type { ChessPlayerProfile } from "@model/chess-player.model";
import { formatTime } from "@helper/common-use.helper";

export const LastOnline = ({ last_online }: { last_online: number }) => {
  const [timeSinceLastOnline, setTimeSinceLastOnline] = useState("");

  useEffect(() => {
    if (!last_online) return;

    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const secondsAgo = now - last_online;
      setTimeSinceLastOnline(formatTime(secondsAgo));
      // timeSinceLastOnlineRef.current.textContent = formatTime(secondsAgo);
    }, 1000);

    return () => clearInterval(interval);
  }, [last_online]);

  return (
    <>
      <p>
        Last online: <span className="font-mono">{timeSinceLastOnline}</span>{" "}
        ago
      </p>
    </>
  );
};

export const MasterProfilePage = () => {
  console.log("MasterProfilePage");
  const { username } = useParams();
  const [profile, setProfile] = useState<ChessPlayerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  // const timeSinceLastOnlineRef = useRef(null);

  useEffect(() => {
    if (!username) return;

    chessApi
      .get(`/player/${username}`)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => console.error("Failed to fetch profile", err))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) return <p className="p-6">Loading profile...</p>;
  if (!profile) return <p className="p-6">Profile not found.</p>;

  return (
    <div className="p-6">
      <div className="flex gap-4 items-center">
        <img
          src={profile.avatar}
          alt={profile.username}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{profile.username}</h1>
          <p className="text-gray-600">{profile.name}</p>
          <a
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View on Chess.com
          </a>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-700">
        <p>League: {profile.league}</p>
        <p>Status: {profile.status}</p>
        <p>Followers: {profile.followers}</p>
        <LastOnline last_online={profile.last_online}></LastOnline>
      </div>
    </div>
  );
};
