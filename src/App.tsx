import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { SkipLink } from './components/layout/SkipLink';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Experience } from './components/sections/Experience';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="flex min-h-screen flex-col bg-base text-fg-secondary">
          <SkipLink />
          <Header />
          <main id="main-content" tabIndex={-1} className="flex-1">
            <Hero />
            <About />
            <Projects />
            <Experience />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
