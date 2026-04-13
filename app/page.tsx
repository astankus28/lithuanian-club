import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Hero from '@/components/sections/Hero';
import Pillars from '@/components/sections/Pillars';
import Dining from '@/components/sections/Dining';
import Events from '@/components/sections/Events';
import BookSpace from '@/components/sections/BookSpace';
import Bar from '@/components/sections/Bar';
import Archive from '@/components/sections/Archive';
import Gallery from '@/components/sections/Gallery';
import Membership from '@/components/sections/Membership';
import Contact from '@/components/sections/Contact';
import Juosta from '@/components/ui/Juosta';

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Juosta />
      <Pillars />
      <Juosta />
      <Dining />
      <Juosta />
      <Events />
      <Juosta />
      <BookSpace />
      <Juosta />
      <Bar />
      <Juosta />
      <Archive />
      <Juosta />
      <Gallery />
      <Juosta />
      <Membership />
      <Juosta />
      <Contact />
      <Footer />
    </main>
  );
}
