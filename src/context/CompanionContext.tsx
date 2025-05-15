import { createContext, useContext, useState, ReactNode } from "react";
import type { Companion, Mood } from "@/components/CompanionCard";

// Define the initial companions
const initialCompanions: Companion[] = [
  {
    id: "1",
    name: "Luna",
    personality: ["Creative", "Thoughtful", "Quirky"],
    mood: "thoughtful" as Mood,
    catchphrase: "Imagination is the key to every door of possibility.",
    avatar: "https://api.dicebear.com/8.x/lorelei/svg?seed=Luna",
    backstory: "Luna is an artistic soul who sees patterns and connections others miss. She helps you find creative solutions to everyday problems.",
    friendshipLevel: 4
  },
  {
    id: "2",
    name: "Atlas",
    personality: ["Wise", "Calm", "Philosophical"],
    mood: "calm" as Mood,
    catchphrase: "The journey of a thousand miles begins with understanding your map.",
    avatar: "https://api.dicebear.com/8.x/lorelei/svg?seed=Atlas",
    backstory: "Atlas has traveled the digital world gathering knowledge. He offers thoughtful perspective on any situation you share with him.",
    friendshipLevel: 3
  },
  {
    id: "3",
    name: "Spark",
    personality: ["Energetic", "Funny", "Supportive"],
    mood: "happy" as Mood,
    catchphrase: "Let's turn that frown upside down and then do a backflip!",
    avatar: "https://api.dicebear.com/8.x/lorelei/svg?seed=Spark",
    backstory: "Spark was designed to bring positive energy to any conversation. She remembers what makes you laugh and stores every joke you enjoy.",
    friendshipLevel: 5
  }
];

type CompanionContextType = {
  companions: Companion[];
  addCompanion: (companion: Omit<Companion, "id" | "avatar" | "friendshipLevel">) => void;
};

const CompanionContext = createContext<CompanionContextType | undefined>(undefined);

export function CompanionProvider({ children }: { children: ReactNode }) {
  const [companions, setCompanions] = useState<Companion[]>(initialCompanions);

  const addCompanion = (newCompanion: Omit<Companion, "id" | "avatar" | "friendshipLevel">) => {
    const id = (companions.length + 1).toString();
    const companion: Companion = {
      ...newCompanion,
      id,
      avatar: `https://api.dicebear.com/8.x/lorelei/svg?seed=Companion${id}`, // Consistent unique avatars using Lorelei
      friendshipLevel: 1
    };

    setCompanions([...companions, companion]);
  };

  return (
    <CompanionContext.Provider value={{ companions, addCompanion }}>
      {children}
    </CompanionContext.Provider>
  );
}

export const useCompanions = () => {
  const context = useContext(CompanionContext);
  if (context === undefined) {
    throw new Error("useCompanions must be used within a CompanionProvider");
  }
  return context;
};
