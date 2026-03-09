# 🎨 PROMPT ENGINEERING PATTERN CATALOG

**Purpose**: Collection of proven prompt patterns with templates, examples, and effectiveness ratings.

**How to Use**: Copy pattern template, fill in [bracketed] sections, test and refine.

---

## PATTERN FAMILY 1: ROLE-PLAYING 
**Effectiveness**: ⭐⭐⭐⭐⭐ (Highest impact for tone/expertise)
**Best For**: Getting specific voice, expertise, perspective

### Pattern 1.1: Expert Role
**Template**:
```
You are a [EXPERTISE] expert with [X YEARS] years of experience.
Your expertise includes: [KEY SKILLS].
When answering, use your [EXPERTISE] knowledge to [SPECIFIC GOAL].
Assume the reader has [READER EXPERTISE LEVEL].
```

**Example**:
```
You are a machine learning engineer with 8 years of experience.
Your expertise includes: Python, TensorFlow, model optimization, and production MLOps.
When answering, use your ML engineering knowledge to explain concepts clearly.
Assume the reader has basic programming knowledge but no ML experience.
```

**When It Works**: 
- Explaining technical concepts
- Getting practical advice vs theoretical
- Ensuring appropriate depth

**Common Mistakes**:
- ❌ Being too vague about expertise ("expert" not enough)
- ❌ Not specifying reader expertise level
- ❌ Over-specializing (too narrow role)

### Pattern 1.2: Character Role
**Template**:
```
You are [CHARACTER NAME], a [CHARACTER TYPE].
Your personality: [PERSONALITY TRAITS].
Your background: [RELEVANT BACKGROUND].
Speaking style: [HOW YOU TALK].
Your goal in this conversation: [WHAT YOU'RE TRYING TO DO].
```

**Example**:
```
You are Sarah, a burned-out startup founder.
Your personality: Cynical, wise, humorous, brutally honest.
Your background: Built 3 startups, 2 failed, 1 sold for $20M.
Speaking style: Conversational, uses relevant anecdotes, avoids corporate jargon.
Your goal: Give real talk to someone thinking about starting a company.
```

**When It Works**:
- Creative writing
- Getting alternative perspectives  
- More engaging conversations
- Brainstorming

### Pattern 1.3: Perspective Shift
**Template**:
```
Respond from the perspective of a [PERSPECTIVE].
Consider: [KEY FACTORS FROM THIS PERSPECTIVE].
Avoid: [WHAT NOT TO INCLUDE].
Your response should highlight: [WHAT MATTERS MOST FROM THIS VIEW].
```

**Example**:
```
Respond from the perspective of a venture capital investor.
Consider: Market size, growth potential, defensibility, team quality.
Avoid: Philosophical or ethical arguments (though mention if relevant).
Your response should highlight: Why this business could generate 10x returns.
```

**When It Works**:
- Understanding different viewpoints
- De-biasing analysis
- Stakeholder consideration

---

## PATTERN FAMILY 2: FEW-SHOT LEARNING
**Effectiveness**: ⭐⭐⭐⭐ (50-80% accuracy improvement)
**Best For**: Teaching patterns through examples

### Pattern 2.1: Basic Few-Shot
**Template**:
```
I'll give you examples of [TASK]. Learn the pattern, then apply it.

Example 1:
INPUT: [Input example]
OUTPUT: [Expected output]
REASONING: [Why this is the right answer]

Example 2:
INPUT: [Input example]
OUTPUT: [Expected output]
REASONING: [Why this is the right answer]

Now apply this pattern to:
INPUT: [New input to classify/process]
OUTPUT: [Your answer here]
```

**Example** (Classification):
```
I'll give you examples of sentiment. Classify new text as positive, negative, or neutral.

Example 1:
INPUT: "This movie was amazing! One of the best I've ever seen."
OUTPUT: positive
REASONING: Words like "amazing" and "best" indicate strong positive sentiment.

Example 2:
INPUT: "The food was okay. Nothing special, but not bad either."
OUTPUT: neutral
REASONING: Mixed/ambiguous language indicates neither positive nor negative.

Now classify:
INPUT: "I waited 45 minutes for cold food. Terrible service."
OUTPUT: [Your answer]
```

**When It Works**:
- Classification tasks
- Format learning
- Pattern recognition

**Effectiveness Tips**:
- 3 examples better than 1, but 5+ has diminishing returns
- First example: Simplest case
- Second example: Add complexity
- Third example: Edge case or difficult example

### Pattern 2.2: Few-Shot with Explanations
**Template**:
```
[Task description]

Example 1:
PROMPT: [Input]
OUTPUT: [Expected output]
EXPLANATION: [Detailed explanation of approach]

Example 2:
PROMPT: [Input]
OUTPUT: [Expected output]
EXPLANATION: [Detailed explanation of approach]

Your turn:
PROMPT: [New task]
EXPLANATION: First, I'll... [Guide the model's thinking]
```

**Example** (Writing):
```
Rewrite sentences to be more concise without losing meaning.

Example 1:
ORIGINAL: "The fact of the matter is that when you consider the implementation of new management strategies, you must take into account the perspective of your employees."
CONCISE: "Employees' perspectives matter when implementing new management strategies."
EXPLANATION: Removed filler phrases ("The fact of the matter is", "when you consider"), restructured to active voice, condensed ideas.

Your turn:
ORIGINAL: "Due to the nature of the circumstances and the fact that funding has become increasingly unavailable, we have made the difficult decision to postpone the launch of our product."
CONCISE: [Your rewrite]
```

### Pattern 2.3: Contrastive Few-Shot (Good vs Bad)
**Template**:
```
I want you to [TASK]. Here are examples of what works and what doesn't.

GOOD EXAMPLE:
[Example of desired output]
WHY: [Why this is good]

BAD EXAMPLE:
[Example of undesired output]
WHY: [Why this is bad]

Now: [New task applying these lessons]
```

**Example** (Blog Headlines):
```
Write compelling blog headlines for a technical audience.

GOOD EXAMPLE:
"How We Reduced Database Latency by 60% Through Query Optimization"
WHY: Specific, promising concrete results, shows value to technical readers.

BAD EXAMPLE:
"Amazing Database Tips You Won't Believe!"
WHY: Vague, clickbait tone (not credible for technical audience), no substance.

GOOD EXAMPLE:
"Debugging Production Outages: A Systematic Approach We Use at [Company]"
WHY: Specific problem, solution-oriented, credible source.

BAD EXAMPLE:
"Database Stuff"
WHY: Vague, not compelling, no call to action.

Now write 3 headlines for: "A guide to implementing machine learning in production systems"
```

**When It Works**:
- Teaching avoidance of bad patterns
- Making implicit rules explicit
- Higher-quality outputs

---

## PATTERN FAMILY 3: CHAIN-OF-THOUGHT
**Effectiveness**: ⭐⭐⭐⭐⭐ (40-60% improvement on reasoning)
**Best For**: Math, logic, complex analysis

### Pattern 3.1: Step-by-Step Reasoning
**Template**:
```
Solve [PROBLEM] by working through it step-by-step.

Step 1: [First step description]
Step 2: [Second step description]
Step 3: [Third step description]
...
Final answer: [Summary]

Make sure to show your work for each step.
```

**Example** (Math):
```
Solve this problem step-by-step: If a store buys apples at $0.50 each and sells them at $1.20 each, and overhead costs are $50 per day, how many apples must be sold to break even?

Step 1: Calculate profit per apple
Step 2: Calculate how much profit needed to cover overhead
Step 3: Calculate break-even quantity

Show your work for each step.
```

### Pattern 3.2: Chain-of-Thought with Verification
**Template**:
```
Solve [PROBLEM].

Work through the problem step-by-step:
[Model's reasoning here]

Now verify your answer:
- Check step 1 by [METHOD]
- Check step 2 by [METHOD]  
- Test result against [CRITERIA]

Final answer: [Verified answer]
```

**Example** (Logic):
```
Analyze this argument: "All humans are mortal. Socrates is human. Therefore, Socrates is mortal."

Work through the logical argument:
1. Identify the premises
2. Check if premises are true
3. Check if conclusion follows logically
4. State whether argument is valid

Now verify:
- Does the conclusion necessarily follow from premises?
- Could there be any logical errors?
- Is this form of argument (deductive) sound?
```

### Pattern 3.3: Thinking Transparency
**Template**:
```
Solve [PROBLEM].

Approach:
1. Start by identifying [KEY ELEMENTS]
2. Consider [RELEVANT FACTORS]
3. Evaluate [DIFFERENT PERSPECTIVES]
4. Determine [FINAL ANSWER]

Show me your thinking at each stage. If you're uncertain, say so.
```

**Example** (Decision Making):
```
Should we hire this candidate?

Candidate qualifications: [Details]

Approach:
1. Check if they meet required qualifications
2. Evaluate their experience level
3. Consider their culture fit
4. Make recommendation with reasoning

Show your thinking at each stage. If you're uncertain about anything, say so explicitly.
```

---

## PATTERN FAMILY 4: STRUCTURED OUTPUT
**Effectiveness**: ⭐⭐⭐⭐ (Enables automation)
**Best For**: Data extraction, programmatic use

### Pattern 4.1: JSON Output
**Template**:
```
Extract [INFORMATION] from [INPUT].

Format your response as JSON with this structure:
{
  "field_name": "description",
  "another_field": "description"
}

Input: [The content to extract from]
```

**Example**:
```
Extract article metadata from this text.

Format your response as JSON:
{
  "title": "Article title",
  "author": "Author name if mentioned",
  "publication_date": "Date in YYYY-MM-DD format",
  "main_topic": "What the article is mainly about",
  "key_points": ["List", "of", "key points"],
  "sentiment": "positive/negative/neutral"
}

Input: [Article text here]
```

### Pattern 4.2: Structured Lists
**Template**:
```
[Task]. Format as:

SECTION 1: [Name]
- Item: [Description]
- Item: [Description]
- Item: [Description]

SECTION 2: [Name]
- Item: [Description]
- Item: [Description]
```

**Example**:
```
Analyze this product idea. Format as:

STRENGTHS:
- Strength: Description of why this is an advantage
- Strength: Description
- Strength: Description

WEAKNESSES:
- Weakness: Description of limitation
- Weakness: Description
- Weakness: Description

OPPORTUNITIES:
- Opportunity: Market expansion idea
- Opportunity: Feature addition

THREATS:
- Threat: Competitive risk
- Threat: Market risk
```

### Pattern 4.3: Table Format
**Template**:
```
Compare [ITEMS]. Use this table format:

| Criteria | Option A | Option B | Option C |
|----------|----------|----------|----------|
| [Criteria 1] | [Value] | [Value] | [Value] |
| [Criteria 2] | [Value] | [Value] | [Value] |
| [Criteria 3] | [Value] | [Value] | [Value] |
```

**Example**:
```
Compare these JavaScript frameworks. Use this table:

| Criteria | React | Vue | Angular |
|----------|-------|-----|---------|
| Learning Curve | Easy | Very Easy | Hard |
| Performance | Very Fast | Fast | Moderate |
| Community | Huge | Growing | Large |
| Job Market | Excellent | Good | Good |
| Bundle Size | Medium | Small | Large |
```

---

## PATTERN FAMILY 5: CONSTRAINT-BASED
**Effectiveness**: ⭐⭐⭐ (Good for focused outputs)
**Best For**: Creative writing, bounded problems

### Pattern 5.1: Length Constraints
**Template**:
```
[Task].

Constraints:
- Exactly [NUMBER] words (no more, no less)
- OR: Between [MIN] and [MAX] words
- OR: No more than [NUMBER] sentences

[The task itself]
```

**Example**:
```
Write a product description for a coffee maker.

Constraints:
- Exactly 75 words
- Include 3 benefits
- Use simple language (no jargon)

Target audience: Busy professionals
```

### Pattern 5.2: Format Constraints  
**Template**:
```
[Task]

Constraints:
- Format: [REQUIRED FORMAT]
- Must include: [REQUIRED ELEMENTS]
- Must NOT include: [FORBIDDEN ELEMENTS]
- Tone: [REQUIRED TONE]
```

**Example**:
```
Write a job rejection email.

Constraints:
- Format: Professional business email
- Must include: Thank them for applying, brief positive feedback, clear rejection
- Must NOT include: Detailed criticism, false hope, jargon
- Tone: Professional but warm
```

### Pattern 5.3: Complexity Constraints
**Template**:
```
[Task]

Make it:
- ☐ Simple (for beginners)
- ☐ Moderate (for intermediate learners)
- ☐ Complex (for advanced users)

Adjust your explanation accordingly.
```

---

## PATTERN FAMILY 6: PERSPECTIVE-TAKING
**Effectiveness**: ⭐⭐⭐⭐ (Better insights through multiple views)
**Best For**: Brainstorming, analysis, de-biasing

### Pattern 6.1: Multiple Stakeholder Views
**Template**:
```
Consider [SITUATION/IDEA] from multiple perspectives.

FROM THE [STAKEHOLDER 1] PERSPECTIVE:
[Their viewpoint]

FROM THE [STAKEHOLDER 2] PERSPECTIVE:
[Their viewpoint]

FROM THE [STAKEHOLDER 3] PERSPECTIVE:
[Their viewpoint]

Synthesis: [How these views complement or conflict]
```

**Example**:
```
Consider remote work from multiple perspectives.

FROM THE EMPLOYEE PERSPECTIVE:
- Benefits, concerns, challenges
- What matters most to employees

FROM THE EMPLOYER PERSPECTIVE:
- Benefits, concerns, challenges
- What matters most to company

FROM THE CUSTOMER PERSPECTIVE:
- How does it affect service quality
- Concerns about business continuity

Synthesis: How can we address all three perspectives?
```

### Pattern 6.2: Devil's Advocate
**Template**:
```
I propose: [YOUR IDEA/POSITION]

Play devil's advocate and argue against this idea.
What are the strongest objections?
What am I not considering?

Then, respond to your own objections.
```

**Example**:
```
I propose: We should use microservices architecture for our new product.

Play devil's advocate:
- What's wrong with microservices?
- What problems can they cause?
- When are monoliths better?
- Have I thought this through?

Then respond: Why microservices is still the right choice despite these objections.
```

### Pattern 6.3: Future Perspectives
**Template**:
```
[Situation].

If we pursue this, what would [FUTURE PERSPECTIVE] say in 6 months?

Positive timeline:
- If everything goes right...
- [Future person] would be saying:

Negative timeline:
- If things go wrong...
- [Future person] would be saying:

What's most likely?
```

---

## PATTERN FAMILY 7: ITERATIVE REFINEMENT
**Effectiveness**: ⭐⭐⭐⭐ (30-50% improvement through iteration)
**Best For**: Content improvement, optimization

### Pattern 7.1: Guided Refinement
**Template**:
```
Here's my [OUTPUT TYPE]: [Initial output]

Please improve it in these specific ways:
1. [Improvement direction 1]
2. [Improvement direction 2]
3. [Improvement direction 3]

Maintain: [What NOT to change]
```

**Example**:
```
Here's my product pitch: [Initial pitch text]

Please improve it:
1. Make it more compelling (add emotional appeal)
2. Be more specific (include actual metrics/results)
3. Make it shorter (remove buzzwords and jargon)

Maintain the professional tone and product benefits.
```

### Pattern 7.2: Multi-Pass Refinement
**Template**:
```
I need to improve [OUTPUT]. Help through multiple passes:

Pass 1: Focus on [ASPECT 1]
- Here's my current version: [Text]
- How can I improve [ASPECT 1]?

Pass 2: Focus on [ASPECT 2]
- Using the improved version from Pass 1, how can I improve [ASPECT 2]?

Pass 3: Final optimization
- Any final improvements to make it excellent?
```

### Pattern 7.3: Comparative Refinement
**Template**:
```
Here are 2-3 versions of [OUTPUT]:

VERSION A: [First version]
VERSION B: [Second version]
VERSION C: [Third version]

Which is best? Why?
How can I combine the best aspects of each?
What would be the ideal version?
```

---

## PATTERN FAMILY 8: VERIFICATION & ERROR-CHECKING
**Effectiveness**: ⭐⭐⭐⭐ (Catches 20-30% more errors)
**Best For**: Critical tasks, quality assurance

### Pattern 8.1: Self-Checking
**Template**:
```
[Task]

After you provide your answer, check it:
1. [Verification method 1]
2. [Verification method 2]
3. [Verification method 3]

Note: Only provide final answer if all checks pass.
If any check fails, provide corrected answer.
```

**Example**:
```
Calculate 847 × 23.

After you calculate, verify your work:
1. Recalculate using a different method
2. Check if the answer seems reasonable (between X and Y)
3. Do the reverse operation to verify

Only provide final answer if all checks pass.
```

### Pattern 8.2: Confident Uncertainty
**Template**:
```
[Task]

For your answer, provide:
1. Your answer: [Answer]
2. Confidence level: [HIGH / MEDIUM / LOW]
3. Reasoning for this confidence level
4. What would increase/decrease your confidence?
5. If confidence is not HIGH, what additional information would help?
```

### Pattern 8.3: Assumption Checking
**Template**:
```
[Task]

Before answering, list:
1. What assumptions am I making?
2. Are these assumptions valid?
3. What if my assumptions are wrong?
4. What would change my answer?

Then provide your answer with noted assumptions.
```

---

## PATTERN COMBINATION: POWER COMBOS

### Combo 1: Role + Few-Shot + Chain-of-Thought (Complex Analysis)
Best for: Expert analysis on difficult topics

```
You are [EXPERT ROLE].

Here are examples of excellent [ANALYSIS TYPE]:
[Example 1 with explanation]
[Example 2 with explanation]

Now analyze [NEW TOPIC]:
1. First, identify key factors
2. Consider each factor step-by-step
3. Explain how they connect
4. Provide final synthesis

Show your reasoning at each step.
```

### Combo 2: Few-Shot + Structured Output (Data Processing)
Best for: Extracting and transforming data

```
I'll show you examples of input → output transformation.

Example 1:
INPUT: [Raw data]
OUTPUT: [Structured format]

Example 2:
INPUT: [Raw data]
OUTPUT: [Structured format]

Transform this:
INPUT: [New raw data]
OUTPUT: [JSON format with fields: X, Y, Z]
```

### Combo 3: Constraint + Perspective-Taking (Creative Output)
Best for: Creative high-quality output

```
Write [CONTENT TYPE].

Constraints:
- Exactly [LENGTH]
- Tone: [TONE]
- Must address: [PERSPECTIVES]

Before writing, consider:
- What would [PERSONA 1] appreciate?
- What would [PERSONA 2] think?
- How do these perspectives differ?
```

---

## 📊 PATTERN EFFECTIVENESS BY TASK TYPE

| Task Type | Best Patterns | Why |
|-----------|---------------|-----|
| Classification | Few-Shot, Role | Examples show patterns; role gives context |
| Analysis | Chain-of-Thought, Perspective-Taking | Reasoning + multiple views = better insights |
| Writing | Role, Constraint, Refinement | Voice + limits + iteration = quality |
| Data Extraction | Few-Shot, Structured Output | Learn format + enforce structure |
| Problem Solving | Chain-of-Thought, Verification | Step-by-step + verification = accuracy |
| Creative | Constraint, Role, Perspective-Taking | Creative freedom + guidance |
| Quality Assurance | Verification, Assumption-Checking | Multiple checks catch errors |

---

## 🚀 USING THIS CATALOG

1. **Identify your task type** (classification, analysis, writing, etc.)
2. **Find the most applicable pattern** from the table above
3. **Copy the template**
4. **Fill in bracketed sections**
5. **Test and iterate**
6. **A/B test variations**
7. **Track what works**

---

**Status**: Phase 1 - Pattern Catalog Complete
**Total Patterns**: 18+ (across 8 families)
**Next**: Testing framework and scoring system

