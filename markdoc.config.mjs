import { defineMarkdocConfig, nodes, component } from "@astrojs/markdoc/config";
import markdoc from "@markdoc/markdoc";
const { Tag } = markdoc;

export default defineMarkdocConfig({
  nodes: {
    document: {
      ...nodes.document, // Apply defaults for other options
      render: null, // default 'article'
    },
    heading: {
      ...nodes.heading,
      render: component("./src/components/markdoc/SectionTitle.astro"),
      attributes: {
        ...nodes.heading.attributes,
        title: {
          type: String,
        },
        underline: {
          type: String,
        },
        subtitle: {
          type: String,
        },
        classes: {
          type: Array,
        },
      },
    },
  },
  tags: {
    section_title: {
      render: component("./src/components/markdoc/SectionTitle.astro"),
      attributes: {
        title: {
          type: String,
          required: true,
        },
        underline: {
          type: String,
          required: true,
        },
        subtitle: {
          type: String,
          default: null,
        },
      },
    },
    personality_advice: {
      render: component(
        "./src/components/markdoc/PersonalityAdviceClient.astro",
      ),
    },
    accordions: {
      render: component("./src/components/markdoc/Accordions.astro"),
      transform: (node, config) => {
        const attributes = node.transformAttributes(config);
        const children = node.transformChildren(config);

        for (const child of children) {
          child.attributes.first = children.indexOf(child) === 0;
          child.attributes.last =
            children.indexOf(child) === children.length - 1;
        }

        return new Tag(
          "div",
          { "data-accordion": true, ...attributes },
          children,
        );
      },
    },
    accordion: {
      render: component("./src/components/markdoc/Accordion.astro"),
      attributes: {
        title: {
          type: String,
          required: true,
        },
        expanded: {
          type: Boolean,
          default: false,
        },
        first: {
          type: Boolean,
          default: false,
        },
        last: {
          type: Boolean,
          default: false,
        },
      },
    },
    timeline: {
      render: component("./src/components/markdoc/Timeline.astro"),
    },
  },
});
