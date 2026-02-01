"use client";

import { useState, useEffect } from "react";
import * as Tone from "tone";
import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ValentineProposal = () => {
  const [isYesClicked, setIsYesClicked] = useState(false);
  const [noButtonStyle, setNoButtonStyle] = useState<React.CSSProperties>({});
  const [isClient, setIsClient] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleYesClick = () => {
    setIsAnimating(true);
    if (typeof window !== "undefined") {
      const synth = new Tone.PolySynth(Tone.Synth).toDestination();
      const now = Tone.now();
      synth.triggerAttackRelease(["C4", "E4", "G4", "C5"], "8n", now);
      synth.triggerAttackRelease(["G4", "B4", "D5"], "8n", now + 0.2);
      synth.triggerAttackRelease(["C5", "E5", "G5", "C6"], "4n", now + 0.4);
    }
    setTimeout(() => {
      setIsYesClicked(true);
    }, 500);
  };

  const moveNoButton = () => {
    if (!isClient) return;
    const buttonWidth = 150;
    const buttonHeight = 60;
    const newX = Math.random() * (window.innerWidth - buttonWidth);
    const newY = Math.random() * (window.innerHeight - buttonHeight);
    
    setNoButtonStyle({
      position: 'fixed',
      left: `${newX}px`,
      top: `${newY}px`,
      transition: 'left 0.3s ease-out, top 0.3s ease-out',
    });
  };

  const hearts = isClient ? Array.from({ length: 20 }).map((_, i) => {
    const style = {
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      animationDelay: `${Math.random() * 2}s`,
      fontSize: `${Math.random() * 1.5 + 0.5}rem`,
    };
    return <Heart key={i} className="absolute text-primary animate-fall" style={style} fill="currentColor" />;
  }) : null;

  if (!isClient) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
            <Heart className="w-16 h-16 text-primary animate-pulse" />
        </div>
    );
  }

  if (isYesClicked) {
    return (
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center text-center overflow-hidden p-4">
        {hearts}
        <div className="z-10 bg-background/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg animate-in fade-in duration-1000 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary">
            I choose you 💞
          </h1>
          <p className="text-2xl md:text-3xl text-foreground">
            Today, and every chance I get
          </p>
          <p className="text-2xl md:text-3xl text-foreground flex items-center justify-center gap-2">
            I <Heart className="w-8 h-8 text-primary" fill="currentColor" /> you
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <div className="w-full max-w-lg mx-auto flex items-center justify-center mb-12">
        <Heart className="w-64 h-64 text-primary animate-pulse" fill="currentColor" />
      </div>
      <h1 className="text-5xl md:text-7xl font-bold font-headline text-primary mb-12">
        Can you be my Valentine?
      </h1>
      <div className="flex items-center gap-6">
        <Button
          onClick={handleYesClick}
          className={cn(
            "px-10 py-5 text-2xl z-10",
            isAnimating ? "animate-boop" : "animate-pulse"
          )}
          size="lg"
        >
          <Heart className="mr-2" fill="white" />
          Yes
        </Button>
        
        <Button
          style={noButtonStyle}
          onMouseEnter={moveNoButton}
          onClick={moveNoButton}
          className={cn("px-10 py-5 text-2xl", Object.keys(noButtonStyle).length === 0 ? "relative" : "")}
          variant="secondary"
          size="lg"
        >
          No
        </Button>
      </div>
    </div>
  );
};

export default ValentineProposal;
