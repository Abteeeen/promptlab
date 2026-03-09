import { getTemplateById } from './TemplateService.js';

/**
 * Maps raw [BRACKET] names to typed form field definitions.
 * Each field: { name, label, type, placeholder, help, required, options? }
 */
const FIELD_DEFINITIONS = {
  'LANGUAGE': {
    label: 'Programming Language',
    type: 'select',
    help: 'Which language should the code be written in?',
    required: true,
    options: ['Python', 'JavaScript', 'TypeScript', 'Go', 'Rust', 'Java', 'C#', 'C++', 'Ruby', 'PHP', 'Other'],
  },
  'VERSION IF APPLICABLE': {
    label: 'Language Version',
    type: 'text',
    placeholder: 'e.g. Python 3.11, Node 20',
    help: 'Specify the version if it matters for your use case.',
    required: false,
  },
  'SPECIFIC_SKILL': {
    label: 'Specific Skill / Specialization',
    type: 'text',
    placeholder: 'e.g. data processing, REST APIs, system design',
    help: 'The developer\'s area of expertise to emphasize.',
    required: false,
  },
  'FUNCTION/CLASS/SCRIPT': {
    label: 'Type of Code',
    type: 'select',
    help: 'What kind of code do you need?',
    required: true,
    options: ['Function', 'Class', 'Script', 'Module', 'Component', 'API endpoint', 'CLI tool'],
  },
  'SPECIFIC_REQUIREMENT': {
    label: 'Task / Requirement',
    type: 'textarea',
    placeholder: 'e.g. reads a CSV file and returns summary statistics',
    help: 'Describe exactly what the code should do.',
    required: true,
  },
  'FRAMEWORK': {
    label: 'Framework',
    type: 'text',
    placeholder: 'e.g. FastAPI, React, Django, or "none"',
    help: 'Framework to use. Write "none" if not applicable.',
    required: false,
  },
  'DESCRIBE INPUT': {
    label: 'Input Description',
    type: 'text',
    placeholder: 'e.g. CSV file path (string)',
    help: 'What does the function/class receive as input?',
    required: true,
  },
  'DESCRIBE OUTPUT': {
    label: 'Output Description',
    type: 'text',
    placeholder: 'e.g. dictionary with statistics per column',
    help: 'What should the code return or produce?',
    required: true,
  },
  'LIST EDGE CASES': {
    label: 'Edge Cases to Handle',
    type: 'textarea',
    placeholder: 'e.g. empty input, missing values, invalid types',
    help: 'List any edge cases that must be handled correctly.',
    required: false,
  },
  'STYLE GUIDE': {
    label: 'Style Guide',
    type: 'select',
    help: 'Code style conventions to follow.',
    required: false,
    options: ['PEP 8 (Python)', 'Airbnb (JS)', 'Google', 'Standard', 'Default for language'],
  },
  'ANALYSIS TYPE': {
    label: 'Analysis Type',
    type: 'select',
    help: 'What kind of analysis should be performed?',
    required: true,
    options: ['Descriptive Statistics', 'Trend Analysis', 'Anomaly Detection', 'Correlation Analysis', 'Predictive Modeling', 'Segmentation', 'Customer Feedback', 'Other'],
  },
  'DATASET DESCRIPTION': {
    label: 'Dataset Description',
    type: 'textarea',
    placeholder: 'e.g. 10,000 rows of e-commerce transactions with columns: date, product, revenue, region',
    help: 'Describe your dataset — what it contains and its structure.',
    required: true,
  },
  'AUDIENCE': {
    label: 'Target Audience',
    type: 'text',
    placeholder: 'e.g. executive team, product managers, technical analysts',
    help: 'Who will read or use the output?',
    required: true,
  },
  'DESIRED OUTPUT': {
    label: 'Desired Output Format',
    type: 'select',
    help: 'How should the results be structured?',
    required: true,
    options: ['Executive Summary', 'Bullet Points', 'Structured Report', 'Narrative Explanation', 'Table / Spreadsheet', 'JSON / Data', 'Visual Description'],
  },
  'GOAL': {
    label: 'Goal',
    type: 'text',
    placeholder: 'e.g. increase open rates, announce product launch, re-engage customers',
    help: 'What is the primary objective of this communication?',
    required: true,
  },
  'TONE': {
    label: 'Tone',
    type: 'select',
    help: 'The writing tone for the output.',
    required: true,
    options: ['Professional', 'Friendly', 'Authoritative', 'Empathetic', 'Casual', 'Inspirational', 'Urgent'],
  },
  'TOPIC': {
    label: 'Topic / Subject',
    type: 'text',
    placeholder: 'e.g. AI in healthcare, remote work tips, product launch',
    help: 'Main topic or subject matter.',
    required: true,
  },
  'CONTENT TYPE': {
    label: 'Content Type',
    type: 'select',
    help: 'What kind of content should be created?',
    required: true,
    options: ['Blog Post', 'Landing Page', 'Product Description', 'Case Study', 'Newsletter', 'Social Post', 'Press Release', 'White Paper'],
  },
  'PLATFORM': {
    label: 'Platform',
    type: 'select',
    help: 'Where will this content be published?',
    required: true,
    options: ['Twitter / X', 'LinkedIn', 'Instagram', 'Facebook', 'TikTok', 'YouTube', 'General / Multiple'],
  },
  'PRODUCT OR SERVICE': {
    label: 'Product or Service',
    type: 'text',
    placeholder: 'e.g. SaaS analytics dashboard for e-commerce',
    help: 'What product or service are you promoting or discussing?',
    required: true,
  },
  'RESEARCH TOPIC': {
    label: 'Research Topic',
    type: 'text',
    placeholder: 'e.g. impact of remote work on productivity',
    help: 'The subject to research and summarize.',
    required: true,
  },
  'SOURCE MATERIAL': {
    label: 'Source Material / Papers',
    type: 'textarea',
    placeholder: 'Paste abstracts, titles, or key excerpts here',
    help: 'Content to be summarized. Paste text or describe the sources.',
    required: true,
  },
  'CONCEPT OR TOPIC': {
    label: 'Concept or Topic to Explain',
    type: 'text',
    placeholder: 'e.g. neural networks, compound interest, photosynthesis',
    help: 'What concept or skill should be taught or explained?',
    required: true,
  },
  'EXPERTISE LEVEL': {
    label: 'Learner\'s Expertise Level',
    type: 'select',
    help: 'The knowledge level of the intended audience.',
    required: true,
    options: ['Complete Beginner', 'Beginner', 'Intermediate', 'Advanced', 'Expert'],
  },
  'FEATURE OR PROBLEM': {
    label: 'Feature or Problem',
    type: 'textarea',
    placeholder: 'e.g. users can\'t find the search function — define the problem to solve',
    help: 'Describe the product feature to build or problem to solve.',
    required: true,
  },
  'USER SEGMENT': {
    label: 'User Segment',
    type: 'text',
    placeholder: 'e.g. enterprise SaaS buyers, early-stage startups',
    help: 'Who is the primary user or customer?',
    required: true,
  },
  'BRAINSTORM TOPIC': {
    label: 'Brainstorm Topic',
    type: 'text',
    placeholder: 'e.g. new revenue streams for a subscription SaaS',
    help: 'What should ideas be generated around?',
    required: true,
  },
  'CONSTRAINTS': {
    label: 'Constraints',
    type: 'textarea',
    placeholder: 'e.g. must work offline, budget under $10k, no new hires',
    help: 'Any constraints or boundaries to respect.',
    required: false,
  },
  'IF ANY': {
    label: 'Performance Requirements',
    type: 'text',
    placeholder: 'e.g. must respond in <200ms',
    help: 'Optional performance or SLA requirements.',
    required: false,
  },
};

// Fields shown in "quick" mode (5 most important per template)
const QUICK_FIELDS = {
  'code-generation':        ['LANGUAGE', 'FUNCTION/CLASS/SCRIPT', 'SPECIFIC_REQUIREMENT', 'DESCRIBE INPUT', 'DESCRIBE OUTPUT'],
  'data-analysis':          ['ANALYSIS TYPE', 'DATASET DESCRIPTION', 'AUDIENCE', 'DESIRED OUTPUT', 'GOAL'],
  'content-writing':        ['CONTENT TYPE', 'TOPIC', 'AUDIENCE', 'TONE', 'GOAL'],
  'customer-service':       ['PRODUCT OR SERVICE', 'GOAL', 'TONE', 'AUDIENCE', 'CONSTRAINTS'],
  'email-writing':          ['GOAL', 'AUDIENCE', 'TONE', 'PRODUCT OR SERVICE', 'CONSTRAINTS'],
  'social-media':           ['PLATFORM', 'TOPIC', 'TONE', 'AUDIENCE', 'GOAL'],
  'research-summarization': ['RESEARCH TOPIC', 'SOURCE MATERIAL', 'AUDIENCE', 'DESIRED OUTPUT', 'TONE'],
  'teaching-explanation':   ['CONCEPT OR TOPIC', 'EXPERTISE LEVEL', 'AUDIENCE', 'TONE', 'GOAL'],
  'product-management':     ['FEATURE OR PROBLEM', 'USER SEGMENT', 'GOAL', 'CONSTRAINTS', 'DESIRED OUTPUT'],
  'creative-brainstorming': ['BRAINSTORM TOPIC', 'GOAL', 'CONSTRAINTS', 'AUDIENCE', 'TONE'],
};

/**
 * Build form field definitions for a template.
 * mode: 'quick' | 'standard' | 'advanced'
 */
export function generateForm(templateId, mode = 'standard') {
  const template = getTemplateById(templateId);
  if (!template) return null;

  const bracketKeys = template.brackets;
  let fieldKeys = bracketKeys;

  if (mode === 'quick') {
    fieldKeys = QUICK_FIELDS[templateId] || bracketKeys.slice(0, 5);
  }

  const fields = fieldKeys.map((key) => {
    const def = FIELD_DEFINITIONS[key];
    if (def) {
      return { name: key, ...def };
    }
    // Generic fallback for unknown brackets
    return {
      name: key,
      label: key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      type: 'text',
      placeholder: `Enter ${key.toLowerCase()}`,
      help: '',
      required: false,
    };
  });

  return {
    templateId,
    mode,
    fields,
    proTips: mode === 'advanced' ? template.proTips : template.proTips.slice(0, 3),
  };
}
