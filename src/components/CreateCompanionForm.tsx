
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Mood } from "./CompanionCard";
import { toast } from "sonner";
import { useCompanions } from "@/context/CompanionContext";

const personalityTraits = [
  "Cheerful", "Creative", "Wise", "Thoughtful", "Quirky", "Energetic", 
  "Calm", "Supportive", "Funny", "Philosophical", "Adventurous", "Empathetic"
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  catchphrase: z.string().min(10, {
    message: "Catchphrase must be at least 10 characters.",
  }),
  backstory: z.string().min(30, {
    message: "Backstory must be at least 30 characters to create depth.",
  }),
  defaultMood: z.enum(["happy", "calm", "thoughtful", "excited", "neutral"] as const),
});

export const CreateCompanionForm = ({ onComplete }: { onComplete: () => void }) => {
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const { addCompanion } = useCompanions();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      catchphrase: "",
      backstory: "",
      defaultMood: "neutral",
    },
  });

  const toggleTrait = (trait: string) => {
    if (selectedTraits.includes(trait)) {
      setSelectedTraits(selectedTraits.filter(t => t !== trait));
    } else {
      if (selectedTraits.length < 3) {
        setSelectedTraits([...selectedTraits, trait]);
      } else {
        toast.warning("You can select up to 3 personality traits");
      }
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (selectedTraits.length === 0) {
      toast.error("Please select at least one personality trait");
      return;
    }

    // Create the new companion with form data
    addCompanion({
      name: values.name,
      personality: selectedTraits,
      mood: values.defaultMood as Mood,
      catchphrase: values.catchphrase,
      backstory: values.backstory,
    });

    toast.success(`${values.name} has been created and is ready to chat!`);
    
    // Close the modal
    setTimeout(onComplete, 500);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Give your friend a name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div>
          <FormLabel>Personality (select up to 3)</FormLabel>
          <div className="flex flex-wrap gap-2 mt-2">
            {personalityTraits.map(trait => (
              <Badge
                key={trait}
                variant={selectedTraits.includes(trait) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleTrait(trait)}
              >
                {trait}
              </Badge>
            ))}
          </div>
          {selectedTraits.length === 0 && (
            <p className="text-sm text-destructive mt-1">Please select at least one trait</p>
          )}
        </div>

        <FormField
          control={form.control}
          name="catchphrase"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catchphrase</FormLabel>
              <FormControl>
                <Input placeholder="A saying your friend often uses" {...field} />
              </FormControl>
              <FormDescription>
                This helps give your AI friend a unique voice.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="defaultMood"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Default Mood</FormLabel>
              <FormControl>
                <RadioGroup 
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-wrap gap-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="happy" />
                    </FormControl>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-companion-happy"></div>
                      <FormLabel>Happy</FormLabel>
                    </div>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="calm" />
                    </FormControl>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-companion-calm"></div>
                      <FormLabel>Calm</FormLabel>
                    </div>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="thoughtful" />
                    </FormControl>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-companion-thoughtful"></div>
                      <FormLabel>Thoughtful</FormLabel>
                    </div>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="excited" />
                    </FormControl>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-companion-excited"></div>
                      <FormLabel>Excited</FormLabel>
                    </div>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="neutral" />
                    </FormControl>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-companion-neutral"></div>
                      <FormLabel>Neutral</FormLabel>
                    </div>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="backstory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Backstory</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Share a bit about your friend's background and personality" 
                  {...field}
                  rows={4} 
                />
              </FormControl>
              <FormDescription>
                This gives your AI friend depth and character.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Create My Friend</Button>
      </form>
    </Form>
  );
};
