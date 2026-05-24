import { useState } from "react";
import { Dumbbell, Home, X } from "lucide-react";
 
const workoutData = {
  Monday: {
    type: "gym",
    title: "Lower Body + Core",
    exercises: [
      { name: "Hip thrusts", sets: "4x10", videos: [{ label: "Video", url: "https://youtu.be/jkmklyOxc5w" }] },
      { name: "Romanian deadlifts", sets: "3x10", videos: [{ label: "Video", url: "https://youtube.com/shorts/87Ov7RekdY0" }] },
      { name: "Bulgarian split squats", sets: "3x8 each leg", videos: [{ label: "Video", url: "https://youtube.com/shorts/SMa_0UP_4zU" }] },
      { name: "Leg press", sets: "3x12", videos: [{ label: "Seated version", url: "https://youtu.be/ZDsiwCn6zA4" }, { label: "Machine version", url: "https://youtu.be/KzldjgY4Mqg" }] },
      { name: "Cable crunches", sets: "3x12", videos: [{ label: "Video", url: "https://youtube.com/shorts/mnRhbUB3Fjs" }] },
      { name: "Incline treadmill walk", sets: "10–15 min" },
    ],
  },
  Tuesday: {
    type: "home",
    title: "Core + Mobility",
    duration: "10–20 min",
    sections: [
      {
        title: "Core",
        exercises: [
          { name: "Dead bugs", sets: "2x10", videos: [{ label: "Video", url: "https://youtu.be/vnozpFoI8ug" }] },
          { name: "Bird dogs", sets: "2x10", videos: [{ label: "Video", url: "https://youtu.be/xEDnlOxeJH4" }] },
          { name: "Side planks", sets: "30 sec each side" },
          { name: "Reverse crunches", sets: "2x12", videos: [{ label: "Video", url: "https://youtu.be/lmSP-c1X_iY" }] },
        ],
      },
      {
        title: "Mobility",
        exercises: [
          { name: "Hip flexor stretch", videos: [{ label: "Video", url: "https://youtu.be/DXuStgWuJV8" }] },
          { name: "Chest opener stretch", videos: [{ label: "Video", url: "https://youtu.be/16qCwSMGqx4" }] },
          { name: "Cat-cow stretch", videos: [{ label: "Video", url: "https://youtu.be/LIVJZZyZ2qM" }] },
          { name: "Hamstring stretch", videos: [{ label: "Video", url: "https://youtu.be/T_l0AyZywjU" }] },
        ],
      },
    ],
  },
  Wednesday: {
    type: "gym",
    title: "Upper Body + Posture",
    exercises: [
      { name: "Lat pulldowns", sets: "4x10", videos: [{ label: "Cable version", url: "https://youtu.be/grz-WsiBbrw" }, { label: "Machine version", url: "https://youtu.be/NMCtB_ObkSM" }] },
      { name: "Seated cable rows", sets: "3x10", videos: [{ label: "Short form", url: "https://youtube.com/shorts/daRxwg227Nw" }, { label: "Full tutorial", url: "https://youtu.be/tYk2f1EuwV0" }] },
      { name: "Dumbbell shoulder press", sets: "3x10", videos: [{ label: "Video", url: "https://youtu.be/RW52pKHs0mw" }] },
      { name: "Chest-supported rows", sets: "3x12", videos: [{ label: "Video", url: "https://youtu.be/DIS839guYUk" }] },
      { name: "Face pulls", sets: "3x15", videos: [{ label: "Video", url: "https://youtu.be/0Po47vvj9g4" }] },
      { name: "Plank", sets: "3 rounds" },
    ],
  },
  Thursday: {
    type: "home",
    title: "Light Movement",
    exercises: [{ name: "20–40 min walk" }],
    optional: [
      { name: "Side planks" },
      { name: "Stretching" },
      { name: "Foam rolling" },
    ],
    note: "Keep this easy. Recovery helps your appearance too.",
  },
  Friday: {
    type: "gym",
    title: "Full Body + Glutes",
    exercises: [
      { name: "Squats or goblet squats", sets: "4x8", videos: [{ label: "Video", url: "https://youtu.be/zBV3ceGyAxw" }] },
      { name: "Walking lunges", sets: "3x12" },
      { name: "Cable kickbacks", sets: "3x15", videos: [{ label: "Video", url: "https://youtu.be/ZDM8Kz-aTaA" }] },
      { name: "Dumbbell Romanian deadlifts", sets: "3x10", videos: [{ label: "Video", url: "https://youtu.be/5WxMW-Fu5KU" }] },
      { name: "Stairmaster", sets: "10 min" },
      { name: "Hanging knee raises", sets: "3x12", videos: [{ label: "Video", url: "https://youtube.com/shorts/dNxiPPiqrac" }] },
    ],
  },
  Saturday: {
    type: "home",
    title: "Active Reset",
    options: ["Long walk", "Yoga", "Easy hike", "Dance workout", "Mobility/stretch session"],
    note: "Goal = reduce stress + improve recovery.",
  },
  Sunday: {
    type: "rest",
    title: "Rest Day",
  },
};
 
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
 
function getEmbedUrl(url: string): string {
  if (url.includes("youtube.com/shorts/")) {
    const id = url.split("youtube.com/shorts/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  if (url.includes("youtube.com/watch")) {
    const id = new URL(url).searchParams.get("v");
    return `https://www.youtube.com/embed/${id}`;
  }
  return url;
}
 
type Video = { label: string; url: string };
 
function ExerciseItem({ name, sets, videos, color }: { name: string; sets?: string; videos?: Video[]; color: string }) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeName, setActiveName] = useState<string | null>(null);
 
  const handleClick = (video: Video) => {
    setActiveName(video.label);
    setActiveVideo(getEmbedUrl(video.url));
  };
 
  return (
    <>
      <li className="flex justify-between text-sm">
        <span className="flex items-center gap-2 text-slate-100">
          {name}
          {videos && videos.map((v, i) => (
            <button
              key={i}
              onClick={() => handleClick(v)}
              className={`text-xs px-2 py-0.5 rounded-full border ${color} opacity-80 hover:opacity-100 transition-opacity`}
            >
              {videos.length > 1 ? v.label : "▶"}
            </button>
          ))}
        </span>
        {sets && <span className="text-slate-400 shrink-0 ml-2">{sets}</span>}
      </li>
 
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl bg-purple-950 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-white font-medium">{name} — {activeName}</h3>
              <button onClick={() => setActiveVideo(null)} className="rounded-full p-1 text-slate-400 hover:text-white">
                <X className="size-5" />
              </button>
            </div>
            <iframe
              width="100%"
              height="400"
              src={activeVideo}
              title={name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
 
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h1 className="mb-2 flex items-center justify-center gap-3 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            <Dumbbell className="size-10 text-pink-400" />
            Gym Split Schedule
          </h1>
        </div>
 
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {days.map((day) => {
            const workout = workoutData[day as keyof typeof workoutData];
            const isGym = workout.type === "gym";
            const isHome = workout.type === "home";
            const isRest = workout.type === "rest";
            const gymColor = "border-purple-400/40 bg-purple-500/20 text-purple-300";
            const homeColor = "border-blue-400/40 bg-blue-500/20 text-blue-300";
            const btnColor = isGym ? gymColor : homeColor;
 
            return (
              <div
                key={day}
                className={`group relative overflow-hidden rounded-2xl border p-5 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  isGym
                    ? "border-purple-500/50 bg-gradient-to-br from-purple-900/40 to-pink-900/40 shadow-purple-500/20"
                    : isHome
                      ? "border-blue-500/50 bg-gradient-to-br from-blue-900/40 to-cyan-900/40 shadow-blue-500/20"
                      : "border-slate-500/50 bg-gradient-to-br from-slate-900/40 to-slate-800/40 shadow-slate-500/20"
                }`}
              >
                <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                  isGym ? "bg-gradient-to-br from-purple-600/10 to-pink-600/10"
                    : isHome ? "bg-gradient-to-br from-blue-600/10 to-cyan-600/10"
                    : "bg-gradient-to-br from-slate-600/10 to-slate-500/10"
                }`} />
 
                <div className="relative mb-3 flex items-center justify-between">
                  <h2 className="bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">{day}</h2>
                  {isGym && <Dumbbell className="size-5 text-purple-400" />}
                  {isHome && <Home className="size-5 text-blue-400" />}
                </div>
 
                <div className={`relative mb-3 inline-block rounded-full border px-3 py-1 backdrop-blur-sm ${
                  isGym ? "border-purple-400/30 bg-purple-500/20 text-purple-200"
                    : isHome ? "border-blue-400/30 bg-blue-500/20 text-blue-200"
                    : "border-slate-400/30 bg-slate-500/20 text-slate-200"
                }`}>
                  {workout.title}
                </div>
 
                {"duration" in workout && workout.duration && (
                  <p className="relative mb-3 text-sm text-slate-300">{workout.duration}</p>
                )}
 
                {isRest && (
                  <p className="relative text-sm text-slate-300">Take a day off to recover and recharge.</p>
                )}
 
                {"exercises" in workout && workout.exercises && (
                  <ul className="relative space-y-2">
                    {workout.exercises.map((exercise, idx) => (
                      <ExerciseItem key={idx} {...exercise} color={btnColor} />
                    ))}
                  </ul>
                )}
 
                {"sections" in workout && workout.sections && (
                  <div className="relative space-y-4">
                    {workout.sections.map((section, sIdx) => (
                      <div key={sIdx}>
                        <h3 className="mb-2 text-slate-200">{section.title}</h3>
                        <ul className="space-y-2">
                          {section.exercises.map((exercise, eIdx) => (
                            <ExerciseItem key={eIdx} {...exercise} color={btnColor} />
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
 
                {"optional" in workout && workout.optional && (
                  <div className="relative mt-3 border-t border-white/10 pt-3">
                    <p className="mb-2 text-sm text-slate-300">Optional:</p>
                    <ul className="space-y-1">
                      {workout.optional.map((item, idx) => (
                        <li key={idx} className="text-sm text-slate-400">• {item.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
 
                {"options" in workout && workout.options && (
                  <div className="relative mb-3">
                    <p className="mb-2 text-sm text-slate-300">Choose one:</p>
                    <ul className="space-y-1">
                      {workout.options.map((option, idx) => (
                        <li key={idx} className="text-sm text-slate-400">• {option}</li>
                      ))}
                    </ul>
                  </div>
                )}
 
                {"note" in workout && workout.note && (
                  <p className="relative mt-3 border-t border-white/10 pt-3 text-sm italic text-slate-400">{workout.note}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}