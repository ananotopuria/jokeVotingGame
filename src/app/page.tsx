import JokeCard from "../components/JokeCard";
import BackgroundBeams from "@/components/BackgroundBeams";

export default function Home() {
  return (
    <main className="relative h-screen w-full">
       <BackgroundBeams />
      <section className="min-h-screen flex items-center justify-center">
        <JokeCard />
      </section>
    </main>
  );
}
