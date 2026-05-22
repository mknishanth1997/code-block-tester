"use client";

import { useEffect, useState } from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Check, Copy } from "lucide-react";

type CodeBlockProps = {
  language?: string;
  code?: string;
  linesToHighlight?: number[];
};

const HIGHLIGHTER_THEME = {
  custom: {
    margin: 0,
    padding: "1.5rem 0",
    background: "#111827",
    fontSize: "14px",
  },
  lineNumbers: {
    color: "#71717a",
    minWidth: "2.25rem",
    textAlign: "right" as const, // Fixed TypeScript type casting
    paddingRight: "1rem",
    userSelect: "none" as const,
  },
  WINDOW_DOTS: ["bg-red-500", "bg-yellow-500", "bg-green-500"],
};

// const WINDOW_DOTS = ["bg-red-500", "bg-yellow-500", "bg-green-500"];

export default function CodeBlock({
  language = "default",
  code = "",
  linesToHighlight = [0],
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  // Controls initial slide animation
  const [mounted, setMounted] = useState(false);

  // Controls code fade animation
  const [visibleCode, setVisibleCode] = useState(code);

  const [isChanging, setIsChanging] = useState(false);

  // INITIAL MOUNT ANIMATION
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  // CODE CHANGE ANIMATION
  useEffect(() => {
    if (code === visibleCode) return;

    setIsChanging(true);

    const fadeOutTimer = setTimeout(() => {
      setVisibleCode(code);

      setIsChanging(false);
    }, 120);

    return () => clearTimeout(fadeOutTimer);
  }, [code, visibleCode]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed", error);
    }
  }

  return (
    <div
      className={`w-full rounded-[28px] border border-zinc-700 bg-zinc-900 p-4 shadow-2xl transition-all duration-500 ease-out ${
        mounted ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
      }`}
    >
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between border-b border-zinc-700/60 pb-3">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          {/* WINDOW CONTROLS */}
          <div className="flex items-center gap-2">
            {HIGHLIGHTER_THEME.WINDOW_DOTS.map((color) => (
              <div key={color} className={`h-3 w-3 rounded-full ${color}`} />
            ))}
          </div>

          {/* FILE NAME */}
          <p className="text-sm text-zinc-400">{language}.example</p>
        </div>

        {/* COPY BUTTON */}
        <button
          onClick={handleCopy}
          className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </button>
      </div>

      {/* CODE SCREEN */}
      <div
        className="max-h-[280px] overflow-auto rounded-2xl border border-zinc-800 scrollbar-thin
scrollbar-thumb-zinc-700
scrollbar-track-transparent
hover:scrollbar-thumb-zinc-600"
      >
        <div
          className={`transition-all duration-200 ${
            isChanging ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
          }`}
        >
          <SyntaxHighlighter
            language={language}
            style={nightOwl}
            showLineNumbers
            wrapLines
            customStyle={HIGHLIGHTER_THEME.custom}
            lineNumberStyle={HIGHLIGHTER_THEME.lineNumbers}
            lineProps={(lineNumber) => {
              const isHighlighted = linesToHighlight.includes(lineNumber);

              return {
                style: {
                  display: "block",
                  width: "100%",
                  paddingLeft: "1.5rem",
                  paddingRight: "2rem",

                  backgroundColor: isHighlighted
                    ? "rgba(59, 130, 246, 0.10)"
                    : "transparent",

                  borderLeft: isHighlighted
                    ? "4px solid #3b82f6"
                    : "4px solid transparent",

                  transition:
                    "background-color 0.2s ease, border-color 0.2s ease",
                },
              };
            }}
          >
            {visibleCode}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
