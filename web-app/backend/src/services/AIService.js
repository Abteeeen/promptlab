import logger from '../utils/logger.js';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL    = 'llama-3.3-70b-versatile';

const SYSTEM_PROMPT = `You are the world's best prompt engineer — a senior expert with 15+ years crafting prompts that get exceptional results from any AI model.

When given a user's simple request, you transform it into a perfect, production-ready AI prompt. Your prompts consistently score 28-30/30 on quality metrics.

RULES:
- Output ONLY the prompt itself — no preamble, no "Here is your prompt:", no meta-commentary
- Always include: a clear role definition, a specific task, detailed requirements, constraints, and expected output format
- Use labeled sections (ROLE, TASK, REQUIREMENTS, CONSTRAINTS, OUTPUT FORMAT, EXAMPLE OUTPUT if needed)
- Be specific and measurable — avoid vague words like "good" or "detailed" without defining them
- Aim for 250-600 words depending on complexity
- The result must be immediately copy-pasteable into ChatGPT, Claude, Gemini, or any AI tool`;

/**
 * Call Groq API to generate an AI-enhanced prompt.
 * Falls back to template-based generation if API key is missing or call fails.
 */
export async function generateWithAI(userRequest) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    logger.warn('GROQ_API_KEY not set — using fallback generation');
    return fallbackGenerate(userRequest);
  }

  try {
    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user',   content: `User request: ${userRequest}` },
        ],
        temperature: 0.7,
        max_tokens:  1200,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `Groq API error ${res.status}`);
    }

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) throw new Error('Empty response from AI');

    logger.debug('AI prompt generated', { model: MODEL, tokens: data.usage?.total_tokens });
    return { prompt: text, model: MODEL, source: 'groq' };

  } catch (err) {
    logger.warn('AI generation failed, using fallback', { error: err.message });
    return fallbackGenerate(userRequest);
  }
}

/**
 * Fallback: build a structured prompt using our template patterns.
 * Works 100% offline — no API key needed.
 */
function fallbackGenerate(userRequest) {
  const prompt = `ROLE:
You are a world-class expert with deep knowledge and experience relevant to the following task. Approach this with precision, clarity, and professional-grade quality.

TASK:
${userRequest}

REQUIREMENTS:
- Provide a thorough, accurate, and well-structured response
- Be specific — avoid vague generalities; use concrete examples where possible
- Prioritise the most important information first
- Consider edge cases and common pitfalls
- Ensure the output is immediately actionable

CONSTRAINTS:
- Do not make assumptions — if something is unclear, acknowledge it
- Be honest about uncertainty; do not fabricate facts
- Keep the response focused and free of unnecessary filler

OUTPUT FORMAT:
- Use clear headings and bullet points where appropriate
- Include a brief summary at the end if the response is long
- Highlight the most critical points

QUALITY STANDARD:
Treat this as if a senior expert is reviewing your response. It must be production-ready.`;

  return { prompt, model: 'fallback', source: 'template' };
}
