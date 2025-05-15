
import { CompanionCard } from "@/components/CompanionCard";
import { useCompanions } from "@/context/CompanionContext";

export const CompanionGallery = () => {
  const { companions } = useCompanions();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {companions.map((companion) => (
        <CompanionCard key={companion.id} companion={companion} />
      ))}
      
      {companions.length === 0 && (
        <div className="col-span-full text-center py-10 text-muted-foreground">
          No companions yet. Create your first friend!
        </div>
      )}
    </div>
  );
};
