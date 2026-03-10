import logger from '../utils/logger.js';
import { loadTemplates } from './TemplateService.js';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile';

// ── Phase 1 Research: 45 Core Principles (injected into every call) ──────────
const RESEARCH_PRINCIPLES = `
PROMPT ENGINEERING PRINCIPLES (Phase 1 Research):

CLARITY PRINCIPLES:
1. Always define a specific role for the AI ("You are a senior X expert...")
2. State the exact task with an action verb (Write, Analyze, Create, Build)
3. Never use vague words — replace "good" with measurable criteria
4. Break complex tasks into numbered steps
5. Define what success looks like before the task begins

STRUCTURE PRINCIPLES:
6. Use labeled sections: ROLE, TASK, REQUIREMENTS, CONSTRAINTS, OUTPUT FORMAT
7. Put the most important instruction first
8. Use bullet points for requirements, not paragraphs
9. Separate context from instructions clearly
10. Always end with the expected output format

SPECIFICITY PRINCIPLES:
11. Include at least one concrete example when possible
12. Define length/format requirements explicitly (e.g. "300 words", "5 bullet points")
13. Specify the target audience for the output
14. Include measurable quality criteria
15. State what to AVOID, not just what to do

CONTEXT PRINCIPLES:
16. Provide background that changes how the task should be approached
17. Include relevant constraints upfront, not at the end
18. Mention the final use case for the output
19. Specify tone (formal/casual/technical/friendly)
20. Include domain-specific terminology when relevant

COMPLETENESS PRINCIPLES:
21. Always include input description (what data/info is being worked with)
22. Always include output description (exactly what should be returned)
23. Define edge cases and how to handle them
24. Include a quality checklist at the end when appropriate
25. Specify what happens if information is missing or unclear

ADVANCED PRINCIPLES:
26. Do a private planning pass before writing the final prompt (domain, goal, audience, constraints)
27. Few-shot examples dramatically improve output quality
28. Negative examples (what NOT to do) are as powerful as positive ones
29. Iterative refinement: build in a self-review step
30. Role + Task + Format is the minimum viable prompt structure
`;

// ── Type-Specific Expert System Prompts ─────────────────────────────────────
const TYPE_SYSTEM_PROMPTS = {
  image: `You are an expert AI image prompt engineer specializing in Midjourney, DALL-E 3, and Stable Diffusion.

For image prompts, NEVER use ROLE/TASK/REQUIREMENTS format. Instead create a single flowing descriptive prompt following this structure:
[Main subject and action] + [Art style/medium] + [Lighting] + [Composition] + [Color palette] + [Mood/atmosphere] + [Technical quality tags]

Always end with technical parameters:
- For Midjourney: --ar 16:9 --q 2 --style raw
- For DALL-E: mention "photorealistic" or "digital art"
- Always include quality modifiers: 8k, hyperrealistic, highly detailed, professional photography

Reference artistic styles: cinematography, concept art, oil painting, watercolor, photography style etc.

Research-backed image prompt engineering:
- Midjourney v6 prompt structure: descriptive natural language, not keyword lists
- DALL-E 3 optimization: conversational, detailed descriptions work best
- Stable Diffusion: balance positive description with negative prompts when needed
- Lighting: golden hour, rim lighting, volumetric lighting, bokeh, depth of field, soft diffused, dramatic contrast
- Style references: trending on artstation, by greg rutkowski, cinematic, editorial photography, Unreal Engine 5
- Quality tags: 8k resolution, hyperrealistic, sharp focus, professional photography, masterpiece, award-winning`,

  code: `You are a senior software engineer and code reviewer with 15+ years experience.

For code prompts always include:
- Exact programming language and version (e.g., "Python 3.11", "TypeScript 5.0")
- Framework/library context (React, Django, FastAPI, etc.)
- Specific function signature, class structure, or API endpoint needed
- Example input → expected output with actual data
- Edge cases to handle (null values, empty arrays, invalid input)
- Error handling requirements (exceptions, error messages, fallback values)
- Performance considerations (time/space complexity, optimization hints)
- Security constraints if applicable (input validation, sanitization)

Use technical precision — no vague language. Include code examples in backticks where helpful. Specify testing approach.`,

  writing: `You are a senior content strategist and copywriter who has written for major publications.

For writing/content prompts always include:
- Specific target audience description (demographics, expertise level, pain points)
- Tone and voice guidelines (formal/casual/technical/playful/authoritative)
- Exact format (blog post, email, social thread, landing page, white paper)
- Word count or length constraints (e.g., "500-700 words", "3-5 minute read")
- SEO keywords to include naturally (if applicable)
- Key points to cover (bullet list of must-include information)
- What to avoid (jargon, passive voice, certain topics)
- Call to action (what should reader do next?)
- Brand voice examples (if available)`,

  research: `You are a research director and analyst with expertise in academic and market research.

For research prompts always include:
- Clear research question or hypothesis
- Scope boundaries (what to include AND explicitly exclude)
- Source preferences (peer-reviewed, recent data, specific domains)
- Output format (executive summary, detailed report, bullet points, comparison table)
- Depth level (surface overview vs deep dive with methodology)
- How to handle conflicting information or data gaps
- Bias awareness instructions (acknowledge limitations, diverse perspectives)
- Citation format if needed (APA, MLA, or informal)
- Timeline of research (historical context vs current state)`,

  planning: `You are a strategic planning consultant who has guided Fortune 500 companies.

For planning prompts always include:
- Clear goal definition with measurable success metrics
- Constraints (budget, timeline, resources, legal/ethical limits)
- Timeline and milestones (phases, deadlines, dependencies)
- Resource requirements (team, budget, tools, external help)
- Risk factors to consider and mitigation strategies
- Prioritization framework (RICE, MoSCoW, impact/effort matrix)
- What success looks like at each stage
- Deliverable format (Gantt chart, OKRs, roadmap document)`,

  agent: `You are an expert GPT/agent architect who designs custom AI assistants.

For agent/GPT prompts always include:
- Detailed persona and background (who they are, their expertise, speaking style)
- Exact capabilities and expertise areas (what they CAN do)
- Hard boundaries (what they must NEVER do or discuss)
- Tone and communication style (formal friend, sarcastic expert, empathetic counselor)
- Memory instructions (what to remember across conversations)
- At least 2 example user/assistant exchanges showing the dynamic
- Fallback behavior (what to do when confused or request is outside scope)
- Knowledge cutoff awareness (what they don't know about)`,

  automation: `You are an automation architect expert in n8n, Zapier, Make (Integromat), and similar tools.

For automation prompts always include:
- Trigger event description (what starts this workflow)
- Step-by-step workflow with exact tool/node names
- Conditional logic (if/then branches, filters)
- Error handling at each step (what to do when something fails)
- Data transformation steps (format conversion, field mapping)
- Output format and destination (where results go)
- Tools available (specific integrations: Slack, Airtable, Google Sheets, etc.)
- Testing and debugging approach`,

  auto: `You are the world's best prompt engineer with expertise across all domains.

First detect the intent from the user's request:
- If message contains: photo, image, picture, draw, generate image, artwork, illustration, portrait, landscape, design, visual, render, scene, concept art → use IMAGE prompt format
- If message contains: code, function, script, debug, build, develop, program, algorithm, API, class, refactor → use CODE prompt format
- If message contains: write, blog, article, email, content, copy, post → use WRITING prompt format
- If message contains: research, analyze data, summarize, study, investigate → use RESEARCH prompt format
- If message contains: plan, roadmap, strategy, organize, schedule → use PLANNING prompt format
- If message contains: agent, GPT, persona, assistant, chatbot → use AGENT prompt format
- If message contains: automate, workflow, n8n, zapier, integration → use AUTOMATION prompt format

Apply the appropriate format for the detected intent. If unclear, use standard ROLE/TASK/REQUIREMENTS structure.`,
};

const FEW_SHOTS = {
  generic: [
    `User request: "help me with a task"
Bad prompt: "Do this for me"
Expert prompt:
ROLE: You are a senior problem-solving assistant.
TASK: Clearly restate the task, identify missing information, and propose a concrete plan.
REQUIREMENTS:
- Ask for any critical missing context
- Break the work into clear, numbered steps
- Highlight risks and edge cases
OUTPUT FORMAT:
- Restated task
- Assumptions
- Step-by-step plan`,
  ],
  'email-writing': [
    `User request: "write an email"
Bad prompt: "Write me an email"
Expert prompt:
ROLE: You are a senior business communication expert.
TASK: Write a professional follow-up email.
REQUIREMENTS:
- Warm but concise tone (≤120 words)
- Clear ask + next step
- Subject line included
CONSTRAINTS:
- Avoid jargon and filler
OUTPUT FORMAT:
- Subject:
- Email body:`,
  ],
  'data-analysis': [
    `User request: "analyze my data"
Bad prompt: "Analyze this data and give insights"
Expert prompt:
ROLE: You are a senior data analyst.
TASK: Perform a comprehensive analysis of the provided dataset.
REQUIREMENTS:
- Summarize the dataset (rows/cols, types, missingness)
- Identify trends, outliers, and key drivers
- Provide 5 actionable insights with evidence
CONSTRAINTS:
- If data is missing, state assumptions explicitly
OUTPUT FORMAT:
- Executive summary (bullets)
- Key findings
- Recommended actions`,
  ],
  'code-generation': [
    `User request: "help me debug my code"
Bad prompt: "Fix my code"
Expert prompt:
ROLE: You are a senior software engineer and debugging specialist.
TASK: Diagnose the bug and propose a minimal, correct fix.
REQUIREMENTS:
- Ask for missing context (runtime, expected vs actual)
- Identify likely root cause(s)
- Provide a fix with explanation and a quick test plan
CONSTRAINTS:
- Do not guess APIs; be explicit about uncertainty
OUTPUT FORMAT:
- Diagnosis
- Fix (with code)
- Test plan`,
  ],
  'content-writing': [
    `User request: "write a blog post"
Bad prompt: "Write a blog about X"
Expert prompt:
ROLE: You are a senior content strategist and copywriter.
TASK: Write a blog post optimized for clarity and engagement.
REQUIREMENTS:
- Define target audience and reading level
- Include outline, headings, and approximate length
- Specify tone (e.g. friendly, expert, contrarian)
OUTPUT FORMAT:
- Prompt with ROLE, TASK, CONTEXT, OUTLINE, STYLE, OUTPUT FORMAT`,
  ],
  'customer-service': [
    `User request: "reply to this angry customer"
Bad prompt: "Answer this customer"
Expert prompt:
ROLE: You are a senior customer support specialist.
TASK: Draft a response that de-escalates the situation and offers a fair resolution.
REQUIREMENTS:
- Acknowledge emotions
- Take responsibility where appropriate
- Offer 2–3 concrete next steps
CONSTRAINTS:
- Do not promise anything that support agents cannot actually do
OUTPUT FORMAT:
- Response text
- Short rationale for tone/choices`,
  ],
  'research-summarization': [
    `User request: "summarize this research paper"
Bad prompt: "Summarize this"
Expert prompt:
ROLE: You are a senior research analyst.
TASK: Summarize the paper for a non-expert stakeholder.
REQUIREMENTS:
- One-paragraph plain-language summary
- 3–5 key findings
- 3 implications or recommendations
OUTPUT FORMAT:
- Plain summary
- Bullet list of key findings
- Bullet list of implications`,
  ],
  'teaching-explanation': [
    `User request: "explain X like I'm 5"
Bad prompt: "Explain X simply"
Expert prompt:
ROLE: You are an experienced teacher.
TASK: Explain the concept using analogies and step-by-step reasoning.
REQUIREMENTS:
- Start from what the learner already knows
- Use one central analogy throughout
- End with a quick check-for-understanding exercise
OUTPUT FORMAT:
- Explanation
- Analogy
- 3 self-check questions`,
  ],
  'product-management': [
    `User request: "prioritize my roadmap"
Bad prompt: "Help me with my roadmap"
Expert prompt:
ROLE: You are a senior product manager.
TASK: Help prioritize a product roadmap using a clear framework.
REQUIREMENTS:
- Ask for goals, constraints, and candidate items
- Apply a scoring/stack-ranking framework (e.g. RICE)
- Surface trade-offs and risks
OUTPUT FORMAT:
- Clarifying questions
- Prioritized list with scores
- Risks and recommendations`,
  ],
  'creative-brainstorming': [
    `User request: "give me ideas"
Bad prompt: "Give me some ideas"
Expert prompt:
ROLE: You are a creative director and ideation partner.
TASK: Generate a wide set of creative options, then narrow them down.
REQUIREMENTS:
- Start by clarifying constraints (budget, channel, audience)
- Generate at least 10 diverse ideas
- Highlight 3 best ideas with pros/cons
OUTPUT FORMAT:
- Clarifying questions
- Idea list
- Top 3 with pros/cons`,
  ],
  'social-media': [
    `User request: "write posts for social media"
Bad prompt: "Write social posts"
Expert prompt:
ROLE: You are a senior social media strategist.
TASK: Generate platform-specific posts optimized for engagement.
REQUIREMENTS:
- Ask which platforms and brand voice
- Include hooks, CTAs, and hashtags where appropriate
OUTPUT FORMAT:
- Platform-by-platform prompts with ROLE, TASK, CONTEXT, STYLE, OUTPUT FORMAT`,
  ],
};

function buildFewShotSection(detectedDomain) {
  const domainShots = (detectedDomain && FEW_SHOTS[detectedDomain]) || [];
  const genericShots = FEW_SHOTS.generic || [];
  const picked = [...genericShots, ...domainShots].slice(0, 3);
  if (!picked.length) return '';
  return `\n\nFEW-SHOT EXAMPLES (bad → expert prompt):\n\n${picked.join('\n\n---\n\n')}\n`;
}

// ── Domain Detection: maps user request keywords to template IDs ─────────────
const DOMAIN_KEYWORDS = {
  'code-generation': [
    'code', 'function', 'script', 'program', 'debug', 'refactor',
    'api', 'class', 'algorithm', 'implement', 'build', 'develop',
    'javascript', 'python', 'typescript', 'react', 'node', 'sql'
  ],
  'data-analysis': [
    'data', 'analyze', 'analysis', 'dataset', 'insight', 'chart',
    'graph', 'visualization', 'metric', 'report', 'statistics',
    'excel', 'csv', 'dashboard', 'trend', 'pattern'
  ],
  'content-writing': [
    'blog', 'article', 'post', 'write', 'content', 'landing page',
    'copywriting', 'seo', 'headline', 'introduction', 'guide',
    'tutorial', 'how to', 'listicle'
  ],
  'customer-service': [
    'customer', 'support', 'complaint', 'response', 'service',
    'ticket', 'escalation', 'refund', 'help', 'issue', 'problem',
    'client', 'user complaint'
  ],
  'email-writing': [
    'email', 'cold email', 'outreach', 'newsletter', 'campaign',
    'follow up', 'pitch', 'subject line', 'drip', 'sequence',
    'introduction email', 'sales email'
  ],
  'social-media': [
    'social media', 'instagram', 'twitter', 'linkedin', 'tiktok',
    'post', 'caption', 'hashtag', 'viral', 'engagement', 'thread',
    'tweet', 'reel', 'story'
  ],
  'research-summarization': [
    'research', 'summarize', 'summary', 'paper', 'report', 'article',
    'literature', 'review', 'findings', 'study', 'academic',
    'abstract', 'key points', 'takeaway'
  ],
  'teaching-explanation': [
    'explain', 'teach', 'tutorial', 'lesson', 'concept', 'understand',
    'learning', 'education', 'course', 'simple', 'beginner',
    'eli5', 'breakdown', 'guide me'
  ],
  'product-management': [
    'product', 'roadmap', 'feature', 'prioritize', 'user story',
    'backlog', 'sprint', 'mvp', 'launch', 'strategy', 'okr',
    'milestone', 'stakeholder', 'requirement'
  ],
  'creative-brainstorming': [
    'brainstorm', 'ideas', 'creative', 'concept', 'campaign',
    'innovate', 'generate ideas', 'think of', 'suggest', 'alternatives',
    'possibilities', 'options', 'what if'
  ],
};

// ── Detect best matching domain template ─────────────────────────────────────
function detectDomain(userRequest) {
  const lower = userRequest.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;

  for (const [domain, keywords] of Object.entries(DOMAIN_KEYWORDS)) {
    const score = keywords.filter(kw => lower.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = domain;
    }
  }

  return bestScore > 0 ? bestMatch : null;
}

// ── Detect prompt type from explicit mention or auto-detect ───────────────────
function detectPromptType(userRequest) {
  const lower = userRequest.toLowerCase();
  
  // Check for explicit PROMPT TYPE marker
  const typeMatch = userRequest.match(/PROMPT TYPE:\s*(\w+)/i);
  if (typeMatch) {
    const explicitType = typeMatch[1].toLowerCase();
    if (TYPE_SYSTEM_PROMPTS[explicitType]) {
      return explicitType;
    }
  }
  
  // Auto-detect based on keywords
  const IMAGE_KEYWORDS = ['photo', 'image', 'picture', 'draw', 'generate image', 'artwork', 'illustration', 'portrait', 'landscape', 'design', 'visual', 'render', 'scene', 'concept art'];
  const CODE_KEYWORDS = ['code', 'function', 'script', 'debug', 'build', 'develop', 'program', 'algorithm', 'api', 'class', 'refactor'];
  const WRITING_KEYWORDS = ['write', 'blog', 'article', 'email', 'content', 'copy', 'post'];
  const RESEARCH_KEYWORDS = ['research', 'analyze data', 'summarize', 'study', 'investigate'];
  const PLANNING_KEYWORDS = ['plan', 'roadmap', 'strategy', 'organize', 'schedule'];
  const AGENT_KEYWORDS = ['agent', 'gpt', 'persona', 'assistant', 'chatbot'];
  const AUTOMATION_KEYWORDS = ['automate', 'workflow', 'n8n', 'zapier', 'integration'];
  
  if (IMAGE_KEYWORDS.some(kw => lower.includes(kw))) return 'image';
  if (CODE_KEYWORDS.some(kw => lower.includes(kw))) return 'code';
  if (WRITING_KEYWORDS.some(kw => lower.includes(kw))) return 'writing';
  if (RESEARCH_KEYWORDS.some(kw => lower.includes(kw))) return 'research';
  if (PLANNING_KEYWORDS.some(kw => lower.includes(kw))) return 'planning';
  if (AGENT_KEYWORDS.some(kw => lower.includes(kw))) return 'agent';
  if (AUTOMATION_KEYWORDS.some(kw => lower.includes(kw))) return 'automation';
  
  return 'auto';
}

// ── Build system prompt with research + template context + type guidance ─────
function buildSystemPrompt(detectedDomain, detectedType = 'auto') {
  const templates = loadTemplates();
  const template = detectedDomain
    ? templates.find(t => t.id === detectedDomain)
    : null;

  // Get type-specific system prompt
  const typePrompt = TYPE_SYSTEM_PROMPTS[detectedType] || TYPE_SYSTEM_PROMPTS.auto;

  let systemPrompt = `You are the world's best prompt engineer — a senior expert with 15+ years crafting prompts that get exceptional results from any AI model.

When given a user's simple request, you transform it into a perfect, production-ready AI prompt. Your prompts consistently score 28-30/30 on quality metrics.

${typePrompt}

${RESEARCH_PRINCIPLES}

PRIVATE PLANNING (do NOT output this section):
- Identify the best-matching domain (if any)
- Identify the user's real goal (what success looks like)
- Identify the target audience for the final output
- Identify constraints, missing info, and risks
- Then write the final prompt

STRICT OUTPUT RULES:
- Output ONLY the prompt itself — no preamble, no "Here is your prompt:", no meta-commentary
- Be specific and measurable — no vague words without defining them
- Aim for 250-600 words depending on complexity
- The result must be immediately copy-pasteable into ChatGPT, Claude, Gemini, or any AI tool
- Apply ALL principles above — your output must score 28+ on quality`;

  systemPrompt += buildFewShotSection(detectedDomain);

  // Inject domain-specific template context if detected
  if (template) {
    systemPrompt += `\n\nDOMAIN CONTEXT (${template.name}):
You are generating a prompt for the "${template.name}" domain (${template.domain}).

`;

    if (template.proTips && template.proTips.length > 0) {
      systemPrompt += `EXPERT PRO TIPS FOR THIS DOMAIN:\n`;
      template.proTips.slice(0, 5).forEach((tip, i) => {
        systemPrompt += `${i + 1}. ${tip}\n`;
      });
    }

    if (template.qualityChecklist && template.qualityChecklist.length > 0) {
      systemPrompt += `\nQUALITY CHECKLIST FOR THIS DOMAIN:\n`;
      template.qualityChecklist.slice(0, 5).forEach((item, i) => {
        systemPrompt += `- ${item}\n`;
      });
    }

    if (template.mainTemplate) {
      systemPrompt += `\nEXPERT TEMPLATE STRUCTURE TO FOLLOW:\n${template.mainTemplate.slice(0, 800)}\n`;
    }
  }

  return systemPrompt;
}

// ── Main AI generation function ───────────────────────────────────────────────
export async function generateWithAI(userRequest) {
  const apiKey = process.env.GROQ_API_KEY;

  // Detect domain and prompt type from user request
  const detectedDomain = detectDomain(userRequest);
  const detectedType = detectPromptType(userRequest);
  
  if (detectedDomain) {
    logger.debug('Domain detected', { domain: detectedDomain });
  }
  if (detectedType !== 'auto') {
    logger.debug('Prompt type detected', { type: detectedType });
  }

  if (!apiKey) {
    logger.warn('GROQ_API_KEY not set — using fallback generation');
    return fallbackGenerate(userRequest, detectedDomain, detectedType);
  }

  try {
    const systemPrompt = buildSystemPrompt(detectedDomain, detectedType);

    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Transform this request into a perfect prompt: ${userRequest}` },
        ],
        temperature: 0.7,
        max_tokens: 1200,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `Groq API error ${res.status}`);
    }

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) throw new Error('Empty response from AI');

    logger.debug('AI prompt generated', {
      model: MODEL,
      tokens: data.usage?.total_tokens,
      domain: detectedDomain || 'generic',
      type: detectedType,
    });

    return {
      prompt: text,
      model: MODEL,
      source: 'groq',
      domain: detectedDomain,
      detectedType,
    };

  } catch (err) {
    logger.warn('AI generation failed, using fallback', { error: err.message });
    return fallbackGenerate(userRequest, detectedDomain, detectedType);
  }
}

// ── Fallback: research-backed offline generation ──────────────────────────────
function fallbackGenerate(userRequest, detectedDomain, detectedType = 'auto') {
  const templates = loadTemplates();
  const template = detectedDomain
    ? templates.find(t => t.id === detectedDomain)
    : null;

  // Use domain template structure if available
  if (template && template.mainTemplate) {
    const filled = template.mainTemplate
      .replace(/\[TASK\/GOAL\]/gi, userRequest)
      .replace(/\[YOUR TASK\]/gi, userRequest)
      .replace(/\[DESCRIBE YOUR TASK\]/gi, userRequest)
      .slice(0, 1500);

    return {
      prompt: filled,
      model: 'template',
      source: 'template',
      domain: detectedDomain,
      detectedType,
    };
  }

  // Generic research-backed fallback
  const prompt = `ROLE:
You are a world-class expert with deep knowledge relevant to the following task. Apply professional-grade precision, clarity, and domain expertise.

TASK:
${userRequest}

REQUIREMENTS:
- Provide a thorough, accurate, and well-structured response
- Be specific — use concrete examples, numbers, and measurable criteria
- Prioritise the most important information first
- Consider edge cases and common pitfalls proactively
- Ensure every output is immediately actionable

CONSTRAINTS:
- Do not make assumptions — if something is unclear, acknowledge it explicitly
- Be honest about uncertainty; never fabricate facts or statistics
- Keep the response focused and free of filler content
- Maintain a professional tone appropriate for the subject matter

CONTEXT:
Treat this as a high-stakes deliverable being reviewed by a senior expert. The output must meet production-ready standards.

OUTPUT FORMAT:
- Use clear headings and bullet points where appropriate
- Lead with the most critical information
- Include a brief action summary at the end
- Highlight any warnings, caveats, or important considerations

QUALITY STANDARD:
Every claim must be accurate. Every recommendation must be actionable. Every section must add value.`;

  return {
    prompt,
    model: 'fallback',
    source: 'template',
    domain: null,
    detectedType,
  };
}

