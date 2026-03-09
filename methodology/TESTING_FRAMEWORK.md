# 📋 PROMPT TESTING & SCORING FRAMEWORK

**Purpose**: Systematic methodology to evaluate prompt quality objectively (not subjective guessing).

**Key Principle**: Good prompts are measurable. If you can't measure it, you can't improve it.

---

## PART 1: PROMPT QUALITY SCORING (0-30 Points)

Use this rubric to score any prompt from 0-30 points.

### Component 1: Clarity & Specificity (0-5 points)

**5 points - Excellent**: 
- ✅ Crystal clear what's being asked
- ✅ No ambiguity in instructions
- ✅ Specific constraints and requirements stated
- ✅ Success criteria defined
- ✅ Reader expertise level specified

**4 points - Good**:
- ✅ Clear instructions with minor ambiguity
- ✅ Most constraints specified
- ✅ Success criteria mostly clear
- ⚠️ Could be slightly more specific

**3 points - Fair**:
- ✅ General intent is clear
- ⚠️ Some ambiguity exists
- ⚠️ Some constraints unclear
- ⚠️ Success criteria vague

**2 points - Poor**:
- ⚠️ Intent somewhat unclear
- ⚠️ Multiple ambiguities
- ❌ Missing important constraints
- ❌ No success criteria

**1 point - Very Poor**:
- ❌ Hard to understand what's being asked
- ❌ Major ambiguities
- ❌ Vague and open-ended

**0 points - Failing**:
- ❌ Completely unclear/nonsensical

**Scoring Checklist**:
- [ ] Instructions are specific (not "write something good")
- [ ] Constraints are explicit (length, format, tone, etc.)
- [ ] Success criteria defined (how to know if it works)
- [ ] Edge cases mentioned (what should/shouldn't be included)
- [ ] Reader expertise level stated (who is the audience)

**Example Scoring**:
```
Prompt: "Write a blog post about AI"
Score: 1/5 (way too vague)

Prompt: "Write a 1,500-word blog post about recent AI breakthroughs 
for technical professionals with 5+ years experience. Include:
- 3 recent breakthroughs with examples
- Real-world impact of each
- Future implications
Format: Markdown with headers, include sources"
Score: 5/5 (crystal clear)
```

---

### Component 2: Structure & Organization (0-5 points)

**5 points - Excellent**:
- ✅ Uses formatting effectively (headers, lists, delimiters)
- ✅ Clear sections and logical flow
- ✅ Examples provided
- ✅ Output format specified with examples
- ✅ Role or perspective clearly stated

**4 points - Good**:
- ✅ Good use of formatting
- ✅ Sections are clear
- ⚠️ Could use more structure
- ⚠️ Output format could be clearer

**3 points - Fair**:
- ⚠️ Some structure present
- ⚠️ Could be better organized
- ⚠️ Minimal examples
- ⚠️ Output format vague

**2 points - Poor**:
- ❌ Poorly organized
- ❌ No clear structure
- ❌ No examples provided
- ❌ Output format not specified

**1-0 points - Very Poor**:
- ❌ Disorganized/unclear structure

**Scoring Checklist**:
- [ ] Uses dividers/delimiters to separate sections
- [ ] Clear role or context given
- [ ] Output format specified (JSON, text, list, etc.)
- [ ] At least 1 example provided
- [ ] Logical progression of ideas

**Example Scoring**:
```
Prompt: "You are an AI. Write code."
Score: 1/5 (no structure)

Prompt:
"ROLE: You are a senior Python engineer with 10 years experience.
TASK: Write a function that [description]
CONSTRAINTS:
- Use Python 3.9+
- Include type hints
- Add docstring
OUTPUT FORMAT:
```python
# code here
```
EXAMPLE:
[Shows what good output looks like]"
Score: 5/5 (excellent structure)
```

---

### Component 3: Examples & Demonstrations (0-5 points)

**5 points - Excellent**:
- ✅ 2-3 relevant examples provided
- ✅ Examples show diversity (simple, complex, edge case)
- ✅ Examples include explanations
- ✅ Output format shown in examples
- ✅ Examples are realistic/relatable

**4 points - Good**:
- ✅ 1-2 good examples
- ✅ Shows expected output
- ⚠️ Could be more diverse
- ⚠️ Limited explanation

**3 points - Fair**:
- ⚠️ 1 example present but simple
- ⚠️ Explanation missing
- ⚠️ Doesn't show full output format

**2 points - Poor**:
- ❌ Minimal/poor examples
- ❌ Doesn't clearly show expected output

**1-0 points - Very Poor**:
- ❌ No examples provided

**Scoring Checklist**:
- [ ] At least 2 examples provided
- [ ] Examples show typical use case
- [ ] At least one edge/complex case shown
- [ ] Examples include explanations
- [ ] Shows full expected output

**Example Scoring**:
```
Prompt: "Classify sentiment."
Score: 1/5 (no examples)

Prompt: "Classify sentiment:
Example 1:
INPUT: 'This movie was great!'
OUTPUT: positive
REASONING: Positive language indicates satisfaction

Example 2:
INPUT: 'The service was slow and food was cold.'
OUTPUT: negative
REASONING: Negative language about service and food

Example 3:
INPUT: 'It was okay, nothing special.'
OUTPUT: neutral
REASONING: Neutral/mixed language

Classify this: [Your input]"
Score: 5/5 (excellent examples)
```

---

### Component 4: Reasoning & Verification (0-5 points)

**5 points - Excellent**:
- ✅ Asks model to show reasoning
- ✅ Includes verification steps
- ✅ Asks for confidence assessment
- ✅ Addresses potential uncertainties
- ✅ Step-by-step breakdown requested

**4 points - Good**:
- ✅ Asks for reasoning or verification
- ⚠️ Could strengthen uncertainty handling
- ⚠️ Missing some verification steps

**3 points - Fair**:
- ⚠️ Some reasoning requested
- ⚠️ Minimal verification
- ⚠️ No uncertainty handling

**2 points - Poor**:
- ❌ No reasoning requested
- ❌ Assumes correctness without verification

**1-0 points - Very Poor**:
- ❌ Completely missing reasoning/verification

**Scoring Checklist**:
- [ ] Asks model to explain reasoning
- [ ] Includes verification/checking step
- [ ] Asks for confidence level (if applicable)
- [ ] Addresses edge cases
- [ ] Step-by-step approach requested (for complex tasks)

**Example Scoring**:
```
Prompt: "Calculate 123 × 456"
Score: 1/5 (no verification)

Prompt: "Calculate 123 × 456.
Show your work step by step:
Step 1: [calculation]
Step 2: [calculation]
Step 3: [final result]

Verify your answer by:
1. Recalculating using different method
2. Checking if result seems reasonable
3. Doing reverse operation

Confidence level: (if wrong, what would help?)"
Score: 5/5 (comprehensive verification)
```

---

### Component 5: Output Specification (0-5 points)

**5 points - Excellent**:
- ✅ Exact output format specified and shown
- ✅ Schema or template provided
- ✅ Field descriptions clear
- ✅ Example output included
- ✅ Edge cases addressed

**4 points - Good**:
- ✅ Output format clear
- ✅ Template or example shown
- ⚠️ Could be more detailed

**3 points - Fair**:
- ⚠️ Output format somewhat specified
- ⚠️ Example missing or vague
- ⚠️ Schema not clear

**2 points - Poor**:
- ❌ Output format vague
- ❌ No example provided

**1-0 points - Very Poor**:
- ❌ No output specification

**Scoring Checklist**:
- [ ] Format explicitly stated (JSON, list, table, etc.)
- [ ] Example output provided
- [ ] Field names/structure shown
- [ ] Data types specified (if applicable)
- [ ] Edge cases shown

**Example Scoring**:
```
Prompt: "Summarize the text."
Score: 1/5 (completely unspecified)

Prompt: "Summarize the text. Return JSON format:
{
  \"summary\": \"2-3 sentence summary\",
  \"key_points\": [\"point1\", \"point2\", \"point3\"],
  \"sentiment\": \"positive/negative/neutral\",
  \"confidence\": 0.0-1.0
}

Example output:
{
  \"summary\": \"...\",
  \"key_points\": [...],
  \"sentiment\": \"neutral\",
  \"confidence\": 0.85
}"
Score: 5/5 (crystal clear)
```

---

### Component 5: Domain Knowledge & Context (0-5 points)

**5 points - Excellent**:
- ✅ Domain expertise clearly conveyed
- ✅ Reader expertise level specified
- ✅ Necessary context provided
- ✅ Jargon explained if needed
- ✅ Background assumptions stated

**4 points - Good**:
- ✅ Context mostly provided
- ⚠️ Could detail reader expertise better
- ⚠️ Some context could be clearer

**3 points - Fair**:
- ⚠️ Some context provided
- ⚠️ Reader level unclear
- ⚠️ Some assumptions not stated

**2 points - Poor**:
- ❌ Minimal context
- ❌ Assumes too much knowledge

**1-0 points - Very Poor**:
- ❌ Missing critical context

**Scoring Checklist**:
- [ ] Reader expertise level specified
- [ ] Domain context provided
- [ ] Required background knowledge stated
- [ ] Jargon explained (or audience is expert)
- [ ] Assumptions made explicit

---

## TOTAL SCORING

Add up all 5 components (0-30 max):

**27-30**: ⭐⭐⭐⭐⭐ Excellent - Ready for use
**24-26**: ⭐⭐⭐⭐ Good - Minor refinements recommended
**21-23**: ⭐⭐⭐ Fair - Multiple improvements needed
**18-20**: ⭐⭐ Poor - Significant rework required
**<18**: ⭐ Very Poor - Needs major overhaul

---

## PART 2: OUTPUT QUALITY TESTING

Once you have a prompt (scored 15+ points), test the OUTPUT using these metrics.

### Test 1: Accuracy Testing

**Method**:
1. Run prompt on 10-20 test cases
2. Compare output to ground truth
3. Score: % of correct outputs

**Scoring**:
- 95-100%: Excellent
- 90-94%: Good
- 80-89%: Fair (some failures)
- 70-79%: Poor
- <70%: Very Poor (prompt needs revision)

**Example**:
```
PROMPT: Classify sentiment of customer reviews
TEST SET: 10 reviews with known sentiment labels

Run results:
- Correct: 9/10 (90%)
- Incorrect: 1/10 (classified negative as positive)

Score: GOOD (90%)

Action: Good enough for most use cases, but 
could improve description of "neutral" cases
```

### Test 2: Consistency Testing

**Method**:
1. Run same prompt 5 times with temperature=0
2. Check if outputs are identical
3. Score: % of identical outputs

**Scoring**:
- 100%: Perfect (deterministic)
- 80-99%: Good (mostly consistent)
- 60-79%: Fair (some variation)
- <60%: Poor (too much variation)

**Formula**:
```
If variation tolerated:
  - Use medium temperature (0.4-0.6)
  - Run 5 times, pick best or synthesize
  
If consistency critical:
  - Use low temperature (0.0-0.2)
  - Expect 90%+ consistency
```

**Example**:
```
PROMPT: Generate email subject lines
RUN 1: "Special Offer: 50% Off This Weekend Only"
RUN 2: "Limited Time: 50% Off All Items"
RUN 3: "50% Discount Available Now - Act Fast"
RUN 4: "Weekend Flash Sale: Half Off Everything"
RUN 5: "Save 50% This Saturday & Sunday"

Variation: HIGH (different every time)
Score: POOR for consistency

Action: This is okay for brainstorming, but
add "Stay similar to previous outputs" to constrain
```

### Test 3: Edge Case Testing

**Method**:
1. Create edge case test inputs
2. Run prompt on each
3. Check for failures/hallucinations

**Common Edge Cases**:
- Empty/null input
- Very long input
- Contradictory input
- Ambiguous input
- Invalid format input
- Extreme values
- Out-of-domain input

**Scoring**:
- Handles all gracefully: Excellent
- Handles most, fails on 1-2: Good
- Fails on 2-3: Fair
- Fails on 3+: Poor

**Example**:
```
PROMPT: Extract email from text
EDGE CASES:
1. "No email here" → Should say "No email found"
2. "Email: invalid@" → Should note format issue
3. "email@domain.com and another@test.org" → Should clarify 1 vs 2?
4. "" (empty) → Should gracefully say "No input"
5. "invalid email format xyz" → Should not hallucinate

Results: Fails on cases 2 & 5
Score: POOR

Action: Add instruction "If no valid email or invalid format, 
explicitly state 'No valid email found' - don't guess"
```

### Test 4: Format Compliance Testing

**Method**:
1. Specify required format
2. Run prompt
3. Check if output matches format

**Scoring**:
- 100% format compliance: Excellent
- 95-99%: Good
- 80-94%: Fair
- <80%: Poor

**Example**:
```
REQUIRED FORMAT: JSON with keys: {title, author, date}

Output 1:
{
  "title": "Article",
  "author": "John",
  "date": "2024-01-01"
}
✅ VALID

Output 2:
Title: Article
Author: John
Date: 2024-01-01
❌ INVALID (not JSON)

Compliance: 1/2 (50%)
Score: POOR

Action: Strengthen format instruction,
provide JSON example in prompt
```

### Test 5: Latency Testing

**Method**:
1. Run prompt 10 times
2. Record response time
3. Calculate average

**Benchmarks**:
- <2 seconds: Excellent (real-time capable)
- 2-5 seconds: Good
- 5-10 seconds: Fair
- 10-30 seconds: Slow but acceptable for batch
- >30 seconds: Too slow (consider simplifying)

**Example**:
```
Prompt length: 500 tokens
Output length: 200 tokens
LLM: GPT-4
Runs: 10
Average: 3.5 seconds

Result: GOOD (responsive enough for user-facing)

If it was 25 seconds:
SLOW (consider using GPT-3.5 or shorter prompt)
```

---

## PART 3: A/B TESTING FRAMEWORK

Compare two prompt versions objectively.

### A/B Test Setup

**Step 1: Create Two Versions**
```
VERSION A (Current):
[Your existing prompt]

VERSION B (Experiment):
[Modified prompt with one change]

CHANGE MADE: [What's different]
```

**Step 2: Prepare Test Set**
- Use same 10-20 test cases for both
- Include mix of typical and edge cases
- Have ground truth for comparison

**Step 3: Run Both**
```
VERSION A on 20 test cases:
- Accuracy: 85%
- Consistency: 95%
- Avg time: 3.2s

VERSION B on same 20 test cases:
- Accuracy: 90%
- Consistency: 98%
- Avg time: 3.8s
```

**Step 4: Compare**
```
METRIC           | VERSION A | VERSION B | WINNER
Accuracy         | 85%       | 90%       | B ✅
Consistency      | 95%       | 98%       | B ✅
Speed            | 3.2s      | 3.8s      | A ✅
Format Compliance| 95%       | 95%       | TIE
Quality Rating   | 8/10      | 8.5/10    | B ✅

VERDICT: B is better
IMPROVEMENT: +5% accuracy, +3% consistency, -0.6s speed
RECOMMENDATION: Use Version B
```

### When to A/B Test

- ✅ Major prompt rewrites
- ✅ Changing core instruction
- ✅ Adding/removing examples
- ✅ Changing output format
- ✅ Experimenting with role-play

- ❌ Minor wording changes (usually not significant)
- ❌ When you only have 1-2 test cases
- ❌ When already at 95%+ performance

---

## PART 4: PROMPT IMPROVEMENT WORKFLOW

### Workflow Steps

**Step 1: Score the Prompt** (0-30 points)
- Use Component Scorecard above
- Identify weak areas
- Set target score (22+ points)

**Step 2: Identify Improvements**
- Priority 1: Clarity gaps (points 1-5)
- Priority 2: Structure issues (points 6-10)
- Priority 3: Examples missing (points 11-15)
- Priority 4: Verification steps (points 16-20)

**Step 3: Create Improved Version**
- Make ONE key change at a time
- Document what you changed
- Why you made the change

**Step 4: A/B Test**
- If this is important, test before/after
- Use same test set for comparison
- Measure accuracy, consistency, format

**Step 5: Evaluate Results**
- Did it improve? (✅ Use new version)
- Did it stay same? (⚠️ Make different change)
- Did it worsen? (❌ Revert, try different approach)

**Step 6: Document**
- Version history of prompt
- What changed and why
- Performance metrics at each step

### Example Workflow

```
VERSION 1 (Initial):
"Summarize this text."
Score: 2/30 (Critical issues)

ISSUES IDENTIFIED:
- No format specified
- No length guidance
- No examples
- Missing context

ACTION TAKEN:
Add role, format, length, examples

VERSION 2 (Improved):
"You are a professional summarizer.
Summarize the text below.

Format: 3 bullet points (key info only)
Length: 50-75 words total
Tone: Professional, factual

Example:
INPUT: [Sample text]
OUTPUT:
• First key point
• Second key point  
• Third key point

Now summarize:"

Score: 18/30 (Much better)

RESULTS:
- Accuracy: 60% → 85% (+25%)
- User satisfaction: 5/10 → 8/10
- Format compliance: 50% → 95%

NEXT: Add verification step → Version 3
```

---

## REFERENCE SCORECARD (Printable)

```
PROMPT: _________________________________
DATE: _________________________________

COMPONENT 1 - Clarity (0-5):    ___ / 5
COMPONENT 2 - Structure (0-5):  ___ / 5
COMPONENT 3 - Examples (0-5):   ___ / 5
COMPONENT 4 - Reasoning (0-5):  ___ / 5
COMPONENT 5 - Output (0-5):     ___ / 5

TOTAL SCORE:                    ___ / 30

RATING:
☐ Excellent (27-30) ✅
☐ Good (24-26)      👍
☐ Fair (21-23)      ⚠️
☐ Poor (18-20)      ❌
☐ Very Poor (<18)   🚫

KEY STRENGTHS:
1. ________________________
2. ________________________

KEY IMPROVEMENTS NEEDED:
1. ________________________
2. ________________________

NEXT ACTION:
________________________
```

---

**Status**: Phase 1 - Testing Framework Complete
**Last Updated**: March 9, 2026
**Next Phase**: Web App Development

