// src/components/PersonalityAdvice.tsx
import React, { useState, useEffect, useRef } from "react";
import Markdoc from "@markdoc/markdoc";
import { useTranslations } from "../../i18n/utils";
import { enneagramTypes, mbtiTypes } from "./types";

interface FormData {
  mbti: string;
  enneagram: string;
}

export default function PersonalityAdvice({ lang }: { lang: "fr" | "en" }) {
  const [advice, setAdvice] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const adviceRef = useRef<string>("");
  const t = useTranslations(lang);

  useEffect(() => {
    return () => {
      adviceRef.current = "";
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const mbti = formData.get("mbti") as string;
    const enneagram = formData.get("enneagram") as string;

    setIsLoading(true);
    setAdvice("");
    adviceRef.current = "";

    try {
      const response = await fetch("/api/generate-advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mbti, enneagram, lang } as FormData),
      });

      if (!response.ok) throw new Error("Failed to generate advice");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = (await reader?.read()) || {
          done: true,
          value: undefined,
        };
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        adviceRef.current += chunk;
        setAdvice(adviceRef.current);
      }
    } catch (error) {
      setAdvice("Error generating advice. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderMarkdown = (content: string) => {
    const ast = Markdoc.parse(content);
    const rendered = Markdoc.transform(ast);
    return Markdoc.renderers.react(rendered, React);
  };

  return (
    <article id="personality-advice">
      <h2>{t("personalityAdvice.heading")}</h2>
      <p className="intro-text">{t("personalityAdvice.content")}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="mbti">
          {t("personalityAdvice.mbti")}
          <select id="mbti" name="mbti" required>
            <option value="">{t("personalityAdvice.selectType")}</option>
            {mbtiTypes[lang].map((type) => (
              <option key={type.code} value={type.code}>
                {type.code}: {type.name}
              </option>
            ))}
          </select>
          <small style={{ display: "block" }}>
            {t("personalityAdvice.dontKnowType")}{" "}
            <a
              href={t("personalityAdvice.mtbiTestLink")}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("personalityAdvice.takeTest")}
            </a>
          </small>
        </label>

        <label htmlFor="enneagram">
          {t("personalityAdvice.enneagram")}
          <select id="enneagram" name="enneagram" required>
            <option value="">{t("personalityAdvice.selectType")}</option>
            {enneagramTypes[lang].map((type) => (
              <option key={type.type} value={type.type}>
                Type {type.type}: {type.name}
              </option>
            ))}
          </select>
          <small style={{ display: "block" }}>
            {t("personalityAdvice.notSure")}{" "}
            <a
              href={t("personalityAdvice.enneagramTestLink")}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("personalityAdvice.discover")}
            </a>
          </small>
        </label>

        <button type="submit" disabled={isLoading}>
          {isLoading
            ? t("personalityAdvice.generating")
            : t("personalityAdvice.getAdvice")}
        </button>
      </form>
      <div id="advice-result" aria-live="polite">
        {advice && renderMarkdown(advice)}
      </div>
    </article>
  );
}
