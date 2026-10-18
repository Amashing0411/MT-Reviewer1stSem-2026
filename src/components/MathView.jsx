import React, { useMemo } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

/**
 * Component to render LaTeX mathematics cleanly using KaTeX.
 * Supports block or inline display.
 */
export function MathView({ math, block = false, className = "" }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
        output: "htmlAndMathml",
      });
    } catch (e) {
      console.error("KaTeX error:", e);
      return math;
    }
  }, [math, block]);

  if (block) {
    return (
      <div 
        className={`my-3 p-4 bg-slate-50/90 border border-slate-200/90 rounded-2xl overflow-x-auto text-center font-serif text-slate-900 shadow-2xs ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span 
      className={`inline-math px-1 py-0.5 rounded text-slate-900 font-serif ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/**
 * Helper to parse inline markdown (bold **text**, italic *text*, backticks `code`, and newlines)
 */
function renderMarkdownChunk(textChunk, keyPrefix) {
  if (!textChunk) return null;

  // Split lines by newline
  const lines = textChunk.split("\n");

  return lines.map((line, lineIdx) => {
    // Regex for bold **...**, italic *...*, code `...`
    const mdRegex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
    const segments = [];
    let match;
    let last = 0;

    while ((match = mdRegex.exec(line)) !== null) {
      const start = match.index;
      if (start > last) {
        segments.push({ type: "plain", text: line.slice(last, start) });
      }

      const raw = match[0];
      if (raw.startsWith("**") && raw.endsWith("**")) {
        segments.push({ type: "bold", text: raw.slice(2, -2) });
      } else if (raw.startsWith("*") && raw.endsWith("*")) {
        segments.push({ type: "italic", text: raw.slice(1, -1) });
      } else if (raw.startsWith("`") && raw.endsWith("`")) {
        segments.push({ type: "code", text: raw.slice(1, -1) });
      }

      last = mdRegex.lastIndex;
    }

    if (last < line.length) {
      segments.push({ type: "plain", text: line.slice(last) });
    }

    const renderedLine = segments.map((seg, sIdx) => {
      const k = `${keyPrefix}-${lineIdx}-${sIdx}`;
      if (seg.type === "bold") {
        return <strong key={k} className="font-bold text-slate-900">{seg.text}</strong>;
      }
      if (seg.type === "italic") {
        return <em key={k} className="italic text-slate-800">{seg.text}</em>;
      }
      if (seg.type === "code") {
        return (
          <code key={k} className="px-1.5 py-0.5 mx-0.5 bg-slate-100 border border-slate-200 text-blue-800 text-[0.88em] font-mono rounded-md font-semibold">
            {seg.text}
          </code>
        );
      }
      return <span key={k}>{seg.text}</span>;
    });

    return (
      <React.Fragment key={`${keyPrefix}-line-${lineIdx}`}>
        {lineIdx > 0 && <br />}
        {renderedLine}
      </React.Fragment>
    );
  });
}

/**
 * Universal FormattedText component that seamlessly parses:
 * 1. KaTeX display math ($$block$$)
 * 2. KaTeX inline math ($inline$)
 * 3. Markdown bold (**bold**), italic (*italic*), code (`code`), and newlines
 */
export function FormattedText({ text, className = "" }) {
  if (!text) return null;

  const tokens = useMemo(() => {
    const list = [];
    // Match $$...$$ or $...$
    const regex = /(\$\$[\s\S]*?\$\$|\$[^$\n]+\$)/g;
    let match;
    let lastIdx = 0;

    while ((match = regex.exec(text)) !== null) {
      const start = match.index;
      if (start > lastIdx) {
        list.push({ type: "text", content: text.slice(lastIdx, start) });
      }

      const matchStr = match[0];
      if (matchStr.startsWith("$$") && matchStr.endsWith("$$")) {
        list.push({ type: "block", content: matchStr.slice(2, -2).trim() });
      } else if (matchStr.startsWith("$") && matchStr.endsWith("$")) {
        list.push({ type: "inline", content: matchStr.slice(1, -1).trim() });
      }

      lastIdx = regex.lastIndex;
    }

    if (lastIdx < text.length) {
      list.push({ type: "text", content: text.slice(lastIdx) });
    }

    return list;
  }, [text]);

  return (
    <span className={className}>
      {tokens.map((token, idx) => {
        if (token.type === "block") {
          return <MathView key={idx} math={token.content} block={true} />;
        }
        if (token.type === "inline") {
          return <MathView key={idx} math={token.content} block={false} />;
        }
        return renderMarkdownChunk(token.content, `chunk-${idx}`);
      })}
    </span>
  );
}
