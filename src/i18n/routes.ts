export type Route = {
  [key: string]: {
    [route: string]: string;
  };
};

export const routes: Route = {
  en: {
    "about-me": "about-me",
    "contact": "contact",
    services: "services",
    "services/custom-web-development": "services/custom-web-development",
    "services/technical-mentorship-for-developers": "services/technical-mentorship-for-developers",
    "services/technology-strategy-and-innovation": "services/technology-strategy-and-innovation",
  },
  fr: {
    "about-me": "a-propos",
    "contact": "contact",
    services: "services",
    "services/custom-web-development": "services/developpement-web-sur-mesure",
    "services/technical-mentorship-for-developers": "services/mentorat-technique-pour-developpeurs",
    "services/technology-strategy-and-innovation": "services/strategie-technologique-et-innovation",
  },
};
