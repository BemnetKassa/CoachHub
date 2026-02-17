import Hero from '@/components/hero';
import About from '@/components/about';
import Testimony from '@/components/testimony';
import Contact from '@/components/contact';

export default function Home() {
  return (
    <div className="bg-neutral-950">
      <Hero />
      <About />
      <Testimony />
      <Contact />
    </div>
  );
}
