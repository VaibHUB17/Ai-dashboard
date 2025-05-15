import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export const WelcomeHeader = () => {
  const [greeting, setGreeting] = useState("");
  const [userName, setUserName] = useState("Friend");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Get current hour to determine greeting
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      setGreeting("Good morning");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
    
    // In a real app, this would come from user auth or settings
    // For demo purposes, we'll use a hardcoded name
    setUserName("Vaibhav");
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <>
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
              AIavatar
            </h1>
          </div>
          <div>
            <Button onClick={handleLogin} size="sm">
              {isLoggedIn ? "Logout" : "Login"}
            </Button>
          </div>
        </div>
      </header>
      
      <div className="mb-8 mt-6 text-center md:text-left">
        <h2 className="text-4xl font-bold mb-2 flex items-center justify-center md:justify-start gap-2">
          <span>{greeting}, {userName}</span>
          <span className="wave-on-load inline-block">👋</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Your virtual friends are waiting to chat! Each has their own unique personality and remembers your conversations.
        </p>
      </div>
    </>
  );
};
