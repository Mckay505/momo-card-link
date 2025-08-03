import { CyberSecurityWarning } from "@/components/CyberSecurityWarning";
import { MomoCard } from "@/components/MomoCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <CyberSecurityWarning />
        <MomoCard />
      </div>
    </div>
  );
};

export default Index;
