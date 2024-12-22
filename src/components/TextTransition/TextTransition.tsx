import { useEffect, useState } from "react";
import { default as TextTransitionLib, presets } from "react-text-transition";

import styles from "./TextTransition.module.scss";

export default function TextTransition({ lang }: { lang: "fr" | "en" }) {
  const [qualifierIndex, setQualifierIndex] = useState(0);
  const [titleIndex, setTitleIndex] = useState(0);

  const qualifiers = {
    en: [
      "competent",
      "innovative",
      "reliable",
      "skillful",
      "efficient",
      "excellent",
      "great",
      "proficient",
      "talented",
      "knowledgeable",
      "skilled",
    ],
    fr: [
      "compétent",
      "innovant",
      "fiable",
      "habile",
      "talentueux",
      "informé",
      "adroit",
      "efficace",
    ],
  };

  const titles = {
    en: [
      "solution architect",
      "technical architect",
      "technology analyst",
      "senior solution dev",
      "senior team lead",
      "senior developer",
    ],
    fr: [
      "architecte de solutions",
      "architecte technique",
      "analyste technologique",
      "développeur de solutions",
      "responsable d'équipe senior",
      "développeur senior",
    ],
  };

  useEffect(() => {
    const qualifierInterval = setInterval(() => {
      setQualifierIndex(
        (prevIndex) => (prevIndex + 1) % qualifiers[lang].length
      );
    }, 3000);

    const titleTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setTitleIndex((prevIndex) => (prevIndex + 1) % titles[lang].length);
      }, 5500);

      return () => {
        clearInterval(interval);
      };
    }, 2500);

    return () => {
      clearInterval(qualifierInterval);
      clearTimeout(titleTimer);
    };
  }, []);

  const qualifier = qualifiers[lang][qualifierIndex % qualifiers[lang].length];
  const title = titles[lang][titleIndex % titles[lang].length];
  const prefix = lang === "en" ? "your" : "";
  const word1 = lang === "en" ? qualifier : title;
  const word2 = lang === "en" ? title : qualifier;

  return (
    <section className={styles.textTransition}>
      {prefix}{" "}
      <TextTransitionLib springConfig={presets.slow} inline>
        {word1}
      </TextTransitionLib>{" "}
      <br />
      <TextTransitionLib springConfig={presets.stiff} inline>
        {word2}
      </TextTransitionLib>
    </section>
  );
}
