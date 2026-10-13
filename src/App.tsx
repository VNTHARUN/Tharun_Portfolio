import { Hero } from "@/components/Hero";
import { EducationContact, Experience, Footer, Skills } from "@/components/Sections";
import { TopBar } from "@/components/TopBar";
import { Work } from "@/components/Work";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-signal px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-3"
      >
        Skip to content
      </a>
      <TopBar />
      <main id="main">
        <Hero />
        <Work />
        <Skills />
        <Experience />
        <EducationContact />
      </main>
      <Footer />
    </div>
  );
}
