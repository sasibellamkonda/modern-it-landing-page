import PageLoader from "./components/PageLoader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ServicesStrip from "./components/ServicesStrip";
import About from "./components/About";
import ServicesGrid from "./components/ServicesGrid";
import Industries from "./components/Industries";
import TechHighlights from "./components/TechHighlights";
import SocialProof from "./components/SocialProof";
import CareersCTA from "./components/CareersCTA";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <PageLoader />
      <Navbar />
      <main>
        <Hero />
        <ServicesStrip />
        <About />
        <ServicesGrid />
        <Industries />
        <TechHighlights />
        <SocialProof />
        <CareersCTA />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
