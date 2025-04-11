import MusicBox from "./components/MusicBox";

export default function Home() {
  return (
    <div>
      <MusicBox songName="Test" tags={["Help", "Me"]}></MusicBox>
    </div>
  );
}
