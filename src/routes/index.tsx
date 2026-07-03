import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import bigotesAsset from "@/assets/bigotes.png.asset.json";
import sebastianAsset from "@/assets/sebastian.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Comiendo y Aprendiendo — Juego educativo" },
      {
        name: "description",
        content:
          "Juego infantil para niños de 5 a 6 años. Aprende sobre alimentación saludable con el gato Bigotes y el mono Sebastián.",
      },
      { property: "og:title", content: "Comiendo y Aprendiendo" },
      {
        property: "og:description",
        content: "Aprende sobre frutas, verduras y hábitos saludables jugando.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Game,
});

type Food = {
  emoji: string;
  name: string;
  category: "fruta" | "verdura";
  healthy: boolean;
};

const FOODS: Food[] = [
  { emoji: "🍎", name: "Manzana", category: "fruta", healthy: true },
  { emoji: "🍌", name: "Banano", category: "fruta", healthy: true },
  { emoji: "🍓", name: "Fresa", category: "fruta", healthy: true },
  { emoji: "🍇", name: "Uvas", category: "fruta", healthy: true },
  { emoji: "🍊", name: "Naranja", category: "fruta", healthy: true },
  { emoji: "🥕", name: "Zanahoria", category: "verdura", healthy: true },
  { emoji: "🥦", name: "Brócoli", category: "verdura", healthy: true },
  { emoji: "🌽", name: "Maíz", category: "verdura", healthy: true },
  { emoji: "🥬", name: "Lechuga", category: "verdura", healthy: true },
  { emoji: "🍅", name: "Tomate", category: "verdura", healthy: true },
];

const CHATARRA: Food[] = [
  { emoji: "🍔", name: "Hamburguesa", category: "fruta", healthy: false },
  { emoji: "🍟", name: "Papas fritas", category: "fruta", healthy: false },
  { emoji: "🍭", name: "Paleta", category: "fruta", healthy: false },
  { emoji: "🍰", name: "Torta", category: "fruta", healthy: false },
  { emoji: "🥤", name: "Gaseosa", category: "fruta", healthy: false },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function Game() {
  const [scene, setScene] = useState<0 | 1 | 2 | 3 | 4>(0);

  return (
    <main className="min-h-screen w-full bg-[radial-gradient(ellipse_at_top,#fff5b8_0%,#ffd6f0_45%,#c8f0ff_100%)] font-[system-ui,'Comic_Sans_MS',sans-serif]">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6">
        <Header scene={scene} onHome={() => setScene(0)} />
        <div className="flex-1">
          {scene === 0 && <SceneIntro onStart={() => setScene(1)} />}
          {scene === 1 && <SceneStory onNext={() => setScene(2)} />}
          {scene === 2 && <SceneClassify onNext={() => setScene(3)} />}
          {scene === 3 && <SceneHealthy onNext={() => setScene(4)} />}
          {scene === 4 && <SceneEnd onRestart={() => setScene(0)} />}
        </div>
      </div>
    </main>
  );
}

function Header({ scene, onHome }: { scene: number; onHome: () => void }) {
  const labels = ["Inicio", "Historia", "Clasifica", "Saludable", "¡Ganaste!"];
  return (
    <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <button
        onClick={onHome}
        className="rounded-full bg-white/70 px-4 py-2 text-lg font-bold text-pink-600 shadow-md hover:scale-105 hover:bg-white transition"
      >
        🏠 Inicio
      </button>
      <div className="flex gap-2">
        {labels.map((l, i) => (
          <div
            key={l}
            className={`h-3 w-10 rounded-full transition ${
              i <= scene ? "bg-pink-500" : "bg-white/60"
            }`}
            title={l}
          />
        ))}
      </div>
    </header>
  );
}

function Character({
  src,
  name,
  className = "",
}: {
  src: string;
  name: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={name}
      className={`drop-shadow-2xl select-none ${className}`}
      draggable={false}
    />
  );
}

function SpeechBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative max-w-md rounded-3xl bg-white p-5 text-xl font-semibold text-slate-800 shadow-xl ring-4 ring-yellow-300">
      {children}
    </div>
  );
}

function BigButton({
  children,
  onClick,
  color = "pink",
}: {
  children: React.ReactNode;
  onClick: () => void;
  color?: "pink" | "green" | "orange" | "blue";
}) {
  const colors: Record<string, string> = {
    pink: "bg-pink-500 hover:bg-pink-600",
    green: "bg-green-500 hover:bg-green-600",
    orange: "bg-orange-500 hover:bg-orange-600",
    blue: "bg-sky-500 hover:bg-sky-600",
  };
  return (
    <button
      onClick={onClick}
      className={`${colors[color]} rounded-full px-8 py-4 text-2xl font-black text-white shadow-lg ring-4 ring-white transition hover:scale-110 active:scale-95`}
    >
      {children}
    </button>
  );
}

/* ---------------- Scene 0: Intro ---------------- */
function SceneIntro({ onStart }: { onStart: () => void }) {
  return (
    <section className="flex flex-col items-center gap-6 text-center">
      <h1 className="text-5xl font-black text-pink-600 drop-shadow-md md:text-7xl">
        🍎 Comiendo y Aprendiendo 🥦
      </h1>
      <p className="max-w-2xl text-xl font-semibold text-slate-700 md:text-2xl">
        ¡Ven a jugar con Bigotes y Sebastián descubriendo alimentos saludables!
      </p>
      <div className="flex flex-wrap items-end justify-center gap-4">
        <Character src={bigotesAsset.url} name="Gato Bigotes" className="h-56 md:h-72" />
        <Character src={sebastianAsset.url} name="Mono Sebastián" className="h-56 md:h-72" />
      </div>
      <BigButton onClick={onStart} color="green">
        ▶ ¡Empezar a jugar!
      </BigButton>
    </section>
  );
}

/* ---------------- Scene 1: Historia ---------------- */
function SceneStory({ onNext }: { onNext: () => void }) {
  const [step, setStep] = useState(0);
  const dialog = [
    { who: "gato", text: "¡Hola! Soy Bigotes 🐱 y tengo mucha hambre." },
    {
      who: "mono",
      text: "¡Y yo soy Sebastián 🐵! Vamos a buscar frutas y verduras riquísimas.",
    },
    {
      who: "gato",
      text: "Los alimentos nos dan energía para correr, saltar y aprender.",
    },
    {
      who: "mono",
      text: "¿Nos ayudas a descubrirlos? ¡Vamos a jugar juntos!",
    },
  ];
  const current = dialog[step];
  const isLast = step === dialog.length - 1;

  return (
    <section className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
      <div className="flex justify-center">
        {current.who === "gato" ? (
          <Character src={bigotesAsset.url} name="Bigotes" className="h-72 md:h-96" />
        ) : (
          <Character src={sebastianAsset.url} name="Sebastián" className="h-72 md:h-96" />
        )}
      </div>
      <div className="flex flex-col items-center gap-6">
        <SpeechBubble>{current.text}</SpeechBubble>
        {isLast ? (
          <BigButton onClick={onNext} color="orange">
            ¡Vamos a clasificar! 🍇
          </BigButton>
        ) : (
          <BigButton onClick={() => setStep(step + 1)} color="blue">
            Siguiente ➡️
          </BigButton>
        )}
      </div>
    </section>
  );
}

/* ---------------- Scene 2: Clasificar frutas / verduras ---------------- */
function SceneClassify({ onNext }: { onNext: () => void }) {
  const initial = useMemo(() => shuffle(FOODS), []);
  const [remaining, setRemaining] = useState<Food[]>(initial);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const current = remaining[0];
  const done = !current;

  function choose(cat: "fruta" | "verdura") {
    if (!current) return;
    if (current.category === cat) {
      setScore((s) => s + 1);
      setFeedback("✅ ¡Muy bien!");
    } else {
      setWrong((w) => w + 1);
      setFeedback(`❌ ${current.name} es una ${current.category}`);
    }
    setTimeout(() => {
      setFeedback(null);
      setRemaining((r) => r.slice(1));
    }, 900);
  }

  return (
    <section className="flex flex-col items-center gap-6 text-center">
      <h2 className="text-4xl font-black text-orange-600 drop-shadow md:text-5xl">
        🥕 Escena 1: ¿Fruta o Verdura? 🍎
      </h2>
      <p className="text-lg font-semibold text-slate-700">
        Sebastián te muestra un alimento. Toca la canasta correcta.
      </p>

      <div className="flex items-center gap-4">
        <Character src={sebastianAsset.url} name="Sebastián" className="h-32 md:h-40" />
        {done ? (
          <div className="rounded-3xl bg-white p-6 text-3xl font-black text-green-600 shadow-xl ring-4 ring-green-300">
            🎉 ¡Terminaste! Aciertos: {score} / {initial.length}
          </div>
        ) : (
          <div className="rounded-3xl bg-white px-8 py-6 shadow-xl ring-4 ring-yellow-300">
            <div className="text-8xl md:text-9xl">{current.emoji}</div>
            <div className="mt-2 text-2xl font-bold text-slate-800">{current.name}</div>
          </div>
        )}
      </div>

      {feedback && (
        <div className="text-3xl font-black text-pink-600 animate-bounce">{feedback}</div>
      )}

      {!done && (
        <div className="flex flex-wrap justify-center gap-6">
          <button
            onClick={() => choose("fruta")}
            className="flex flex-col items-center gap-2 rounded-3xl bg-red-400 p-6 text-white shadow-xl ring-4 ring-white transition hover:scale-110"
          >
            <div className="text-6xl">🧺</div>
            <div className="text-2xl font-black">FRUTAS</div>
          </button>
          <button
            onClick={() => choose("verdura")}
            className="flex flex-col items-center gap-2 rounded-3xl bg-green-500 p-6 text-white shadow-xl ring-4 ring-white transition hover:scale-110"
          >
            <div className="text-6xl">🧺</div>
            <div className="text-2xl font-black">VERDURAS</div>
          </button>
        </div>
      )}

      <div className="flex gap-6 text-xl font-bold">
        <span className="text-green-700">✅ {score}</span>
        <span className="text-red-500">❌ {wrong}</span>
      </div>

      {done && (
        <BigButton onClick={onNext} color="pink">
          Siguiente escena ➡️
        </BigButton>
      )}
    </section>
  );
}

/* ---------------- Scene 3: Saludable / Chatarra ---------------- */
function SceneHealthy({ onNext }: { onNext: () => void }) {
  const mix = useMemo(
    () => shuffle([...shuffle(FOODS).slice(0, 5), ...CHATARRA]),
    []
  );
  const [remaining, setRemaining] = useState<Food[]>(mix);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const current = remaining[0];
  const done = !current;

  function choose(healthy: boolean) {
    if (!current) return;
    if (current.healthy === healthy) {
      setScore((s) => s + 1);
      setFeedback("💪 ¡Excelente elección!");
    } else {
      setFeedback(
        current.healthy
          ? `🌟 ${current.name} sí te da energía sana`
          : `😋 ${current.name} solo de vez en cuando`
      );
    }
    setTimeout(() => {
      setFeedback(null);
      setRemaining((r) => r.slice(1));
    }, 1000);
  }

  return (
    <section className="flex flex-col items-center gap-6 text-center">
      <h2 className="text-4xl font-black text-green-700 drop-shadow md:text-5xl">
        🥗 Escena 2: ¿Me da energía sana? 💪
      </h2>
      <p className="max-w-2xl text-lg font-semibold text-slate-700">
        Bigotes quiere crecer fuerte. Ayúdalo a elegir qué alimentos son
        saludables.
      </p>

      <div className="flex items-center gap-4">
        <Character src={bigotesAsset.url} name="Bigotes" className="h-32 md:h-40" />
        {done ? (
          <div className="rounded-3xl bg-white p-6 text-3xl font-black text-green-600 shadow-xl ring-4 ring-green-300">
            🎉 ¡Muy bien! Aciertos: {score} / {mix.length}
          </div>
        ) : (
          <div className="rounded-3xl bg-white px-8 py-6 shadow-xl ring-4 ring-yellow-300">
            <div className="text-8xl md:text-9xl">{current.emoji}</div>
            <div className="mt-2 text-2xl font-bold text-slate-800">{current.name}</div>
          </div>
        )}
      </div>

      {feedback && (
        <div className="text-2xl font-black text-orange-600 animate-bounce">{feedback}</div>
      )}

      {!done && (
        <div className="flex flex-wrap justify-center gap-6">
          <button
            onClick={() => choose(true)}
            className="flex flex-col items-center gap-2 rounded-3xl bg-green-500 p-6 text-white shadow-xl ring-4 ring-white transition hover:scale-110"
          >
            <div className="text-6xl">💚</div>
            <div className="text-2xl font-black">SALUDABLE</div>
          </button>
          <button
            onClick={() => choose(false)}
            className="flex flex-col items-center gap-2 rounded-3xl bg-orange-500 p-6 text-white shadow-xl ring-4 ring-white transition hover:scale-110"
          >
            <div className="text-6xl">🍭</div>
            <div className="text-2xl font-black">POCAS VECES</div>
          </button>
        </div>
      )}

      {done && (
        <BigButton onClick={onNext} color="pink">
          Última escena ➡️
        </BigButton>
      )}
    </section>
  );
}

/* ---------------- Scene 4: Final ---------------- */
function SceneEnd({ onRestart }: { onRestart: () => void }) {
  return (
    <section className="relative flex flex-col items-center gap-6 text-center">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {["🎉", "⭐", "🍎", "🥦", "🍇", "🥕", "🌟", "🎈"].map((e, i) => (
          <span
            key={i}
            className="absolute text-4xl animate-bounce"
            style={{
              left: `${(i * 13) % 90 + 5}%`,
              top: `${(i * 23) % 70 + 5}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${1.5 + (i % 3) * 0.4}s`,
            }}
          >
            {e}
          </span>
        ))}
      </div>

      <h2 className="text-5xl font-black text-pink-600 drop-shadow md:text-6xl">
        🏆 ¡Lo lograste! 🏆
      </h2>
      <p className="max-w-2xl text-2xl font-bold text-slate-700">
        Aprendiste con Bigotes y Sebastián que las frutas y verduras nos ayudan
        a crecer sanos, fuertes y llenos de energía.
      </p>
      <div className="flex flex-wrap items-end justify-center gap-4">
        <Character src={bigotesAsset.url} name="Bigotes" className="h-56 md:h-72" />
        <div className="rounded-3xl bg-white p-5 text-xl font-bold text-slate-800 shadow-xl ring-4 ring-yellow-300">
          ¡Comer bien es divertido! 🥗✨
        </div>
        <Character src={sebastianAsset.url} name="Sebastián" className="h-56 md:h-72" />
      </div>
      <BigButton onClick={onRestart} color="green">
        🔄 Jugar de nuevo
      </BigButton>
    </section>
  );
}
