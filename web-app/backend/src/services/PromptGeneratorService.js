import { getTemplateById } from './TemplateService.js';

/**
 * Replace [BRACKET] placeholders in a template string with form values.
 */
function fillBrackets(template, formData) {
  return template.replace(/\[([A-Z_/\s]+)\]/g, (match, key) => {
    const normalizedKey = key.trim();
    return formData[normalizedKey] || formData[normalizedKey.replace(/\s/g, '_')] || match;
  });
}

/**
 * Generate variation 2: adds "Be thorough and include examples." prefix block.
 */
function makeDetailedVariation(base) {
  return `${base}\n\nAdditional instruction: Be thorough, include concrete examples where helpful, and explain your reasoning step by step.`;
}

/**
 * Generate variation 3: restructures with a different opening.
 */
function makeAlternativeVariation(base) {
  // Swap the role statement to be more direct
  return base
    .replace(/^You are (.+?)\.\n/m, 'Act as $1.\n')
    .replace(/^TASK:/m, 'YOUR OBJECTIVE:');
}

/**
 * Generate a prompt from a template + user form data.
 * Returns 3 variations: direct, detailed, and alternative.
 */
export function generatePrompt(templateId, formData, options = {}) {
  const template = getTemplateById(templateId);
  if (!template) return null;

  const sourceTemplate = options.mode === 'quick'
    ? template.quickTemplate || template.mainTemplate
    : template.mainTemplate;

  const base = fillBrackets(sourceTemplate, formData);

  // Apply tone/depth options if provided
  let v1 = base;
  if (options.tone) {
    v1 = `Tone: ${options.tone}.\n\n${v1}`;
  }
  if (options.audience && options.audience !== formData['AUDIENCE']) {
    v1 = `Target audience: ${options.audience}.\n\n${v1}`;
  }

  const variations = [
    { label: 'Direct',       text: v1.trim() },
    { label: 'Detailed',     text: makeDetailedVariation(v1).trim() },
    { label: 'Alternative',  text: makeAlternativeVariation(v1).trim() },
  ];

  return {
    templateId,
    templateName: template.name,
    formData,
    variations,
    // Return the "direct" variation as the primary prompt
    prompt: variations[0].text,
  };
}
