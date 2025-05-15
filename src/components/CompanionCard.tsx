
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle } from "lucide-react";

export type Mood = "happy" | "calm" | "thoughtful" | "excited" | "neutral";

export interface CompanionProps {
  id: number;
  name: string;
  personality: string[];
  catchphrase: string;
  mood: Mood;
  avatar: string;
  backstory: string;
  bondLevel: number;
}

export const CompanionCard = ({ companion }: { companion: CompanionProps }) => {
  const [isHovering, setIsHovering] = useState(false);
  
  // Convert bond level to description
  const getBondDescription = (level: number) => {
    if (level < 20) return "New friend";
    if (level < 40) return "Acquaintance";
    if (level < 60) return "Good friend";
    if (level < 80) return "Close friend";
    return "Best friend";
  };

  return (
    <Card 
      className="companion-card overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <CardHeader className="p-0 h-48 overflow-hidden relative">
        <img 
          src={companion.avatar} 
          alt={companion.name} 
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovering ? 'scale-110' : ''}`}
        />
        <div 
          className={`absolute top-3 right-3 w-4 h-4 rounded-full bg-companion-${companion.mood} mood-indicator`}
          title={`${companion.name} is feeling ${companion.mood}`}
        />
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{companion.name}</h3>
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4 text-primary fill-primary" />
            <span className="text-sm">{companion.bondLevel}%</span>
          </div>
        </div>
        
        <div className="mb-3">
          <p className="text-sm italic text-muted-foreground mb-2">"{companion.catchphrase}"</p>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {companion.personality.map((trait, i) => (
            <Badge key={i} variant="outline" className="text-xs">{trait}</Badge>
          ))}
        </div>
        
        <div>
          <p className="text-sm line-clamp-3 text-muted-foreground">{companion.backstory}</p>
        </div>
        
        <div className="mt-3 pt-2 border-t">
          <p className="text-xs text-muted-foreground mb-1">{getBondDescription(companion.bondLevel)}</p>
          <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary bond-indicator" 
              style={{ width: `${companion.bondLevel}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pb-4">
        <Button className="friend-button w-full" size="sm">
          <MessageCircle className="w-4 h-4 mr-2" />
          Talk to {companion.name}
        </Button>
      </CardFooter>
    </Card>
  );
};
