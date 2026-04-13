"use client";

import { useEffect, useState } from "react";
import ShapeGrid from "@/components/ShapeGrid";
import BounceCards from "@/components/BounceCards";
import BlurText from "@/components/BlurText";
import Link from "next/link";
import { MainFooter } from "@/components/MainFooter";

interface AchievementEntry {
  id: number;
  title: string;
  description: string;
  fileUrl?: string;
  fileName?: string;
  createdAt: string;
}

export default function AchievementPage() {
  const [uploadedEntries, setUploadedEntries] = useState<AchievementEntry[]>([]);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const fetchAchievements = () => {
    fetch("/api/achievement")
      .then((res) => res.json())
      .then((data) => {
        console.log("Achievement entries fetched:", data);
        setUploadedEntries(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to fetch achievement entries:", err);
        setUploadedEntries([]);
      });
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleRemoveAchievement = async (id: number, title: string) => {
    if (!confirm(`Remove "${title}" from achievements?`)) return;
    try {
      const res = await fetch(`http://localhost:3000/api/achievement?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        showToast(`✓ "${title}" removed from achievements!`, "success");
        fetchAchievements();
      } else {
        const d = await res.json();
        showToast(d.error || "Failed to remove achievement", "error");
      }
    } catch {
      showToast("Failed to connect to server.", "error");
    }
  };

  const achievementImages = uploadedEntries
    .filter((entry) => entry.fileUrl && entry.fileUrl.match(/\.(jpg|jpeg|png|webp|gif)$/i))
    .slice(0, 5)
    .map((entry) => entry.fileUrl!);

  const transformStyles =
    achievementImages.length === 5
      ? [
          "rotate(10deg) translate(-170px)",
          "rotate(5deg) translate(-85px)",
          "rotate(-3deg)",
          "rotate(-10deg) translate(85px)",
          "rotate(2deg) translate(170px)",
        ]
      : achievementImages.length === 4
      ? [
          "rotate(8deg) translate(-130px)",
          "rotate(3deg) translate(-45px)",
          "rotate(-5deg) translate(45px)",
          "rotate(-8deg) translate(130px)",
        ]
      : achievementImages.length === 3
      ? [
          "rotate(8deg) translate(-100px)",
          "rotate(-3deg)",
          "rotate(-8deg) translate(100px)",
        ]
      : achievementImages.length === 2
      ? ["rotate(5deg) translate(-60px)", "rotate(-5deg) translate(60px)"]
      : ["rotate(0deg)"];

  const achievementData = uploadedEntries
    .filter((entry) => entry.fileUrl && entry.fileUrl.match(/\.(jpg|jpeg|png|webp|gif)$/i))
    .slice(0, 5)
    .map((entry) => ({
      id: entry.id,
      name: entry.title,
      year: entry.description,
      photo: entry.fileUrl!,
    }));

  return (
    <main className="h-screen bg-[#050505] relative overflow-hidden">
      {/* Shape Grid Background */}
      <div className="fixed inset-0 z-0">
        <ShapeGrid
          direction="diagonal"
          speed={0.3}
          borderColor="#1a1a1a"
          squareSize={50}
          hoverFillColor="#c9a227"
          shape="square"
          hoverTrailAmount={6}
        />
      </div>

      {/* Back Navigation */}
      <div className="relative z-10 pt-8 px-8">
        <Link
          href="/"
          className="font-mono text-xs text-white/50 hover:text-white tracking-[0.2em] uppercase transition-colors border-b border-white/10 pb-1"
        >
          ← cd ../HOME
        </Link>
      </div>

      {/* Header with BlurText Effect */}
      <div className="relative z-10 text-center pt-12 pb-4">
        <h1 className="text-[3rem] sm:text-[4.2rem] md:text-[6rem] font-bebas text-white tracking-widest uppercase leading-[0.85] drop-shadow-2xl">
          <BlurText
            text="ACHIEVE"
            animateBy="letters"
            delay={0.1}
            stepDuration={0.4}
            direction="top"
          />
          <br />
          <BlurText
            text="MENTS"
            animateBy="letters"
            delay={0.3}
            stepDuration={0.4}
            direction="bottom"
          />
        </h1>
      </div>

      {/* Bounce Cards Feature */}
      {achievementImages.length > 0 && (
        <div className="relative z-10 flex justify-center py-8">
          <BounceCards
            images={achievementImages}
            containerWidth={750}
            containerHeight={438}
            transformStyles={transformStyles}
            enableHover={true}
            animationDelay={0.3}
            animationStagger={0.08}
            memberData={achievementData}
          />
        </div>
      )}

      {/* No achievements state */}
      {achievementImages.length === 0 && (
        <div className="relative z-10 flex justify-center items-center py-20">
          <div className="text-center py-16 px-12 border border-white/5 rounded-2xl bg-black/30 backdrop-blur-sm max-w-md">
            <p className="font-mono text-white/30 text-sm tracking-widest">
              NO ACHIEVEMENTS FOUND
            </p>
            <p className="font-mono text-white/15 text-xs mt-2 tracking-widest">
              Add achievements from the Admin Dashboard → Achievement tab
            </p>
          </div>
        </div>
      )}

      {/* Remove buttons overlay - floating tags at bottom */}
      {uploadedEntries.length > 0 && (
        <div className="relative z-10 flex justify-center gap-3 flex-wrap px-8 mt-2 max-h-[80px] overflow-y-auto scrollbar-hide">
          {uploadedEntries.map((achievement) => (
            <button
              key={achievement.id}
              onClick={() => handleRemoveAchievement(achievement.id, achievement.title)}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-sm hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300"
            >
              {achievement.fileUrl && achievement.fileUrl.match(/\.(jpg|jpeg|png|webp|gif)$/i) ? (
                <img
                  src={achievement.fileUrl}
                  alt={achievement.title}
                  className="w-5 h-5 rounded-full object-cover"
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-[#c9a227]/20 flex items-center justify-center">
                  <span className="text-[10px]">🏆</span>
                </div>
              )}
              <span className="font-mono text-[10px] text-white/50 group-hover:text-red-400 tracking-wider transition-colors">
                {achievement.title}
              </span>
              <svg
                className="w-3 h-3 text-white/20 group-hover:text-red-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          ))}
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-[500] px-6 py-4 rounded-xl font-mono text-sm tracking-wider shadow-2xl transition-all duration-500 animate-toast-in ${
            toast.type === "success"
              ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300"
              : "bg-red-500/20 border border-red-500/40 text-red-300"
          }`}
        >
          {toast.message}
        </div>
      )}

      <style jsx>{`
        @keyframes toast-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-toast-in {
          animation: toast-in 0.3s ease-out forwards;
        }
      `}</style>
      <MainFooter />
    </main>
  );
}
