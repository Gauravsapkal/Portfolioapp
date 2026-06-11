import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { TrustBar } from "../components/TrustBar";
import { About } from "../components/About";
import { Services } from "../components/Services";
import { Projects } from "../components/Projects";
import { CaseStudies } from "../components/CaseStudies";
import { Skills } from "../components/Skills";
import { Testimonials } from "../components/Testimonials";
import { Certifications } from "../components/Certifications";
import { Resume } from "../components/Resume";
import { FreelancerCTA } from "../components/FreelancerCTA";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";

export function Home() {
  return (
    <>
      <Navbar />
      <main>
        <section id="home"><Hero /></section>
        <TrustBar />
        <section id="about"><About /></section>
        <section id="services"><Services /></section>
        <section id="projects"><Projects /></section>
        <section id="case-studies"><CaseStudies /></section>
        <section id="skills"><Skills /></section>
        <section id="testimonials"><Testimonials /></section>
        <section id="certifications"><Certifications /></section>
        <section id="resume"><Resume /></section>
        <FreelancerCTA />
        <section id="contact"><Contact /></section>
      </main>
      <Footer />
    </>
  );
}
