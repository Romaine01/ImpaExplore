# ImpaExplore — Complete Project Scaffolding and Implementation Blueprint

**Project:** ImpaExplore  
**Tagline:** Discover Places. Meet Local Guides.  
**Type:** Independent tourism discovery and guide-booking Progressive Web App (PWA)  
**Coverage:** Impasugong, Bukidnon, Philippines  
**Delivery:** Responsive, installable PWA for supported mobile and desktop browsers  
**Status:** Full proposed scaffolding specification (source code not yet generated)

## 1. Project Overview

ImpaExplore is an independently operated, responsive web platform where visitors can discover destinations in Impasugong, compare local tour guides, view public guide social media links, and explore available experiences. Visitors can browse without creating an account. Registered tourists can request and manage bookings; guides can manage their listings and requests; platform staff moderate content and review guide applications.

**Independence:** ImpaExplore is not affiliated with or operated by the municipal tourism office, LGU, or Department of Tourism. Any platform verification must be clearly distinguished from government accreditation.

## 2. Product Principles

1. **Browse first:** Destinations, published packages, guide listings, profiles, maps, and public social links are accessible to guests.
2. **Register only when needed:** An account is required for in-platform booking management, favorites, and post-tour reviews.
3. **Guide-controlled presence:** Approved guides maintain their own profiles, services, availability, and public social links.
4. **Transparent trust:** Platform-reviewed profiles do not imply official accreditation; show precisely what has been checked.
5. **Mobile first:** Optimize for phones, slow connections, accessibility, and clear calls to action.
6. **No fabricated content:** Guide identities, prices, credentials, destinations, reviews, and availability must come from real verified inputs.

## 3. Account Roles and Access

| Capability | Guest | Tourist | Guide | Platform Admin | Super Admin |
|---|:---:|:---:|:---:|:---:|:---:|
| Browse public destinations, guides, and packages | Yes | Yes | Yes | Yes | Yes |
| Open public guide social media/contact links | Yes | Yes | Yes | Yes | Yes |
| Search/filter destinations and guides | Yes | Yes | Yes | Yes | Yes |
| Save favorites | No | Yes | Optional | No | No |
| Request/manage own bookings | No | Yes | As tourist role | No | No |
| Review own completed tours | No | Yes | As tourist role | No | No |
| Apply to become a guide | Yes (registration required) | Yes | — | — | — |
| Edit own guide profile, packages, availability | No | No | Yes | Moderation only | Yes |
| Accept/decline assigned booking requests | No | No | Yes | Oversight only | Oversight |
| Review guide applications and moderate listings | No | No | No | Yes | Yes |
| Manage platform roles, settings, and admins | No | No | No | No | Yes |

**Note:** Guest is an unauthenticated access state, not a stored account role. A single user may hold tourist and guide roles. Enforce all authorization on the server.

## 4. Core User Journeys

### Guest browsing
`Home → Browse destinations → Destination details → Available guides → Guide profile → Social link / Sign in to request booking`

### Registered tourist booking
`Sign up / Sign in → Select destination and guide → Select date and group size → Submit request → Await guide response → View booking status → Complete tour → Eligible review`

### Guide onboarding
`Register → Apply as guide → Submit profile and supporting evidence → Admin review → Approved / Changes requested / Rejected → Publish listing`

### Guide booking management
`Guide dashboard → New requests → Check schedule → Accept / Decline → Confirm arrangements → Mark completed (with appropriate verification)`

## 5. MVP Scope

### Public website
- Home / landing page
- Destination directory with search and category filters
- Destination details: gallery, description, location, difficulty, requirements, and related guides
- Guide directory with search and filters
- Public guide profiles: bio, experience, specialties, destinations, services, and social links
- Published packages and indicative prices
- Basic map/location links (interactive map may be phase 2)
- About, contact, privacy policy, terms, safety/disclaimer pages

### Accounts and dashboards
- Email/password registration, verification, sign-in, password reset
- Tourist profile and booking history
- Guide application and platform review
- Guide profile editor, social links, packages, availability
- Booking request and response workflow
- Platform Admin: guide review, destination/content moderation, booking oversight
- Super Admin: account/role management, system settings, audit log access

### Deferred until phase 2
- Payment processing, refunds, and payouts
- Full real-time chat
- Complex availability optimization
- Automated social media feeds
- Recommendations/AI itinerary generation
- Accommodation and transport marketplace
- Mobile app
- Advanced analytics

## 6. Suggested Technology Stack

| Layer | Suggested technology |
|---|---|
| Frontend | React + Vite + TypeScript + PWA support (e.g., vite-plugin-pwa) |
| UI | Tailwind CSS |
| Routing | React Router |
| API | Node.js + Express + TypeScript |
| Database | MongoDB Atlas + Mongoose |
| Authentication | Secure HTTP-only session cookies or carefully managed access/refresh tokens |
| Validation | Zod (request and form validation) |
| Media | Cloudinary or compatible object storage |
| Maps | Mapbox or Google Maps (subject to costs and terms) |
| Email | Transactional email provider |
| Testing | Vitest, React Testing Library, Supertest, Playwright |
| Deployment | HTTPS-enabled frontend and API hosting; managed database |

Technology choices are proposals, not finalized implementation decisions.

## 7. Separate Frontend and Backend Folder Structure

```text
impaexplore/
├── frontend/                       # React + Vite + TypeScript
│   ├── README.md
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── public/
│   │   ├── icons/                # Installable app icons (192/512 and maskable)
│   │   ├── favicon.ico
│   │   └── offline.html
│   └── src/
│       ├── main.tsx
│       ├── pwa/                   # Install prompt, update notice, offline UI
│       ├── app/
│       │   ├── App.tsx
│       │   ├── router.tsx
│       │   └── providers/
│       ├── assets/
│       ├── components/
│       │   ├── layout/
│       │   ├── common/
│       │   └── ui/
│       ├── features/
│       │   ├── auth/
│       │   ├── destinations/
│       │   ├── guides/
│       │   ├── packages/
│       │   ├── bookings/
│       │   ├── favorites/
│       │   └── admin/
│       ├── pages/
│       │   ├── public/
│       │   ├── tourist/
│       │   ├── guide/
│       │   └── admin/
│       ├── hooks/
│       ├── lib/
│       ├── services/               # API client and requests
│       ├── styles/
│       └── types/
├── backend/                        # Node.js + Express + TypeScript
│   ├── README.md
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── server.ts
│       ├── app.ts
│       ├── config/
│       ├── db/
│       ├── middleware/
│       │   ├── auth.ts
│       │   ├── requireRole.ts
│       │   ├── validate.ts
│       │   ├── rateLimit.ts
│       │   └── errorHandler.ts
│       ├── modules/
│       │   ├── auth/
│       │   ├── users/
│       │   ├── guideApplications/
│       │   ├── guides/
│       │   ├── destinations/
│       │   ├── packages/
│       │   ├── availability/
│       │   ├── bookings/
│       │   ├── reviews/
│       │   ├── favorites/
│       │   ├── notifications/
│       │   └── admin/
│       ├── jobs/
│       ├── utils/
│       └── tests/
├── docs/
│   ├── PROJECT_SCAFFOLD.md
│   ├── REQUIREMENTS.md
│   ├── API_SPEC.md
│   ├── DATABASE_SCHEMA.md
│   ├── USER_FLOWS.md
│   ├── SECURITY.md
│   └── DEPLOYMENT.md
├── README.md
└── .gitignore
```

**Separation rule:** `frontend/` and `backend/` are independently installable and runnable projects with their own `package.json`, environment configuration, and dependencies. The frontend communicates with the backend only through documented HTTP API endpoints (for example, `/api/v1/...`). Configure the frontend API base URL through `VITE_API_BASE_URL`; configure backend secrets and database connection through backend-only environment variables. Never expose backend secrets using Vite's `VITE_` prefix. Shared request/response contracts can be documented in `docs/API_SPEC.md` or generated from an OpenAPI schema.\n\n**Scaffold convention:** Each API module can contain `*.model.ts`, `*.schema.ts`, `*.service.ts`, `*.controller.ts`, `*.routes.ts`, and module tests. Keep business rules in services and validate every input.

## 8. Suggested Frontend Routes

| Route | Access | Purpose |
|---|---|---|
| `/` | Public | Landing page |
| `/destinations` | Public | Destination directory |
| `/destinations/:slug` | Public | Destination details |
| `/guides` | Public | Guide directory |
| `/guides/:slug` | Public | Guide details and social links |
| `/experiences` | Public | Tour packages/experiences |
| `/experiences/:slug` | Public | Package details |
| `/about` | Public | Independent platform information |
| `/login` | Guest | Sign in |
| `/register` | Guest | Register |
| `/apply-as-guide` | Signed in | Guide application |
| `/dashboard` | Tourist | Tourist overview |
| `/dashboard/bookings` | Tourist | Own booking requests |
| `/dashboard/favorites` | Tourist | Saved listings |
| `/guide/dashboard` | Approved guide | Guide overview |
| `/guide/profile` | Guide | Edit own profile |
| `/guide/packages` | Guide | Manage own packages |
| `/guide/availability` | Guide | Manage schedule |
| `/guide/bookings` | Guide | Respond to assigned bookings |
| `/admin` | Admin | Operational overview |
| `/admin/guide-applications` | Admin | Review guide applications |
| `/admin/destinations` | Admin | Manage destination listings |
| `/admin/reports` | Admin | Moderation/booking reports |
| `/super-admin` | Super Admin | System management |

A guide application pending approval may access application status but not the approved-guide dashboard.

## 9. Proposed API Routes (v1)

```text
PUBLIC
GET    /api/v1/destinations
GET    /api/v1/destinations/:slug
GET    /api/v1/guides
GET    /api/v1/guides/:slug
GET    /api/v1/packages
GET    /api/v1/packages/:slug

AUTH
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/verify-email
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password
GET    /api/v1/auth/me

TOURIST (AUTHENTICATED)
POST   /api/v1/bookings
GET    /api/v1/bookings/mine
GET    /api/v1/bookings/:id
POST   /api/v1/favorites
DELETE /api/v1/favorites/:id
POST   /api/v1/reviews

GUIDE
POST   /api/v1/guide-applications
GET    /api/v1/guide-applications/mine
PATCH  /api/v1/guide/profile
POST   /api/v1/guide/packages
PATCH  /api/v1/guide/packages/:id
PATCH  /api/v1/guide/availability
GET    /api/v1/guide/bookings
PATCH  /api/v1/guide/bookings/:id/respond

ADMIN
GET    /api/v1/admin/guide-applications
PATCH  /api/v1/admin/guide-applications/:id/review
POST   /api/v1/admin/destinations
PATCH  /api/v1/admin/destinations/:id
GET    /api/v1/admin/bookings
GET    /api/v1/admin/audit-logs

SUPER ADMIN
GET    /api/v1/super-admin/users
PATCH  /api/v1/super-admin/users/:id/roles
PATCH  /api/v1/super-admin/settings
```

All private endpoints must enforce ownership and role checks on the backend. API design is provisional.

## 10. Initial Data Collections

| Collection | Key fields / relationships |
|---|---|
| `users` | email (unique), passwordHash, roles, status, emailVerifiedAt |
| `tourist_profiles` | userId, displayName, contact preferences |
| `guide_profiles` | userId, publicName, bio, specialties, serviceAreas, languages, socialLinks, status |
| `guide_applications` | userId, submitted details, evidence references, reviewStatus, reviewedBy |
| `destinations` | name, slug, category, barangay, coordinates, description, rules, publicationStatus |
| `guide_destinations` | guideId, destinationId, service details |
| `tour_packages` | guideId, destinationIds, title, inclusions, price, capacity, publicationStatus |
| `guide_availability` | guideId, date/time ranges, blackout periods |
| `bookings` | touristId, guideId, packageId, date, partySize, status, priceSnapshot |
| `reviews` | bookingId (unique), touristId, guideId, rating, text, moderationStatus |
| `favorites` | userId, targetType, targetId |
| `notifications` | recipientId, type, message, readAt |
| `audit_logs` | actorId, action, entity, entityId, timestamp, minimal change metadata |

**Relationships:** One user may own one guide profile; guides may serve multiple destinations; packages belong to guides; bookings reference the requesting tourist and chosen guide/package. Use references, indexes, unique constraints, and deletion rules appropriate to the final schema.

## 11. Booking State Machine

```text
PENDING → ACCEPTED → CONFIRMED → COMPLETED
   │         │          │
   ├──→ DECLINED        └──→ CANCELLED
   └──→ CANCELLED
```

Define who can trigger each transition, cancellation windows, and whether `ACCEPTED` and `CONFIRMED` are both necessary before implementation. For MVP, **PENDING → CONFIRMED / DECLINED / CANCELLED → COMPLETED** may be sufficient. Prevent double-booking with atomic availability checks or transaction-safe logic.

## 12. Guide Verification Policy

- Guide applications are reviewed by **ImpaExplore Platform Admins**, not a government office.
- Verify identity and submitted information according to a documented internal process.
- Do not publicly expose ID documents, personal addresses, or sensitive evidence.
- Use a label such as **“Profile reviewed by ImpaExplore”** with a plain-language explanation of the review.
- Do not use **“DOT-accredited”**, **“LGU-certified”**, or **“official guide”** unless supported by valid, independently checked credentials and appropriate permission.
- Provide appeal/correction, suspension, and reporting procedures.

## 13. Security and Privacy Baseline

- Password hashing with Argon2id or bcrypt; never store plaintext passwords.
- Server-side RBAC and record ownership checks for every private endpoint.
- Email verification, password reset, login rate limiting, and admin MFA.
- Secure cookies, HTTPS, CSRF protection where relevant, input validation, and strict CORS.
- Upload type/size checks and protected storage for application evidence.
- Minimal personal-data collection, consent notices, retention/deletion rules, and access logging.
- Review obligations under the Philippine Data Privacy Act of 2012.
- Treat social links as user-supplied external URLs; validate and label them.
- Never claim live availability, verified pricing, or safety guarantees without supporting data.

## 14. UI / UX Direction

- **Brand:** ImpaExplore
- **Primary:** Forest Green `#1B5E20`
- **Secondary:** Deep Green `#2E7D32`
- **Accent:** Warm Gold `#CA8A04`
- **Surface:** `#FAFAF8`
- **Canvas:** `#F4F1EB`
- **Typography:** Clean, legible sans serif
- **Design:** Modern editorial travel aesthetic, large authentic destination imagery, clear filters, restrained motion
- **Responsive:** Mobile-first; accessible labels, contrast, keyboard navigation, and image alternatives

**Homepage sections:** Navigation → Hero/search → Featured destinations → Find a local guide → How it works → Experiences → Responsible travel → Footer.

## 15. Implementation Milestones

### Phase 0 — Validation
- [ ] Confirm product owner, operating model, and platform policies
- [ ] Interview prospective guides and tourists
- [ ] Collect permissioned destination photos and factual details
- [ ] Confirm guide onboarding, verification, and booking policies
- [ ] Confirm branding/domain availability

### Phase 1 — Foundation
- [ ] Initialize independent `frontend/` and `backend/` projects with TypeScript, linting, and formatting
- [ ] Configure backend API, MongoDB, backend-only environment variables, and error handling
- [ ] Implement authentication and server-side authorization
- [ ] Configure frontend API base URL, CORS/cookie strategy, and responsive UI components
- [ ] Configure PWA manifest, service worker, app icons, offline fallback, and update flow

### Phase 2 — Public Discovery
- [ ] Destination list and detail pages
- [ ] Guide list and public profiles
- [ ] Search, filters, social links, and packages
- [ ] Seed only clearly labeled demo content during development

### Phase 3 — Guide Operations
- [ ] Guide application and admin review
- [ ] Guide profile/package editing
- [ ] Availability management
- [ ] Platform moderation and audit trails

### Phase 4 — Booking
- [ ] Tourist booking form and history
- [ ] Guide request handling
- [ ] Booking status notifications
- [ ] Cancellation rules and conflict prevention

### Phase 5 — Quality and Launch
- [ ] Unit, integration, end-to-end, accessibility, and security testing
- [ ] Verify real listings, prices, contact links, and permissions
- [ ] Add legal/privacy/safety content
- [ ] Deploy staging, run pilot, address findings, then launch

## 16. MVP Acceptance Criteria

- A visitor can browse destinations, guides, packages, and public social links **without signing in**.
- Guest access never reveals private user records or guide verification evidence.
- A tourist can register, submit a booking request, and view only their own bookings.
- A guide can apply; a pending applicant cannot claim platform-reviewed status.
- An approved guide can edit only their own listings and respond only to their own bookings.
- Platform Admin can review applications and moderate content but cannot change Super Admin privileges.
- Admin actions are logged, and role/ownership bypass attempts are rejected.
- All displayed reviews originate from eligible completed bookings.
- The website does not imply any LGU, tourism-office, or DOT affiliation.

## 17. Open Decisions

1. Will guest visitors be allowed to submit a lightweight inquiry without an account, or only contact guides via external social links?
2. Is booking a request only, or does the platform guarantee a reservation after guide acceptance?
3. Will guide rates be mandatory, optional, or inquiry-based?
4. What evidence will ImpaExplore require before marking a guide profile as reviewed?
5. Which initial destinations and guides have agreed to be listed?
6. Which hosting, map, media, and email providers fit the budget?

---

**Next engineering deliverable:** Generate actual source files inside the separate `frontend/` and `backend/` folders, then implement authentication, public destination/guide listings, guide onboarding, and the booking-request flow in that order.

---
## 18. Complete Page and Component Inventory

### 18.1 Public pages
| Page | Main UI components | Data needed | Guest access |
|---|---|---|---|
| Home | Header, hero, destination search, featured guides, destination cards, footer | Featured published records | Yes |
| Destinations | Search, filters, sort, cards, pagination, empty states | Public destination list | Yes |
| Destination details | Gallery, map, description, requirements, related guides | Destination + associated guides | Yes |
| Guides | Search, specialty filters, location filters, guide cards | Approved public guide profiles | Yes |
| Guide details | Photo, bio, services, public social links, packages, inquiry CTA | Public guide profile | Yes |
| Experiences | Package cards, filters, prices, inclusions | Published packages | Yes |
| Experience details | Gallery, itinerary, inclusions, guide, request CTA | Published package | Yes |
| About | Mission, independent-operation disclosure, platform policies | Managed content | Yes |
| Contact | Contact details, abuse/reporting contact | Managed content | Yes |
| Legal | Terms, privacy, safety, accessibility | Versioned policy pages | Yes |
| Not found | Helpful navigation | None | Yes |

### 18.2 Auth and tourist pages
| Page | Main purpose |
|---|---|
| Register | Tourist account creation; optional guide application path |
| Login | Single login for all registered roles |
| Verify email | Email ownership verification |
| Forgot/reset password | Secure credential recovery |
| Tourist dashboard | Booking summary and shortcuts |
| My bookings | Status list and request details |
| Booking request | Destination, guide, date, group size, notes |
| Favorites | Saved destinations and guides |
| Profile/settings | Account and contact preferences |
| My reviews | Review completed, eligible bookings |

### 18.3 Guide pages
| Page | Main purpose |
|---|---|
| Guide application | Submit identity, services, qualifications, consent |
| Application status | Pending, changes requested, approved, rejected |
| Guide dashboard | Bookings and listing performance summary |
| Edit profile | Public bio, gallery, specialties, languages, social links |
| Manage destinations | Choose destinations the guide actually serves |
| Manage packages | Publish, unpublish, update prices and inclusions |
| Manage availability | Dates, capacity, blackout periods |
| Guide bookings | Review, accept, decline, cancel as permitted |
| Guide reviews | Read and report reviews |
| Guide settings | Contact preferences and account settings |

### 18.4 Admin pages
| Page | Main purpose |
|---|---|
| Admin overview | Platform metrics and operational queues |
| Applications | Review guide submissions and evidence |
| Guide listings | Suspend, restore, request edits, manage visibility |
| Destinations | Create, edit, publish and archive destinations |
| Packages | Moderate packages and reports |
| Bookings | Read-only oversight and issue handling |
| Reviews/reports | Handle reports, moderation decisions |
| Content | Homepage highlights, notices, legal-page drafts |
| Audit logs | Inspect privileged actions |
| Super Admin users | Invite admins and manage privileged roles |
| Super Admin settings | Platform-wide settings and policies |

## 19. Frontend Detailed Folder Conventions

```text
frontend/src/
├── app/
│   ├── App.tsx
│   ├── router.tsx
│   ├── providers/
│   │   ├── AuthProvider.tsx
│   │   └── QueryProvider.tsx
│   └── guards/
│       ├── RequireAuth.tsx
│       └── RequireRole.tsx
├── components/
│   ├── layout/
│   │   ├── SiteHeader.tsx
│   │   ├── SiteFooter.tsx
│   │   ├── PublicLayout.tsx
│   │   └── DashboardLayout.tsx
│   ├── common/
│   │   ├── EmptyState.tsx
│   │   ├── ErrorState.tsx
│   │   ├── LoadingState.tsx
│   │   └── Pagination.tsx
│   └── ui/                     # Reusable accessible primitives
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api.ts
│   │   └── types.ts
│   ├── destinations/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api.ts
│   │   └── types.ts
│   ├── guides/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api.ts
│   │   └── types.ts
│   ├── packages/
│   ├── bookings/
│   ├── favorites/
│   └── admin/
├── pages/
│   ├── public/
│   ├── auth/
│   ├── tourist/
│   ├── guide/
│   ├── admin/
│   └── superAdmin/
├── services/
│   ├── httpClient.ts
│   └── apiError.ts
├── hooks/
├── lib/
├── types/
├── styles/
├── assets/
└── main.tsx
```

**Rules:** Pages compose features; feature modules own their API requests and UI; reusable primitives contain no business rules. Do not rely on client-side route guards as security enforcement. All public pages must render meaningful empty/error states. Provide keyboard-accessible forms and dialogs.

## 20. Backend Detailed Module Conventions

```text
backend/src/
├── app.ts
├── server.ts
├── config/
│   ├── env.ts
│   ├── cors.ts
│   └── logger.ts
├── db/
│   ├── connect.ts
│   └── indexes.ts
├── middleware/
│   ├── authenticate.ts
│   ├── authorize.ts
│   ├── requireOwnership.ts
│   ├── validateRequest.ts
│   ├── rateLimit.ts
│   └── errorHandler.ts
├── modules/
│   ├── auth/
│   │   ├── auth.routes.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.schema.ts
│   │   └── auth.test.ts
│   ├── users/
│   ├── touristProfiles/
│   ├── guideApplications/
│   ├── guides/
│   ├── destinations/
│   ├── packages/
│   ├── availability/
│   ├── bookings/
│   ├── favorites/
│   ├── reviews/
│   ├── notifications/
│   ├── uploads/
│   ├── reports/
│   └── admin/
├── jobs/
├── utils/
└── tests/
    ├── integration/
    └── fixtures/
```

**Rules:** Route → authentication/authorization/validation → controller → service → model. Services own business logic; controllers only translate HTTP requests/responses. Centralize error handling and logging. Never return password hashes, verification evidence, private phone numbers, or internal moderation notes from public serializers.

## 21. Data Model Details and Indexes

### 21.1 `users`
- `email`: normalized lowercase; unique indexed.
- `passwordHash`: nullable only for supported external-auth identities.
- `roles`: array, e.g., `["tourist"]` or `["tourist", "guide"]`.
- `status`: `active | suspended | disabled`.
- `emailVerifiedAt`, `createdAt`, `updatedAt`.
- Optional external authentication identities in a separate linked collection.
- Never expose password hashes in responses.

### 21.2 `guide_profiles`
- `userId`: unique indexed user reference.
- `slug`: unique indexed public URL identifier.
- `displayName`, `bio`, `avatarUrl`, `gallery`.
- `specialties[]`, `languages[]`, `serviceAreas[]`.
- `socialLinks`: allowlisted keys and validated HTTPS URLs.
- `publicationStatus`: `draft | published | hidden | suspended`.
- `reviewStatus`: `not_submitted | pending | changes_requested | approved | rejected`.
- `reviewedAt`, `lastUpdatedAt`.
- Do not expose uploaded ID/evidence file URLs.

### 21.3 `destinations`
- `name`, unique `slug`, `category`, `barangay`, `summary`, `description`.
- `geo`: GeoJSON Point where verified coordinates exist.
- `gallery[]`, `difficulty`, `estimatedDuration`, `accessNotes`, `requirements[]`.
- `status`: `draft | published | archived`.
- Recommended indexes: unique `slug`, `status`, optional `2dsphere` for geo.
- Do not publish unverified trail safety or access restrictions as authoritative.

### 21.4 `tour_packages`
- `guideId`, `destinationIds[]`, `title`, `slug`, `description`.
- `duration`, `inclusions[]`, `exclusions[]`, `capacityMin`, `capacityMax`.
- `priceAmount`, `currency: "PHP"`, `pricingUnit`, `priceNotes`.
- `status`: `draft | published | archived`.
- Price fields must be optional if the business model allows “inquire for price.”
- Validate that the owner is an approved, publishable guide.

### 21.5 `bookings`
- `touristId`, `guideId`, `destinationId`, optional `packageId`.
- `requestedStartAt`, optional `requestedEndAt`, `partySize`, `notes`.
- `status`, `statusHistory[]`, `quotedPriceSnapshot`, `currency`.
- `createdAt`, `updatedAt`, `respondedAt`, `completedAt`.
- Index `(guideId, requestedStartAt, status)` and `(touristId, createdAt)`.
- Store date/time with an explicit timezone strategy (UTC storage; Asia/Manila presentation).
- Avoid including unnecessary personal or health details in free-text fields.

### 21.6 `guide_applications`
- `userId`, `submittedAt`, `status`, `reviewerId`, `decisionAt`.
- `submittedProfileSnapshot`, private evidence references, review notes.
- Evidence is access-restricted; log review actions.
- Keep separate from public guide-profile data.

### 21.7 Other constraints
- `reviews.bookingId`: unique; only one eligible review per completed booking unless policy permits edits.
- `favorites`: unique compound `(userId, targetType, targetId)`.
- `guide_destinations`: unique compound `(guideId, destinationId)`.
- `audit_logs`: append-only at application level, with defined retention.
- `notifications`: indexed by `(recipientId, createdAt)`.
- Prefer soft archival where historical booking integrity matters.

## 22. API Contract and Error Format

**Base path:** `/api/v1`  
**Request/response:** JSON except authenticated file uploads.  
**Pagination:** `page`, `limit` (capped), `total`, `totalPages`.  
**Filtering:** explicit allowlists for `q`, `category`, `destinationId`, `specialty`, `sort`.  
**Response shape (example):**

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "limit": 12,
    "total": 0,
    "totalPages": 0
  }
}
```

**Error shape (example):**

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please check the submitted fields.",
    "details": []
  }
}
```

### Standard HTTP responses
- `200` successful retrieval/update; `201` resource created.
- `204` successful operation with no response body.
- `400` invalid request; `401` unauthenticated; `403` forbidden.
- `404` not found; `409` conflict; `422` invalid business state.
- `429` rate limited; `500` unexpected server failure (no sensitive details).
- Do not reveal whether a private record exists to an unauthorized user.

### Endpoint access requirements
- `GET /destinations`, `/guides`, `/packages`: public, published-only.
- `POST /bookings`: authenticated tourist; enforce input, guide approval and availability.
- `GET /bookings/:id`: booking owner or assigned guide; admin only for authorized oversight.
- `PATCH /guide/profile`: authenticated guide owner.
- `PATCH /admin/guide-applications/:id/review`: Platform Admin or Super Admin.
- `PATCH /super-admin/users/:id/roles`: Super Admin only; log every change.

### API quality rules
- OpenAPI documentation is the source of truth for contracts.
- Validate request body, query, and path parameters.
- Add idempotency protection to booking creation if retries could duplicate requests.
- Use cursor pagination later if large datasets justify it.
- Define public response DTOs separately from database models.

## 23. Authentication and Authorization Design

### 23.1 Registration
1. Visitor opens registration.
2. Validates email, password strength, and terms/privacy acknowledgement.
3. Backend checks normalized email uniqueness.
4. Password is securely hashed.
5. User account is created as tourist.
6. Email verification token is issued with short expiration.
7. User verifies email before restricted account actions.

### 23.2 Login and session
1. Rate-limit attempts by account/IP with appropriate anti-abuse measures.
2. Verify password using a safe hash comparison.
3. Create secure server session or rotating refresh-token flow.
4. Set `HttpOnly`, `Secure`, appropriate `SameSite` cookies.
5. Return only the minimal user profile and effective roles.
6. On logout, invalidate the session/refresh token.

### 23.3 Guide promotion
1. Registered user submits guide application.
2. Platform Admin reviews submitted evidence.
3. On approval, publish the guide profile and grant guide capabilities.
4. On suspension, immediately revoke publishing/booking privileges.
5. Keep historical bookings available to authorized parties.

### 23.4 Role enforcement
- Check account status first.
- Check authenticated role and resource ownership.
- Verify resource state (e.g., approved guide) for protected operations.
- Avoid trusting role names, user IDs, or guide IDs sent by the browser.
- Recheck authorization after role changes and account suspension.

## 24. Booking and Availability Rules

**MVP definition:** Booking is a *request*, not an automatically guaranteed reservation.

1. Tourist selects a published destination/guide or package.
2. Tourist provides date, group size, and optional notes.
3. Backend checks guide approval, service area, capacity, and date constraints.
4. Request is created as `PENDING`.
5. Guide accepts/declines; acceptance moves booking to `CONFIRMED` if no additional payment/confirmation step is required.
6. Both parties receive notifications.
7. Cancellation and completion follow defined business rules.
8. Review becomes available only after eligible completion.

**Concurrency:** Revalidate schedule before confirming; use atomic updates/transactions or an equivalent locking mechanism to prevent overlapping confirmed bookings. Define group capacity and overlapping time rules explicitly.

**No payments in MVP:** Do not imply that money was collected or refunded. Prices are informational until a separate payments design is approved.

## 25. Notification Events

| Event | Recipient | Suggested channel |
|---|---|---|
| Email verification | New user | Email |
| Guide application submitted | Applicant, admin queue | Email / in-app |
| Application reviewed | Applicant | Email / in-app |
| New booking request | Guide | Email / in-app |
| Booking confirmed/declined | Tourist | Email / in-app |
| Booking cancelled | Tourist and guide | Email / in-app |
| Upcoming tour reminder | Tourist and guide | Email / in-app |
| Review submitted | Guide (without private data) | In-app |

For reliability, use a queue/outbox pattern for asynchronous notifications as the system grows. Never include sensitive verification evidence in email.

## 26. Environment Variables

### `frontend/.env.example`
```dotenv
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_APP_NAME=ImpaExplore
# VITE_MAP_PUBLIC_TOKEN=replace_with_public_token_if_needed
```

### `backend/.env.example`
```dotenv
NODE_ENV=development
PORT=5000
FRONTEND_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/impaexplore
SESSION_SECRET=replace_with_a_long_random_secret
# SMTP_HOST=
# SMTP_PORT=
# SMTP_USER=
# SMTP_PASSWORD=
# MEDIA_STORAGE_SECRET=
```

**Never commit real `.env` files.** Frontend `VITE_` values are public in the browser bundle. Use secrets only in the backend environment. Production requires HTTPS, production CORS origin, secure cookies, and managed secrets.

## 27. Local Development and Scripts

**Prerequisites:** Current supported Node.js LTS, package manager, MongoDB local instance or Atlas access, Git.

Suggested package scripts for each project (to implement when generating code):

```json
{
  "scripts": {
    "dev": "development server command",
    "build": "production build command",
    "start": "production start command",
    "lint": "lint command",
    "typecheck": "typecheck command",
    "test": "test runner command"
  }
}
```

**Local workflow:**
```bash
# Terminal 1 — backend
cd impaexplore/backend
npm install
cp .env.example .env
npm run dev

# Terminal 2 — frontend
cd impaexplore/frontend
npm install
cp .env.example .env
npm run dev
```

These are **planned commands**; they will work after the actual package manifests, source code, and scripts are generated. Backend default target: `http://localhost:5000`; frontend default target: `http://localhost:5173`. Configure CORS and cookies to match the final authentication strategy.

## 28. Test Plan

| Area | Essential checks |
|---|---|
| Guest browsing | Public pages work without session; private data is absent |
| Registration | Invalid email, duplicate email, weak password, verification |
| Authentication | Login/logout, expired session, reset tokens, rate limiting |
| Authorization | Cross-user booking access denied; guide cannot edit another guide |
| Guide approval | Pending guide cannot publish/accept bookings |
| Destinations | Drafts not public; filters, pagination, invalid slugs |
| Social links | Reject unsafe schemes; render safe external links |
| Packages | Owner-only changes; valid price/capacity; unpublished hidden |
| Booking | Valid request, rejection, cancellation, double-booking race |
| Reviews | Completed-booking eligibility, duplicate prevention, moderation |
| Admin | Role escalation blocked; privileged actions audited |
| Accessibility | Keyboard navigation, labels, focus, contrast, alt text |
| Security | Input validation, XSS, CSRF where relevant, upload controls |
| Reliability | API error states, network timeouts, retry handling |

**Testing layers:** unit tests for business rules; integration tests for database/API; end-to-end tests for guest, tourist, guide, and admin journeys. Use fixtures explicitly labeled as synthetic.

## 29. Deployment Topology

```text
                         Internet
                            |
                      HTTPS / CDN
                            |
                 +----------+----------+
                 |                     |
          Frontend hosting        Backend hosting
          React static build      Node.js API
                 |                     |
                 |              +------+------+
                 |              |             |
            Browser API     MongoDB Atlas   Media storage
            requests         (private)     (private uploads)
                                   |
                              Email provider
```

**Deployment checklist**
- [ ] Separate frontend and backend environment variables.
- [ ] HTTPS and secure-cookie configuration verified.
- [ ] Production CORS restricted to allowed origins.
- [ ] MongoDB network access and credentials restricted.
- [ ] Backups, restore testing, and retention configured.
- [ ] Application logging, monitoring, and error alerts enabled.
- [ ] Rate limits, payload size limits, and upload controls enabled.
- [ ] Admin MFA and least-privilege access enforced.
- [ ] Domain/DNS and platform name availability checked.
- [ ] Staging tests pass before production deployment.

## 30. Nonfunctional Requirements

| Quality attribute | Initial target / approach |
|---|---|
| Performance | Mobile-first pages; compressed images, lazy loading, pagination |
| Accessibility | Aim for WCAG 2.2 AA for user-facing interfaces |
| PWA | Installable where supported; offline fallback and safe asset caching |
| Security | OWASP-aligned controls; least privilege; server-side authorization |
| Availability | Health endpoint, monitoring, backups, and incident process |
| Scalability | Stateless API where feasible; indexed queries; paginated results |
| Maintainability | TypeScript, modular services, linting, tests, API docs |
| Privacy | Data minimization, restricted evidence, clear consent and retention |
| SEO | Descriptive routes, page metadata, sitemap, structured data where appropriate |
| Observability | Request IDs, structured logs, audit trails, error reporting |
| Localization | English initially; support Filipino/Cebuano later if validated |

Targets such as uptime, latency, and concurrent users must be set after requirements gathering and load testing rather than invented.

## 31. Development Order and Definition of Done

### Sprint A — Foundation
- [ ] Create actual `frontend/` and `backend/` apps.
- [ ] Configure TypeScript, lint, formatter, Git ignore, and CI.
- [ ] Add health endpoint, database connection, env validation, global errors.
- [ ] Implement responsive header/footer and public layout.
- [ ] **Done when:** both projects run independently, frontend reaches API health endpoint, and a production PWA build passes manifest/service-worker checks.

### Sprint B — Public discovery
- [ ] Destination and guide schemas, public API, seed strategy.
- [ ] Search/filter and public details pages.
- [ ] Safe public social links.
- [ ] **Done when:** guests browse without login and see only published records.

### Sprint C — Accounts and guide onboarding
- [ ] Registration, login, email verification, password reset.
- [ ] Guide application and evidence upload.
- [ ] Admin review and guide approval.
- [ ] **Done when:** permission tests prove pending applicants cannot act as approved guides.

### Sprint D — Packages and bookings
- [ ] Guide packages and availability.
- [ ] Tourist request form and booking history.
- [ ] Guide accept/decline; cancellation and notifications.
- [ ] **Done when:** a complete booking journey passes end-to-end tests.

### Sprint E — Moderation and launch
- [ ] Reviews, reports, audit logs, accessibility, security review.
- [ ] Real listing validation, policies, deployment, pilot testing.
- [ ] **Done when:** acceptance criteria pass and launch owners sign off.

## 32. Operational Policies to Draft Before Launch

- Terms of service and independent-platform disclosure.
- Privacy notice, retention/deletion, and user rights process.
- Guide verification and badge explanation.
- Listing eligibility and content moderation.
- Booking request, cancellation, no-show, and dispute handling.
- Reviews and anti-fraud policy.
- External social-media link and contact safety.
- Safety disclaimer and emergency guidance.
- Account suspension, appeals, and evidence retention.

## 33. Recommended Documentation Deliverables

```text
docs/
├── PROJECT_SCAFFOLD.md          # This blueprint
├── PRODUCT_REQUIREMENTS.md      # Approved user stories and scope
├── UI_UX_SPEC.md                # Screens, design tokens, interaction states
├── USER_FLOWS.md                # Guest/tourist/guide/admin workflows
├── DATABASE_SCHEMA.md           # Detailed MongoDB schema and indexes
├── API_SPEC.md                  # OpenAPI contract
├── AUTH_AND_RBAC.md             # Auth flows and permission checks
├── GUIDE_VERIFICATION.md        # Internal review policy and badge wording
├── BOOKING_RULES.md             # State transitions and concurrency rules
├── SECURITY_AND_PRIVACY.md      # Controls, data handling, retention
├── TEST_PLAN.md                 # Tests and acceptance criteria
├── DEPLOYMENT.md                # Environment, CI/CD, rollback, backup
└── DECISIONS.md                 # Architecture decision records
```

## 34. Progressive Web App (PWA) Requirements

ImpaExplore must be developed as a **Progressive Web App**, not merely a mobile-responsive website. It should work in standard browsers and offer an installable, app-like experience on supported Android, iOS, and desktop browsers. Install behavior and feature support vary by browser and operating system.

### 34.1 PWA technical requirements
- Provide a valid web app manifest with `name`, `short_name`, `start_url`, `scope`, `display: standalone`, `theme_color`, `background_color`, and appropriate icon definitions.
- Supply 192×192 and 512×512 PNG icons, including a suitable maskable icon. Actual artwork must be created before launch.
- Register a production service worker (for example using `vite-plugin-pwa` / Workbox).
- Serve production over HTTPS; `localhost` is acceptable for local development.
- Support installation from compatible browsers, with a helpful optional install prompt where available. Never block browsing behind installation.
- Provide a clear offline page or fallback, an online/offline indicator, and an update-available notification.
- Test service-worker upgrades and cache cleanup to avoid users being stuck on obsolete app versions.
- Preserve keyboard navigation, screen-reader support, and responsive layouts in standalone mode.

### 34.2 Offline strategy
| Content | Offline behavior |
|---|---|
| App shell, static assets, branding | Precache versioned assets for fast loading |
| Previously viewed public destinations and guides | Optionally cache public GET responses with bounded TTL and storage limits |
| Public guide social links | Display saved links where available; external destinations still require internet |
| Maps and third-party media | Show fallback; do not assume offline map access or violate provider caching rules |
| Login, registration, verification | Require network connection |
| Booking requests, cancellations, confirmations | Require network connection and server acknowledgement |
| Guide application and evidence uploads | Require network connection |
| Admin and private dashboards | Network-first; do not persist sensitive API responses in shared caches |

**Critical:** Do not claim a booking succeeded while offline. Avoid caching authenticated or sensitive data in the service worker; use appropriate cache-control headers and clear session-related local state on logout. Any future offline draft/queue capability requires explicit conflict-resolution and privacy design.

### 34.3 Optional later PWA capabilities
- Web push notifications for booking updates, only with explicit user permission and platform/browser support.
- Background sync for non-sensitive drafts, with idempotency and conflict handling.
- Share Target integration, where supported.
- Home-screen shortcuts to destinations, guides, and bookings.

### 34.4 PWA acceptance criteria
- [ ] Production manifest validates and uses actual app icons.
- [ ] Installation works on at least one supported Android browser and one desktop browser.
- [ ] iOS Add to Home Screen behavior is documented and tested on a supported iPhone browser.
- [ ] Previously cached public pages or an offline fallback appear without connectivity.
- [ ] Private booking/admin API responses are not exposed from public service-worker caches.
- [ ] Booking actions clearly fail safely when offline, without false confirmations.
- [ ] New deployments trigger a reliable update path.
- [ ] Lighthouse PWA-related checks and manual install/offline tests are recorded.

## 35. Final Project Boundaries

**In scope for the first release:** an installable PWA with offline fallback, independent public tourism discovery, guide directory with social media links, tourist accounts, guide onboarding, internal platform review, guide packages, booking requests, and administrative moderation.

**Not claimed or guaranteed:** LGU/DOT affiliation, government accreditation, real-time confirmed guide availability, automated payment handling, safety certification, or verified listings before onboarding.

**Core product rule:** **A visitor must be able to explore ImpaExplore without registering or installing the PWA.**
