import { Textarea } from "@/components/ui/textarea";

export default function HomePage() {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="p-8 bg-white rounded-lg shadow-lg">
          <h1 className="scroll-m-40 text-5xl font-extrabold tracking-tight lg:text-6xl">
            Welcome to Bardic Inspiration!
          </h1>
            <Textarea className="mt-20" defaultValue="Enter your session notes here!"></Textarea>
        </div>
      </div>
    </>
  );
}
