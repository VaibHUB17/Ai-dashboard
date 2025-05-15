
import { WelcomeHeader } from "@/components/WelcomeHeader";
import { CompanionGallery } from "@/components/CompanionGallery";
import { CreateCompanionButton } from "@/components/CreateCompanionButton";

const Index = () => {
  return (
    <div className="min-h-screen py-8 px-4 md:px-8 max-w-7xl mx-auto animate-scale-up">
      <WelcomeHeader />
      
      <main>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">Your AI Friends</h2>
          <CompanionGallery />
        </section>
      </main>
      
      <CreateCompanionButton />
    </div>
  );
};

export default Index;
