import GeminiSessionNotes from "../AI/GeminiSessionNotes";

export default function HomePage() {
  return (
    <div className="h-full flex flex-col items-center">
      <div className="">
        <div className="p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-center scroll-m-40 text-5xl font-extrabold tracking-tight lg:text-6xl">
            Welcome to Bardic Inspiration!
          </h1>
          <h2 className="text-center text-2xl font-semibold mt-4">
            Find music for your next tabletop session
          </h2>
        </div>
      </div>
      <div className="mt-8">
        <GeminiSessionNotes></GeminiSessionNotes>
      </div>
    </div>
  );
}
