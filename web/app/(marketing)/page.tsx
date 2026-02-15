import Hero from '@/components/hero';
import About from '@/components/about';
import Testimony from '@/components/testimony';
import Contact from '@/components/contact';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />
      <About />
      <Testimony />
      <Contact />
      <Footer />
    </div>
  );
}
