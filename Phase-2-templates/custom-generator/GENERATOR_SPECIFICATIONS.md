# 🎨 CUSTOM PROMPT GENERATOR - TECHNICAL SPECIFICATIONS

**Status**: Phase 2 Design Document  
**Created**: March 2026  
**For**: Phase 3 Web App Development  

---

## 📋 OVERVIEW

### What Is the Custom Prompt Generator?

A web-based AI assistant that helps users create highly effective prompts for their specific needs, powered by the 10 domain templates + real-time quality scoring.

**User Journey**:
1. User enters natural language description of what they want
2. System understands their need and recommends relevant domain template(s)
3. User refines selections and inputs domain-specific details
4. System generates customized, production-ready prompt
5. User gets real-time quality score + suggestions for improvement
6. User can copy, edit, save, and track effectiveness of generated prompts

**Competitive Differentiation vs originality.ai**:
- **More domains**: 10 specialized vs generic
- **Scientific backing**: Research foundation + tested patterns
- **Real-time scoring**: Know prompt quality before using
- **Advanced options**: Customize tone, depth, format, audience
- **Analytics**: Track which prompts work best for you
- **Community**: Share effective prompts, learn from others 

---

## 🎯 USER FLOWS

### Flow 1: Quick Prompt Generation
```
User: "Create an email to customers about product launch"

→ System: Shows 3 recommended templates (Email Writing, Content, Product)
→ User: Selects "Email Writing"
→ System: Shows quick-fill form (Simple, 5 fields)
→ User: Fills: Audience, Goal, Tone, Company, Offer
→ System: Generates 3 variations of the prompt
→ User: Picks favorite, gets quality score (28/30)
→ User: Copies to clipboard, uses in LLM

TIME: 2 minutes
COMPLEXITY: Simple
```

### Flow 2: Advanced Prompt Engineering
```
User: "I need a prompt to analyze customer feedback and generate product improvements"

→ System: Recommends "Data Analysis" + "Product Management" templates
→ User: Selects both, wants to combine
→ System: Shows advanced-fill form (All fields, options)
→ User: Fills all fields:
   - Analysis type: Customer feedback analysis
   - Audience: Product team (technical understanding)
   - Desired output: Structured list with priorities
   - Analysis depth: Deep (include limitations, confidence levels)
   - Advanced options: Add example output format
→ System: Generates prompt combining both templates
→ Real-time scoring: Shows 26/30 (high quality)
→ Quality feedback: "Add more context about customer segment"
→ User: Makes adjustment, score increases to 28/30
→ User: Saves prompt to library, tags for later

TIME: 10 minutes
COMPLEXITY: Advanced
```

### Flow 3: Template Browsing & Learning
```
User: "I want to understand how to prompt for content creation"

→ User: Browses "Content Writing" template (read-only)
→ System: Shows full template with examples
→ User: Reads real examples (blog post, landing page)
→ User: Sees pro tips section
→ User: Clicks "Generate prompt based on this"
→ System: Opens template fill form
→ User: Creates custom version for their use case

TIME: 5-15 minutes
COMPLEXITY: Learning-focused
```

---

## 💻 TECHNICAL ARCHITECTURE

### Frontend Components

#### 1. Search/Entry Interface
```
Component: PromptSearch
- Text input (natural language): "What kind of prompt do you need?"
- Suggestions (frequent/trending)
- Popular templates quick-access buttons
- "Browse all templates" link

Functionality:
- Auto-suggest matching templates (semantic search)
- Show 3 best matches ranked by relevance
- Allow multi-template selection (combine approaches)
```

#### 2. Template Selector
```
Component: TemplateSelector
- Show recommended templates
- Display relevance score (90%, 85%, 60%)
- Template preview (1-line summary)
- Click to select, can multi-select

State:
- Single template selected
- Multiple templates selected (for combining)
- Custom template (user creates new)
```

#### 3. Form Builder (Dynamic)
```
Component: DynamicFormBuilder
- Read template [BRACKETS] placeholders
- Generate form fields matching placeholders
- Field types: Text, Textarea, Select, Checkbox, Date
- Validation: Required fields, min length, patterns

Modes:
- Quick Fill: Show 5 most important fields
- Standard: Show all essential fields
- Advanced: Show all fields + pro tips + options

Each field includes:
- Label
- Help text (from template)
- Placeholder example
- Validation rules
- Optional pro tip
```

#### 4. Prompt Generator & Display
```
Component: PromptGenerator
- Input: Selected template(s), form data, options
- Process:
  1. Load template content
  2. Replace [BRACKETS] with user inputs
  3. Apply format/tone options
  4. Generate 3 variations (auto)
  5. Score quality (30-point system)
  6. Show real-time feedback

Output:
- Generated prompt (copyable)
- Quality score with breakdown
- Improvement suggestions
- Related tips (from template)
```

#### 5. Quality Scorer
```
Component: QualityScorer
- Scoring system: 30-point scale
- Metrics evaluated:
  - Clarity (Is it clear what's being asked?)
  - Completeness (Does it have all key details?)
  - Constraints (Are boundaries defined?)
  - Examples (Does it have examples?)
  - Tone (Is tone appropriate?)
  - Actionability (Can someone execute on this?)
  - Context (Is there enough background?)
  - Measurability (Are outcomes defined?)
  - Risk awareness (Are limitations noted?)
  - Structure (Is it well-organized?)

Display:
- Overall score (0-30)
- Scores per category (3-4 per category)
- Visual progress bar
- "This prompt is [Excellent/Good/Okay/Needs Work]"
- Specific suggestion to improve score
```

#### 6. Copy & Share
```
Component: PromptActions
- Copy to clipboard button
- Share URL (saves version, shareable link)
- Save to library (requires login)
- Export as PDF
- Download as .txt
- Show usage examples (how to use in ChatGPT, Claude, etc)
```

#### 7. Saved Prompts Library
```
Component: LibraryView (requires login)
- List saved prompts
- Metadata: Name, template used, date created, quality score
- Tags: User-created tags (e.g. "marketing", "product", etc)
- Search/filter by tag, template, date
- Sort by: Recently created, quality score, usage
- Click to view/edit/delete
- Usage tracking: Show when last used, how many times
```

### Backend Components

#### 1. Template Service
```
Service: TemplateService

Methods:
- listTemplates() → Returns all 10 templates
- getTemplate(id) → Return single template
- searchTemplates(query) → Find matching templates
- getTemplateMetadata(id) → Return [BRACKETS], fields, variations

Data structure per template:
{
  id: "code-generation",
  name: "Code Generation",
  description: "...",
  category: "Development",
  brackets: ["LANGUAGE", "EXPERTISE", "FUNCTION", ...],
  mainTemplate: "...",
  quickTemplate: "...",
  examples: [...],
  variations: [...],
  proTips: [...],
  qualityChecklist: [...],
  metrics: {...}
}
```

#### 2. Search/Semantic Matching
```
Service: SemanticSearchService

Methods:
- findRelevantTemplates(query) → Ranks templates by relevance

Implementation:
- User query: "Create email for customers"
- System converts to embedding
- Compares to template embeddings
- Returns ranked list with relevance scores

Fallback: Keyword matching if semantic search unavailable
```

#### 3. Form Generation Service
```
Service: DynamicFormService

Methods:
- generateForm(templateId, mode) → Returns form structure

Per-template custom logic:
- Code Generation: Show language selector, expertise level dropdown
- Data Analysis: Analysis type select, show domain-specific options
- Content Writing: Show SEO optimization checklist
- Email Writing: Show segment options, tone selector
- Etc.

Each field includes:
- name, label, type, placeholder, help, required, options
- validation rules
- dependencies (show field X if field Y = Z)
```

#### 4. Prompt Generation Service
```
Service: PromptGeneratorService

Methods:
- generatePrompt(templateId, formData, options) → Returns generated prompt(s)

Process:
1. Load template
2. Replace [BRACKETS] with form values
3. Apply tone/depth/format options
4. Generate 3 variations (change wording while keeping meaning)
5. Return all 3 + metadata

Variations strategy:
- Variation 1: Direct (minimal change)
- Variation 2: More detailed (add examples)
- Variation 3: Different style (different structure)
```

#### 5. Quality Scoring Service
```
Service: QualityScoreService

Methods:
- scorePrompt(promptText, templateId) → Returns score object

Scoring algorithm:
1. Check clarity (is it understandable?)
2. Check completeness (did we fill key fields?)
3. Check for constraints (are boundaries clear?)
4. Check for examples (does it have examples?)
5. Check for context (sufficient background?)
6. Check structure (well-organized?)
7. Check actionability (clear what to do?)
8. Check tone (appropriate for use case?)
9. Check measurability (success criteria clear?)
10. Multi-factor assessment

Return:
{
  overallScore: 28,
  breakdown: {
    clarity: 3,
    completeness: 3,
    constraints: 2,
    examples: 3,
    ...
  },
  rating: "Excellent",
  suggestion: "Add confidence level expectations"
}

Note: Score typically 24-29/30 for good prompts
```

#### 6. User Service (with Analytics)
```
Service: UserService

Requires: GitHub login or email signup

Features:
- Save prompts to library
- Track prompt effectiveness
- See usage trends
- Bookmark templates
- Personal tags/collections

Analytics tracked (anonymous):
- Prompt created (template + quality score)
- Prompt used (when user returns to library)
- Prompt shared (if shared link clicked)
- Template views/selections
- Feature usage (quick fill vs advanced)
```

#### 7. Analytics Service
```
Service: AnalyticsService

Tracks (Anonymous unless logged in):
- Total prompts generated
- Average quality score
- Most popular templates
- Most common domains
- Quality score distribution
- User journey steps
- Feature adoption

Goal: Know when 100 users active
- Track: Daily active users, weekly retention, monthly active

Exposed via: Analytics dashboard (for product insight)
```

### Database Schema

```sql
-- Templates (Static - loaded from files)
table templates (
  id: string (primary)
  name: string
  description: string
  category: string
  content: jsonb (full template content)
  brackets: string[]
  created_at: timestamp
)

-- User Prompts (Dynamic - saved user work)
table user_prompts (
  id: uuid (primary)
  user_id: uuid (foreign key → users)
  template_id: string (foreign key → templates)
  name: string
  prompt_text: string (generated prompt)
  quality_score: integer (0-30)
  tags: string[]
  created_at: timestamp
  updated_at: timestamp
  last_used_at: timestamp
  usage_count: integer
)

-- Users (For saved libraries)
table users (
  id: uuid (primary)
  email: string (unique)
  github_id: string (optional)
  created_at: timestamp
  subscription_tier: string (free/pro) -- future
)

-- Analytics Events (Anonymous)
table analytics_events (
  id: uuid (primary)
  event_type: string (prompt_created / template_viewed / search / etc)
  template_id: string (nullable)
  quality_score: integer (nullable)
  session_id: string (anonymous)
  timestamp: timestamp
  metadata: jsonb
)
```

---

## 🎨 UI/UX SPECIFICATIONS

### Layout: Main Page

```
┌─────────────────────────────────────────────────────────┐
│  Prompt Engineering Science Platform                    │
│  [Home] [Templates] [Generator] [My Prompts] [Learn]   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                                                           │
│  Create Effective Prompts Using Scientific Templates    │
│                                                           │
│  [What kind of prompt do you need?                    ]  │
│   Search or select template below                        │
│                                                           │
│  ┌──────────────┬──────────────┬──────────────┐          │
│  │ Code Gen     │ Data Anal    │ Management   │          │
│  │ 85% match    │ 92% match    │ 78% match    │          │
│  └──────────────┴──────────────┴──────────────┘          │
│                                                           │
│  All Templates ┃ Popular ┃ By Category ┃ Trending      │
│                                                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │ 1. Code Generation                     26/30 ⭐    │   │
│  │    Create functions, classes, scripts            │   │
│  │                                                   │   │
│  │ 2. Data Analysis                       28/30 ⭐    │   │
│  │    Analyze datasets, generate insights           │   │
│  │                                                   │   │
│  │ ... [8 more templates]                           │   │
│  └──────────────────────────────────────────────────┘   │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### Layout: Generator Page

```
┌─────────────────────────────────────────────────────────┐
│  Code Generation Prompt Generator                        │
│  [Go Back] [View Template] [Help]                       │
└─────────────────────────────────────────────────────────┘

┌────────────────────┬──────────────────────────────────┐
│ FORM                │ PREVIEW & SCORING              │
├────────────────────┼──────────────────────────────────┤
│ Language:          │ Your Prompt:                    │
│ [Dropdown: Python] │                                │
│                    │ You are an expert in Python... │
│ Expertise Level:   │ [Prompt text fills here]       │
│ [Radio: Intermed.] │                                │
│                    │ Quality Score: 28/30 ⭐⭐⭐⭐   │
│ Task:              │                                │
│ [Text field]       │ Breakdown:                      │
│                    │ □ Clarity: ●●●  (3/3)         │
│ Quick Fill ┃ Adv.  │ □ Complete: ●●●  (3/3)        │
│ [Button: Generate] │ □ Examples: ●●●  (3/3)        │
│                    │ □ Constraints: ●●  (2/3)       │
│ Pro Tips:          │ □ Actionable: ●●●  (3/3)      │
│ • Be specific      │ ...                            │
│ • Show examples    │                                │
│ • Mention tech     │ Suggestions:                    │
│                    │ ✓ Great prompt!               │
│                    │ • Consider adding: edge cases  │
│                    │                                │
│                    │ [Copy] [Save] [Share] [PDF]    │
└────────────────────┴──────────────────────────────────┘
```

### Mobile Responsive
```
All components stack vertically on mobile:
- Form on top
- Preview below
- Generated prompt below that
- Copy button sticky at bottom
```

---

## 🔧 ADVANCED FEATURES

### Feature 1: Prompt Variations
**What**: System generates 3 variations of the same prompt automatically
**Why**: Users pick their favorite writing style
**Implementation**: Template has variation logic built-in

Example variations for same form input:
- Variation 1: Direct, concise
- Variation 2: Detailed, examples included
- Variation 3: Different structure, alternative approach

### Feature 2: Real-Time Quality Feedback
**What**: As user fills form, quality score updates
**Why**: Users understand impact of their choices
**Implementation**: Debounced scoring on form change

When score changes:
- Show updated number
- Highlight what improved/declined
- Suggest what's missing

### Feature 3: Template Combinations
**What**: User can mix elements from multiple templates
**Why**: Some problems need multiple approaches
**Implementation**: 
- User selects multiple templates
- System merges form fields (de-duplicate)
- Generates combined prompt
- Score reflects combination

Example: 
- User needs "both data analysis AND product perspective"
- Selects both "Data Analysis" + "Product Management"
- Gets hybrid prompt combining both

### Feature 4: Prompt Examples in Context  
**What**: Show real examples of "good" vs "bad" prompts for selected template
**Why**: Users learn by example
**Implementation**: Each template includes examples
- Bad example: Shows limitation
- Good example: Shows quality
- Click to see actual quality score

### Feature 5: Save & Track Effectiveness
**What**: Users can save generated prompts and track if they work
**Why**: Learning loop (see what works for them)
**Implementation**:
- Save to library (requires login)
- Rate: "Did this prompt work?" (Yes/No/Okay)
- See stats: Most-used prompts, highest-rated, etc
- Identify patterns: "I rate research prompts 4.2/5"

### Feature 6: Sharing & Discover
**What**: Share generated prompts, see what others created
**Why**: Community learning, authentication of effective prompts
**Implementation**:
- Generate shareable link
- Anyone can view (no login required)
- Shows quality score
- Comments/feedback from others
- "Trending prompts" section

### Feature 7: Advanced Options Panel
**What**: Customize tone, depth, format of generation
**Why**: Different users have different needs
**Implementation**: Expandable "Advanced Options"
- Tone slider: Formal ↔ Casual
- Depth slider: Brief ↔ Comprehensive
- Format: Text / Structured / Procedural / Narrative
- Audience level: Beginner / Intermediate / Expert
- Language: English / Spanish / etc [future]

Each option influences generation:
- Same template + different options = different prompt

### Feature 8: Pattern Detection & Suggestions
**What**: ML detects patterns in user behavior, suggests improvements
**Why**: Personalized guidance over time
**Implementation** [Phase 3+]:
- "You create a lot of [Domain] prompts"
- "We notice your [template] prompts score high when you include [X]"
- "Try this: [Suggestion based on your pattern]"

---

## 📊 ANALYTICS & METRICS

### Public Analytics Dashboard

**What's Tracked** (Anonymous):
- Total prompts generated: [123,456]
- Average quality score: [27.3/30]
- Most popular templates: [1. Code Gen, 2. Data Analysis, 3. Email]
- Community contributions: [523 shared prompts]
- Daily active users: [450]

**User Badge Rules** (If user logged in):
- "Prompt Master": Generated 50+ prompts
- "Quality Focus": Average score >28
- "Template Expert": Used 8+ templates
- "Community Helper": Shared 5+ prompts with positive feedback

### Success Metric: 100 Users
**How We Track**:
- Daily Active Users (DAU): [Current: 450]
- Week Active Users (WAU): [Current: 1,200]
- Monthly Active Users (MAU): [Current: 2,500]
- Goal: 100 concurrent users, all tracking data

**When We "Know"**:
- User creates account (email/GitHub)
- User generates at least 1 prompt
- User returns within 30 days

---

## 🔐 PRIVACY & COMPLIANCE

### Data Handling
- Prompts generated are **NOT stored** unless user explicitly saves
- Saved prompts are tied to user account
- Analytics events are **anonymous** (no user data in tracking)
- Compliance: GDPR, CCPA ready
- No ads, no third-party trackers

### For Shared Prompts
- User can choose: Private (only them) or Public (shareable)
- Public prompts include: Template used, quality score, not user name
- Comments allowed but moderated

---

## 🚀 PHASE 3 IMPLEMENTATION PLAN

### Week 1: Backend Setup
- [ ] Set up database (PostgreSQL)
- [ ] Implement template service (load from .md files)
- [ ] Implement semantic search (OpenAI embeddings)
- [ ] Build form generation service
- [ ] Build prompt generation service
- [ ] Build quality scoring service

### Week 2: Frontend Build
- [ ] React project setup (TypeScript + Tailwind)
- [ ] Search/entry interface component
- [ ] Template selector component
- [ ] Dynamic form builder
- [ ] Prompt generator display
- [ ] Quality scorer display

### Week 3: Integration & Polish
- [ ] Wire frontend ↔ backend
- [ ] User account service (GitHub OAuth)
- [ ] Save/library functionality
- [ ] Analytics integration
- [ ] Mobile responsive polish
- [ ] Error handling/edge cases

### Week 4: Launch & Monitor
- [ ] Deploy to Vercel (frontend)
- [ ] Deploy to Node server (backend)
- [ ] Set up monitoring/logging
- [ ] Public beta launch
- [ ] Gather feedback
- [ ] Iterate based on feedback

### Success Metrics (Month 1)
- 500+ prompts generated
- 100+ daily active users
- 28+ average quality score
- 5+ shared/public prompts
- 3+ "Prompt Master" users

---

## 🎯 COMPETITIVE DIFFERENTIATION

### vs originality.ai
| Feature | Ours | Theirs |
|---------|------|--------|
| Domains | 10 specialized | Generic |
| Quality score | Real-time 30-point | None |
| Scientific backing | Yes (45+ principles) | No |
| Free tier | Unlimited | Limited |
| Advanced options | Yes | Basic |
| API access | Coming | Yes |
| Templates | Customizable | Fixed |
| Community | Coming | None |

### Defensibility
1. **Content moat**: 10 domain templates (5,000+ lines each)
2. **Scientific framework**: 45 principles + 18 patterns
3. **Quality system**: 30-point scoring system
4. **Community**: Once launched, community builds

---

## 📝 SUCCESS DEFINITION

**Phase 2 Complete When**:
- ✅ All 10 domain templates created (DONE)
- ✅ Custom generator specs documented (THIS DOCUMENT)
- ✅ Architecture designed
- ✅ UI/UX wireframed
- ✅ Ready for Phase 3 development

**Phase 3 Complete When**:
- Web app deployed and live
- 500+ prompts generated
- 100+ daily active users (tracked)
- Analytics showing effective usage
- Community starting to form

**Phase 4 Complete When**:
- 100+ monthly active users
- 50+ shared community prompts
- Thought leadership established
- Ready for monetization/partnerships

---

**Document**: Custom Prompt Generator Specification  
**Created**: March 2026  
**Status**: Ready for Phase 3 Development  
**Next Step**: Assign development team + begin frontend setup  

