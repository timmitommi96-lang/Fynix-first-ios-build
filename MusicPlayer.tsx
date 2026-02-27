import { useEffect, useRef } from 'react';
import { useApp } from './AppContext';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { preferences } = useApp();

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/fynix_intro_loop.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    const audio = audioRef.current;

    const playAudio = () => {
      if (preferences.musicEnabled) {
        audio.play().catch((err) => {
          console.log("Autoplay blocked, waiting for interaction", err);
        });
      }
    };

    if (preferences.musicEnabled) {
      playAudio();

      // Add global listener to bypass autoplay restrictions on first interaction
      const handleInteraction = () => {
        if (preferences.musicEnabled && audio.paused) {
          audio.play().catch(() => { });
        }
        window.removeEventListener('click', handleInteraction);
        window.removeEventListener('touchstart', handleInteraction);
      };

      window.addEventListener('click', handleInteraction);
      window.addEventListener('touchstart', handleInteraction);

      return () => {
        audio.pause();
        window.removeEventListener('click', handleInteraction);
        window.removeEventListener('touchstart', handleInteraction);
      };
    } else {
      audio.pause();
    }
  }, [preferences.musicEnabled]);

  return null;
}
