"use client";
import Image from "next/image";
import CodeBlock from "./CodeBlock";
import { useState } from "react";
import Display from "./DisplayProps";

export default function Home() {
  const [lH, setlH] = useState([1, 2, 3]);
  const [mobileTab, setMobileTab] = useState<"html" | "css" | "preview">(
    "preview",
  );
  const [code, setCode] = useState(`.parent > p {
  color: red;
  border: 1px solid red;
}
  .parent > p {
  color: red;
  border: 1px solid red ;
}
  .parent > p {
  color: red;
  border: 1px solid red;
}`);
  return (
    <div className="bg-black  min-h-screen py-10 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <CodeBlock
          language="css"
          code={code}
          linesToHighlight={[1, 2, 3]}
          filename="styles/buttons.css"
        />
        <CodeBlock
          language="css"
          code={code}
          linesToHighlight={lH}
          filename="styles/cards.css"
        />
        <CodeBlock
          language="css"
          code={code}
          highlightLines={lH}
          filename="styles/layout.css"
        />
        <CodeBlock
          language="css"
          code={code}
          highlightLines={lH}
          filename="styles/animations.css"
        />
      </div>
    </div>
  );
}
