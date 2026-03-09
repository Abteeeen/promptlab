# 🏗️ PHASE 3: WEB APP ARCHITECTURE BLUEPRINT

**Project**: Prompt Engineering Science Platform - Web Application  
**Phase**: Phase 3 - Web App MVP Development  
**Timeline**: 4 weeks  
**Status**: Ready for Development  

---

## 🎯 PHASE 3 OBJECTIVES

### Primary Goal
**Build and deploy a fully functional web app** that allows users to:
1. Browse 10 domain templates
2. Search for templates using natural language
3. Generate custom prompts using interactive forms
4. Receive real-time quality scoring
5. Save and track prompts
6. Track analytics (know when 100 users active)

### Success Criteria
- [ ] Web app deployed (Vercel frontend + backend server)
- [ ] 500+ prompts generated in month 1
- [ ] 100+ daily active users tracked
- [ ] 28+ average quality score
- [ ] <1% critical bugs on launch
- [ ] Mobile responsive design working
- [ ] Analytics tracking correctly

---

## 🏛️ OVERALL ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (Vercel)                       │
│  React + TypeScript + Tailwind CSS                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  [Search Interface]  [Template Selector]  [Form Builder]   │
│         ↓                    ↓                    ↓          │
│  [Prompt Generator]  [Quality Scorer]  [Copy/Save]        │
│                                                              │
└─────────────────────────────────────────┬───────────────────┘
                                          │
                    ┌─────────────────────┴─────────────────────┐
                    │  API Gateway / REST Endpoints            │
                    └─────────────────────┬─────────────────────┘
                                          │
┌─────────────────────────────────────────┴─────────────────────┐
│              BACKEND (Node.js + Express)                       │
├──────────────┬──────────────┬──────────────┬──────────────────┤
│              │              │              │                  │
│  Template    │  Form        │  Prompt      │  Quality         │
│  Service     │  Generation  │  Generator   │  Scorer          │
│              │  Service     │  Service     │  Service         │
│              │              │              │                  │
└──────────────┴──────────────┴──────────────┴────────┬─────────┘
                                                       │
                    ┌──────────────────────────────────┼──────────┐
                    │                                  │          │
        ┌───────────▼──────────────┐    ┌─────────────▼──────┐   │
        │  PostgreSQL Database      │    │  Search Service    │   │
        │  (Users, Prompts, Events) │    │  (Embeddings)      │   │
        └──────────────────────────┘    └────────────────────┘   │
                                                                   │
                              ┌──────────────────────────────────┐│
                              │  Analytics  │  Logging  │  Misc  ││
                              └──────────────────────────────────┘│
```

---

## 📍 DETAILED COMPONENT ARCHITECTURE

### Frontend Components (React)

```
App
├── Layout
│   ├── Header (Logo, Nav, Auth)
│   ├── Sidebar (Navigation)
│   └── Footer (Links, Privacy)
│
├── Pages
│   ├── HomePage
│   │   ├── Hero section
│   │   ├── Search interface
│   │   ├── Template browser
│   │   └── Quick stats
│   │
│   ├── GeneratorPage
│   │   ├── TemplateSelector
│   │   ├── DynamicFormBuilder
│   │   │   ├── FormField (Text, Select, Checkbox, etc)
│   │   │   └── ProTips sidebar
│   │   ├── PromptDisplay
│   │   │   ├── Variation selector
│   │   │   ├── QualityScore display
│   │   │   └── Copy/Save actions
│   │   └── Sidebar: Template info, Examples
│   │
│   ├── TemplatePage
│   │   ├── Template content (read-only)
│   │   ├── Examples section
│   │   ├── Pro tips section
│   │   └── "Try it" button
│   │
│   ├── LibraryPage (requires auth)
│   │   ├── Saved prompts list
│   │   ├── Filter/Sort controls
│   │   ├── Prompt card (preview, rating, date)
│   │   └── Delete/Edit buttons
│   │
│   ├── AccountPage
│   │   ├── Profile info
│   │   ├── Settings
│   │   └── Stats dashboard
│   │
│   └── AdminPage (internal use)
│       ├── Analytics dashboard
│       ├── User metrics
│       └── Activity logs
│
└── Components (Reusable)
    ├── Button, Input, Select (Base UI)
    ├── Card, Modal, Toast (Containers)
    ├── TemplateCard, PromptCard (Domain)
    ├── QualityScoreDisplay (Domain)
    └── Analytics widgets (Domain)
```

### Backend Services (Node.js)

```
Express App
│
├── Routes
│   ├── /api/templates
│   │   ├── GET / (list all)
│   │   ├── GET /:id (single)
│   │   └── GET /search?q=query (search)
│   │
│   ├── /api/prompts
│   │   ├── POST / (generate)
│   │   ├── GET / (user's saved)
│   │   ├── POST /:id/save (save)
│   │   ├── DELETE /:id (delete)
│   │   └── POST /:id/rate (rate effectiveness)
│   │
│   ├── /api/forms
│   │   └── GET /:templateId (get form structure)
│   │
│   ├── /api/quality-score
│   │   └── POST / (score prompt)
│   │
│   ├── /api/users (OAuth)
│   │   ├── POST /auth/github (GitHub login)
│   │   ├── GET /profile (get user)
│   │   └── POST /logout
│   │
│   └── /api/analytics
│       ├── POST /event (track event)
│       └── GET /dashboard (stats - internal)
│
├── Services
│   ├── TemplateService
│   ├── FormGenerationService
│   ├── PromptGeneratorService
│   ├── QualityScorerService
│   ├── SearchService
│   ├── UserService
│   └── AnalyticsService
│
├── Database
│   ├── Templates (read-only, loaded from files)
│   ├── Users (accounts, preferences)
│   ├── UserPrompts (saved prompts)
│   └── AnalyticsEvents (tracking)
│
└── Utils
    ├── Auth middleware
    ├── Error handling
    └── Logging
```

---

## 🔌 API ENDPOINTS SPECIFICATION

### Template Endpoints

```
GET /api/templates
  Purpose: List all templates
  Response: [{id, name, description, category, quality}...]
  
GET /api/templates/:id
  Purpose: Get single template
  Response: {id, name, content, examples, proTips, ...}

GET /api/templates/search?q=query
  Purpose: Search templates by natural language
  Query params: q (required, min 3 chars)
  Response: [{id, name, relevance_score}...]
```

### Generator Endpoints

```
POST /api/prompts/generate
  Purpose: Generate prompt from template + form data
  Body: {templateId, formData, options}
  Response: {prompt, variations, qualityScore}
  
POST /api/prompts/save
  Purpose: Save generated prompt to user library
  Body: {prompt, template, name, tags}
  Response: {id, savedAt}
  
GET /api/prompts
  Purpose: Get user's saved prompts (requires auth)
  Response: [{id, name, template, score, createdAt}...]
  
DELETE /api/prompts/:id
  Purpose: Delete saved prompt
  Response: {success: true}
  
POST /api/prompts/:id/rate
  Purpose: Rate if prompt was effective
  Body: {rating} (yes/no/okay)
  Response: {success: true}
```

### Form Endpoints

```
GET /api/forms/:templateId
  Purpose: Get form structure for template
  Response: {fields: [{name, type, label, help, options}...]}
  
POST /api/forms/:templateId/validate
  Purpose: Validate form data before generation
  Body: {formData}
  Response: {valid, errors: []}
```

### Quality Score Endpoint

```
POST /api/quality-score
  Purpose: Score a prompt
  Body: {promptText, templateId}
  Response: {
    overallScore: 28,
    breakdown: {clarity: 3, completeness: 3, ...},
    rating: "Excellent",
    suggestion: "Add confidence levels"
  }
```

### User/Auth Endpoints

```
POST /api/auth/github
  Purpose: GitHub OAuth login
  Body: {code}
  Response: {token, user: {id, name, email}}
  
GET /api/users/profile
  Purpose: Get current user (requires token)
  Response: {id, name, email, createdAt, promptsCount}
  
POST /api/auth/logout
  Purpose: Logout (clear session)
  Response: {success: true}
```

### Analytics Endpoints

```
POST /api/analytics/event
  Purpose: Track user event
  Body: {event, templateId, sessionId, metadata}
  Response: {success: true}
  
GET /api/analytics/dashboard (internal)
  Purpose: Get analytics summary (admin only)
  Response: {dau, mau, avgScore, popularTemplates, ...}
```

---

## 💾 DATABASE SCHEMA (PostgreSQL)

### Table: templates
```sql
CREATE TABLE templates (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  content JSONB,        -- Full template content
  brackets TEXT[],      -- Array of placeholders
  examples JSONB,       -- Example prompts
  pro_tips TEXT[],      -- Array of tips
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Table: users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE,
  github_id VARCHAR(255) UNIQUE,
  name VARCHAR(255),
  avatar_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  subscription VARCHAR(50) DEFAULT 'free',
  preferences JSONB      -- User settings
);
```

### Table: user_prompts
```sql
CREATE TABLE user_prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  template_id VARCHAR(50) REFERENCES templates(id),
  name VARCHAR(255),
  prompt_text TEXT NOT NULL,
  quality_score INTEGER,  -- 0-30
  tags TEXT[],
  rating VARCHAR(20),     -- yes/no/okay
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_used_at TIMESTAMP,
  usage_count INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT false
);
```

### Table: analytics_events
```sql
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(100) NOT NULL,  -- prompt_created, template_viewed, etc
  template_id VARCHAR(50),
  user_id UUID,           -- NULL for anonymous
  session_id VARCHAR(100),
  quality_score INTEGER,
  metadata JSONB,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🎨 UI COMPONENT LIBRARY (Tailwind CSS)

### Core Components
```
Colors:
- Primary: #3B82F6 (Blue)
- Secondary: #8B5CF6 (Purple)
- Success: #10B981 (Green)
- Error: #EF4444 (Red)
- Background: #F9FAFB (Light)
- Surface: #FFFFFF (White)

Typography:
- Hero: 48px / 700 weight
- H1: 36px / 700 weight
- H2: 28px / 600 weight
- Body: 16px / 400 weight
- Small: 14px / 400 weight

Spacing:
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px

Breakpoints:
- Mobile: <640px
- Tablet: 640px-1024px
- Desktop: >1024px
```

### Component Examples
```
Button:
- Primary (filled)
- Secondary (outline)
- Ghost (text)
- Sizes: sm, md, lg
- States: default, hover, active, disabled

Input:
- Text, email, password, number
- Validation states (error, success)
- Labels, help text, icons

Card:
- Minimal padding (16px)
- Border: 1px #E5E7EB
- Hover: slight shadow elevation
- Responsive: stack on mobile

Modal:
- Overlay semi-transparent
- Center on screen
- Max width: 600px
- Mobile: full screen
```

---

## 📊 ANALYTICS TRACKING PLAN

### Events to Track

```
User Journey:
1. page_view
   - which page
   - device type (mobile/desktop)
   - referrer source

2. template_viewed
   - template_id
   - time spent
   - clicked "try it" Y/N

3. search_attempted
   - search_query
   - results_count
   - clicked_template

4. form_started
   - template_id
   - quick_fill vs advanced

5. form_submitted
   - template_id
   - form_fields_filled
   - time_to_complete

6. prompt_generated
   - template_id
   - quality_score
   - variant_selected (1/2/3)

7. prompt_saved
   - template_id
   - tags_added
   - quality_score

8. prompt_shared
   - template_id
   - shared_via (copy link/URL)

9. user_signup
   - referrer_source
   - email_or_github

10. user_returned (daily)
    - days_since_signup
```

### Success Metrics

```
Engagement:
- Daily active users (DAU)
- Prompts per user (avg)
- Session duration (avg)

Quality:
- Average quality score
- Score distribution
- Prompts >25 (%)

Conversion:
- Visitor → Signup: 3%
- Signup → Prompt: 50%
- Prompt → Save: 20%

Retention:
- 1-day: 40%
- 7-day: 15%
- 30-day: 8%

Satisfaction:
- Templates with >80% positive ratings
- Share rate (% of prompts shared)
- Return rate (% returning weekly)
```

---

## 🚀 DEPLOYMENT ARCHITECTURE

### Frontend Deployment (Vercel)

```
Repository Structure:
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/ (API calls)
│   ├── hooks/
│   ├── types/
│   └── App.tsx
├── public/
├── package.json
└── vercel.json

Deployment:
- Push to GitHub
- Vercel auto-deploys on merge to main
- Environment variables in Vercel dashboard
- Domain: promptengineering.science (or similar)
```

### Backend Deployment (Railway or Fly.io)

```
Repository Structure:
backend/
├── src/
│   ├── routes/
│   ├── services/
│   ├── models/
│   ├── utils/
│   ├── middleware/
│   └── app.ts
├── templates/ (markdown files loaded at startup)
├── package.json
└── .env.example

Deployment:
- Docker container
- Environment variables in platform dashboard
- PostgreSQL database (Railway or external)
- Auto-redeploy on GitHub push
- API: api.promptengineering.science
```

### Environment Variables

```
FRONTEND:
REACT_APP_API_URL=https://api.promptengineering.science
REACT_APP_GA_ID=... (analytics)

BACKEND:
DATABASE_URL=postgresql://...
JWT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
OPENAI_API_KEY=... (for semantic search)
PORT=3000
NODE_ENV=production
```

---

## 🔒 Security Considerations

### Authentication
- GitHub OAuth (no passwords stored)
- JWT tokens for API auth
- Tokens expire after 30 days
- Refresh token rotation

### Data Protection
- HTTPS only (enforced)
- Password hashing (bcrypt) if emails used
- Secrets in environment variables
- CORS configured correctly

### Rate Limiting
- 100 requests/minute per IP (public)
- 1000 requests/minute per user (authenticated)
- Prevents abuse

### Input Validation
- Form inputs validated on frontend and backend
- Prompt text length limits (max 5000 chars)
- SQL injection prevention (parameterized queries)
- XSS prevention (sanitize user inputs)

---

## 📈 SCALABILITY PLAN

### Current (Month 1)
- 100+ DAU expected
- PostgreSQL single instance
- Express server (small instance)
- Vercel (auto-scales)

### Future (Months 3-6)
- 1000+ DAU
- Database optimization (indexes, partitioning)
- Caching layer (Redis)
- Horizontal scaling (multiple servers)
- CDN for static assets

### Very Future (Year 1)
- 10000+ DAU
- Database read replicas
- Microservices (if needed)
- Advanced analytics warehouse

---

## 🛠️ DEVELOPMENT WORKFLOW

### Week 1: Backend Foundation
```
Day 1-2: Setup
- Initialize Node + Express
- Set up PostgreSQL
- Create folder structure
- Configure environment

Day 3-4: Core Services
- TemplateService (load from files)
- FormGenerationService
- API endpoints for templates/forms

Day 5: Integration
- Test endpoints
- Error handling
- Basic logging
```

### Week 2: Frontend Build
```
Day 1-2: Setup
- Create React app (TypeScript)
- Install Tailwind CSS
- Folder structure
- Setup CSS

Day 3-4: Components
- Build search interface
- Build template selector
- Build dynamic form
- Build prompt display

Day 5: Integration
- Connect to backend
- Test API calls
- Error handling
```

### Week 3: Features
```
Integration:
- Quality scorer
- User authentication
- Save/library
- Analytics

Polish:
- Mobile responsive
- Error messages
- Loading states
- Accessibility
```

### Week 4: Launch
```
Thursday: Pre-launch checks
- Full regression test
- Performance testing
- Mobile testing
- Security audit

Friday: Deploy
- Deploy frontend (Vercel)
- Deploy backend (Railway)
- Smoke tests
- Monitor analytics

Monitor:
- Check error logs
- Monitor availability
- Gather feedback
```

---

## ✅ LAUNCH CHECKLIST

- [ ] All endpoints tested and working
- [ ] Frontend fully responsive (mobile/tablet/desktop)
- [ ] Authentication working (GitHub OAuth)
- [ ] Database backups configured
- [ ] Error monitoring set up (Sentry)
- [ ] Analytics tracking verified
- [ ] Performance acceptable (<300ms response)
- [ ] Mobile app not needed (PWA is sufficient)
- [ ] Documentation complete
- [ ] Privacy policy written
- [ ] Terms of service written
- [ ] Status page created (uptime tracking)
- [ ] Support email configured
- [ ] Landing page/marketing ready
- [ ] Social media accounts ready
- [ ] Beta testers lined up (5-10 people)

---

## 🎯 SUCCESS CRITERIA - LAUNCH

**Must Have** (100% critical):
- ✅ Web app loads and doesn't crash
- ✅ Can search and select templates
- ✅ Can generate prompts
- ✅ Can save prompts (with auth)
- ✅ Quality scoring works
- ✅ Analytics tracking user activity
- ✅ Mobile viewing works (responsive)

**Should Have** (90% complete):
- ✅ Share prompt links
- ✅ Rate prompt effectiveness
- ✅ Library view with filtering
- ✅ Smooth animations/transitions
- ✅ Error messages helpful
- ✅ Copy to clipboard works

**Nice To Have** (80% complete):
- ✅ Advanced form options
- ✅ Template browsing/reading
- ✅ Prompt variations
- ✅ Dark mode support
- ✅ Keyboard shortcuts

---

**Document**: Phase 3 Web App Architecture Blueprint  
**Status**: Ready for Engineering Team  
**Next**: Assign developers, begin implementation  
**Expected Completion**: 4 weeks  

