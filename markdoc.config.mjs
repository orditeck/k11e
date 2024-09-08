import { defineMarkdocConfig, nodes, component } from "@astrojs/markdoc/config";

export default defineMarkdocConfig({
  nodes: {
    document: {
      ...nodes.document, // Apply defaults for other options
      render: null, // default 'article'
    },
  },
  tags: {
    personality_advice: {
      render: component('./src/components/PersonalityAdviceClient.astro'),
    },
  },
});
