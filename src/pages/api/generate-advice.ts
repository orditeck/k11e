export const prerender = false;
import type { APIRoute } from "astro";
import { ANTHROPIC_API_KEY } from "astro:env/server";
import Anthropic from "@anthropic-ai/sdk";

export const POST: APIRoute = async ({ request, locals, currentLocale }) => {
  const { ctx } = locals.runtime;
  const data = await request.json();
  const mbti = data.mbti;
  const enneagram = data.enneagram;
  const targetLanguage = data.lang === "fr" ? "French" : "English";

  if (!mbti || !enneagram) {
    return new Response(
      JSON.stringify({ message: "Missing required fields" }),
      { status: 400 }
    );
  }

  const client = new Anthropic({
    apiKey: ANTHROPIC_API_KEY,
    baseURL:
      "https://gateway.ai.cloudflare.com/v1/162a4eeed920163b4ecb731a360fda71/anthropic/anthropic",
  });

  try {
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const textEncoder = new TextEncoder();

    // Start the streaming process
    ctx.waitUntil(
      (async () => {
        try {
          const stream = client.messages.stream({
            model: "claude-3-5-sonnet-20240620",
            max_tokens: 800,
            system:
              "You are an expert in personality types and workplace dynamics.",
            messages: [
              {
                role: "user",
                content: `Generate advice in ${targetLanguage} for someone with MBTI ${mbti} and Enneagram ${enneagram} on how to work effectively with an ENTP (Myers-Briggs) and Type 7 (Enneagram) consultant named Keven. Make it brief, like brief but meaningful explanations.`,
              },
            ],
          });

          for await (const chunk of stream) {
            if (
              chunk.type === "content_block_delta" &&
              chunk.delta.type === "text_delta"
            ) {
              await writer.write(textEncoder.encode(chunk.delta.text));
            }
          }
        } catch (error) {
          console.error("Stream error:", error);
        } finally {
          await writer.close();
        }
      })()
    );

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to generate advice" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
