
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { UserPlus } from "lucide-react";
import { CreateCompanionForm } from "./CreateCompanionForm";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export const CreateCompanionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  const onComplete = () => setIsOpen(false);

  return (
    <>
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <Button 
              className="fixed right-6 bottom-6 shadow-lg h-14 w-14 rounded-full p-0"
              size="lg"
              aria-label="Create your new friend"
            >
              <UserPlus className="h-6 w-6" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="px-4 pb-6">
            <DrawerHeader>
              <DrawerTitle>Create Your New AI Friend</DrawerTitle>
              <DrawerDescription>
                Design a companion with a personality that resonates with you. They'll remember your conversations and grow closer over time.
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4">
              <CreateCompanionForm onComplete={onComplete} />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button 
              className="fixed right-6 bottom-6 shadow-lg"
              size="lg"
            >
              <UserPlus className="h-5 w-5 mr-1" />
              Create Your New Friend
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create Your New AI Friend</DialogTitle>
              <DialogDescription>
                Design a companion with a personality that resonates with you. They'll remember your conversations and grow closer over time.
              </DialogDescription>
            </DialogHeader>
            <CreateCompanionForm onComplete={onComplete} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
