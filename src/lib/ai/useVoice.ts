"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export type VoiceState = "idle" | "listening" | "thinking" | "speaking";

interface UseVoiceOptions {
  onTranscriptReady?: (transcript: string) => void;
  onSpeechEnd?: () => void;
}

export function useGitaVoice(options?: UseVoiceOptions) {
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [transcript, setTranscript] = useState("");
  const [speakingText, setSpeakingText] = useState("");
  const [isSupported, setIsSupported] = useState(false);
  const [hasMicPermission, setHasMicPermission] = useState<boolean | null>(null);
  const [micError, setMicError] = useState<string | null>(null);
  const [audioLevel, setAudioLevel] = useState(0); // 0 to 1 for avatar lip-sync

  const recognitionRef = useRef<any>(null);
  const isListeningRef = useRef(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  // Initialize Speech Recognition & Synthesis ON MOUNT ONLY
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Setup Speech Synthesis
    if ("speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }

    // 2. Setup Speech Recognition
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      setIsSupported(true);
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-IN";

        recognition.onstart = () => {
          isListeningRef.current = true;
          setVoiceState("listening");
          setMicError(null);
          setHasMicPermission(true);
        };

        recognition.onresult = (event: any) => {
          let interim = "";
          let final = "";

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const piece = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              final += piece;
            } else {
              interim += piece;
            }
          }

          const currentText = final || interim;
          setTranscript(currentText);
          setAudioLevel(0.4 + Math.random() * 0.4);

          if (final.trim().length > 0) {
            setVoiceState("thinking");
            setAudioLevel(0);
            if (optionsRef.current?.onTranscriptReady) {
              optionsRef.current.onTranscriptReady(final.trim());
            }
          }
        };

        recognition.onerror = (event: any) => {
          console.warn("[voice] Recognition error:", event.error);
          if (event.error === "not-allowed" || event.error === "permission-denied") {
            setMicError("BLOCKED");
            setHasMicPermission(false);
          } else if (event.error !== "no-speech") {
            setMicError(`Mic notice: ${event.error}`);
          }
          isListeningRef.current = false;
          setVoiceState("idle");
          setAudioLevel(0);
        };

        recognition.onend = () => {
          isListeningRef.current = false;
          setAudioLevel(0);
          setVoiceState((prev) => (prev === "listening" ? "idle" : prev));
        };

        recognitionRef.current = recognition;
      } catch (err) {
        console.warn("[voice] Recognition init failed:", err);
      }
    } else {
      setIsSupported(false);
      setMicError("Speech recognition is not supported in this browser. You can type and Gita will speak!");
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (synthRef.current) {
        try {
          synthRef.current.cancel();
        } catch {}
      }
      if (recognitionRef.current && isListeningRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
    };
  }, []);

  /**
   * Explicitly triggers the browser's native microphone permission popup via getUserMedia.
   */
  const requestMicPermission = useCallback(async (): Promise<boolean> => {
    if (typeof navigator !== "undefined" && navigator.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Permission granted! Stop the temporary tracks immediately
        stream.getTracks().forEach((track) => track.stop());
        setMicError(null);
        setHasMicPermission(true);
        return true;
      } catch (err: any) {
        console.warn("[voice] getUserMedia error:", err);
        setMicError("BLOCKED");
        setHasMicPermission(false);
        return false;
      }
    }
    return false;
  }, []);

  // Start listening to user voice
  const startListening = useCallback(async () => {
    if (!recognitionRef.current) return;

    // Ensure we trigger the native mic permission popup if not yet granted
    if (hasMicPermission !== true) {
      const granted = await requestMicPermission();
      if (!granted) return;
    }

    try {
      if (synthRef.current && synthRef.current.speaking) {
        synthRef.current.cancel();
      }
      setTranscript("");
      setMicError(null);
      if (!isListeningRef.current) {
        recognitionRef.current.start();
      }
    } catch (e: any) {
      if (e.name !== "InvalidStateError") {
        console.warn("[voice] Could not start recognition:", e);
      }
    }
  }, [hasMicPermission, requestMicPermission]);

  // Stop listening
  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      isListeningRef.current = false;
      recognitionRef.current.stop();
      setVoiceState("idle");
      setAudioLevel(0);
    } catch {}
  }, []);

  // Speak text using SpeechSynthesis with lip-sync animation
  const speak = useCallback((textToSpeak: string, onEndCallback?: () => void) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      if (onEndCallback) onEndCallback();
      return;
    }

    try {
      const synth = window.speechSynthesis;
      if (synth.paused) {
        synth.resume();
      }
      synth.cancel();

      const cleanText = textToSpeak
        .replace(/[*_~`#]/g, "")
        .replace(/https?:\/\/\S+/g, "link")
        .replace(/[•\->]/g, "")
        .trim();

      if (!cleanText) {
        if (onEndCallback) onEndCallback();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      const voices = synth.getVoices();

      const preferred =
        voices.find(
          (v) =>
            v.lang === "en-IN" ||
            v.name.includes("India") ||
            v.name.includes("Zira") ||
            v.name.includes("Samantha") ||
            v.name.includes("Karen") ||
            v.name.includes("Google UK English Female")
        ) ||
        voices.find((v) => v.lang.startsWith("en")) ||
        voices[0];

      if (preferred) {
        utterance.voice = preferred;
      }

      utterance.rate = 1.02;
      utterance.pitch = 1.05;

      utterance.onstart = () => {
        setVoiceState("speaking");
        setSpeakingText(textToSpeak);

        let step = 0;
        const animateMouth = () => {
          step += 0.22;
          const level = Math.abs(Math.sin(step) * 0.75 + Math.sin(step * 2.1) * 0.25);
          setAudioLevel(level);

          if (synth.speaking) {
            animFrameRef.current = requestAnimationFrame(animateMouth);
          } else {
            setAudioLevel(0);
          }
        };
        animFrameRef.current = requestAnimationFrame(animateMouth);
      };

      utterance.onend = () => {
        setVoiceState("idle");
        setAudioLevel(0);
        setSpeakingText("");
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        if (onEndCallback) onEndCallback();
        if (optionsRef.current?.onSpeechEnd) optionsRef.current.onSpeechEnd();
      };

      utterance.onerror = (e) => {
        console.warn("[voice] Speech synthesis error:", e);
        setVoiceState("idle");
        setAudioLevel(0);
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      };

      synth.speak(utterance);
    } catch (e) {
      console.warn("[voice] Speak exception:", e);
      setVoiceState("idle");
      if (onEndCallback) onEndCallback();
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
      setVoiceState("idle");
      setAudioLevel(0);
      setSpeakingText("");
    }
  }, []);

  return {
    voiceState,
    transcript,
    speakingText,
    isSupported,
    hasMicPermission,
    micError,
    audioLevel,
    requestMicPermission,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  };
}
