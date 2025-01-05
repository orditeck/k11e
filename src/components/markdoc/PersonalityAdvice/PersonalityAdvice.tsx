import React, { useState, useEffect, useRef } from "react";
import Markdoc from "@markdoc/markdoc";
import { useTranslations } from "../../../i18n/utils";
import { enneagramTypes, mbtiTypes } from "./types";
import classNames from "classnames";

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
    <div
      id="personality-advice"
      className={classNames(
        "bg-slate-100",
        "p-10",
        "rounded-xl",
        "dark:bg-gray-800",
      )}
    >
      <h2>{t("personalityAdvice.heading")}</h2>
      <p>{t("personalityAdvice.content")}</p>
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="mbti"
          className={classNames(
            "mb-4",
            "block",
            "text-sm",
            "font-medium",
            "text-gray-900",
            "dark:text-white",
          )}
        >
          {t("personalityAdvice.mbti")}
          <select
            id="mbti"
            name="mbti"
            required
            className={classNames(
              "block",
              "w-full",
              "rounded-lg",
              "border",
              "border-gray-300",
              "bg-gray-50",
              "p-2.5",
              "text-sm",
              "text-gray-900",
              "focus:border-blue-500",
              "focus:ring-blue-500",
              "dark:border-gray-600",
              "dark:bg-gray-700",
              "dark:text-white",
              "dark:placeholder-gray-400",
              "dark:focus:border-blue-500",
              "dark:focus:ring-blue-500",
            )}
          >
            <option value="">{t("personalityAdvice.selectType")}</option>
            {mbtiTypes[lang].map((type) => (
              <option key={type.code} value={type.code}>
                {type.code}: {type.name}
              </option>
            ))}
          </select>
          <small className={classNames("block", "font-normal")}>
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

        <label
          htmlFor="enneagram"
          className={classNames(
            "mb-4",
            "block",
            "text-sm",
            "font-medium",
            "text-gray-900",
            "dark:text-white",
          )}
        >
          {t("personalityAdvice.enneagram")}
          <select
            id="enneagram"
            name="enneagram"
            required
            className={classNames(
              "block",
              "w-full",
              "rounded-lg",
              "border",
              "border-gray-300",
              "bg-gray-50",
              "p-2.5",
              "text-sm",
              "text-gray-900",
              "focus:border-blue-500",
              "focus:ring-blue-500",
              "dark:border-gray-600",
              "dark:bg-gray-700",
              "dark:text-white",
              "dark:placeholder-gray-400",
              "dark:focus:border-blue-500",
              "dark:focus:ring-blue-500",
            )}
          >
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

        <button
          type="submit"
          disabled={isLoading}
          className={classNames(
            "mb-2",
            "me-2",
            "rounded-lg",
            "bg-blue-700",
            "px-5",
            "py-2.5",
            "text-sm",
            "font-medium",
            "text-white",
            "hover:bg-blue-800",
            "focus:outline-none",
            "focus:ring-4",
            "focus:ring-blue-300",
            "dark:bg-blue-600",
            "dark:hover:bg-blue-700",
            "dark:focus:ring-blue-800",
          )}
        >
          {isLoading
            ? t("personalityAdvice.generating")
            : t("personalityAdvice.getAdvice")}
        </button>
      </form>
      <div id="advice-result" aria-live="polite">
        {advice && renderMarkdown(advice)}
      </div>
    </div>
  );
}
