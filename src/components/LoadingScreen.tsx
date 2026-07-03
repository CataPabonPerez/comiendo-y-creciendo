import bigotes from "@/assets/gato-bigotes.png";
import sebastian from "@/assets/mono-sebastian.png";

type Props = {
  progress: number;
};

export default function LoadingScreen({ progress }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[radial-gradient(circle_at_top,#fff5b8,#ffd6f0,#c8f0ff)]">
      <div className="flex w-full max-w-4xl flex-col items-center px-6">

        <h1 className="mb-6 text-center text-5xl font-black text-pink-600 drop-shadow-lg md:text-7xl">
          🍎 Comiendo y Aprendiendo 🥦
        </h1>

        <div className="mb-8 flex items-end justify-center gap-10">
          <img
            src={bigotes}
            className="h-44 animate-bounce md:h-60"
            alt="Bigotes"
            draggable={false}
          />

          <img
            src={sebastian}
            className="h-44 animate-bounce md:h-60"
            alt="Sebastián"
            draggable={false}
          />
        </div>

        <p className="mb-5 text-2xl font-bold text-slate-700">
          Preparando la aventura...
        </p>

        <div className="h-6 w-full overflow-hidden rounded-full bg-white shadow-lg">

          <div
            className="h-full rounded-full bg-gradient-to-r from-pink-500 via-orange-400 to-green-400 transition-all duration-300"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        <p className="mt-3 text-xl font-bold text-pink-600">
          {progress}%
        </p>

      </div>
    </div>
  );
}