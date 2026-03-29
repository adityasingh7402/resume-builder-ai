import HeroComponent from "./home/HeroComponent";
import StepsSection from "./home/StepsSection";
import BentoSection from "./home/BentoSection";
import FAQSection from "./home/FAQSection";
import FeaturesComponent from "./home/FeaturesComponent";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroComponent />
      <StepsSection />
      <FeaturesComponent />
      <BentoSection />
      
      {/* Pricing removed intentionally per user request to make it 100% free */}
      
      <FAQSection />
      <Footer />
    </div>
  );
}
