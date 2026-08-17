<USER_REQUEST>
# CoBuddy — Customer App TODO
**Repo:** `cobuddycustomerupdated`
**Note:** Zero backend-integration work has started on this app yet (confirmed: no `.env`, no `axios` in `package.json`, `src/services/` is 100% mock files). Unlike Companion, this whole app's integration begins from scratch whenever that phase starts.
**See also:** `CoBuddy_Admin_TODO.md` for the master-data/config numbers referenced throughout (Section 5) and the canonical status-vocabulary decision (Section 7) that affects this app.

---

## 1. Confirmed Old Items (From Original TODO — Still Valid, Unchanged)
- #1 — Activity pricing still hardcoded, not `hourlyRate × multiplier`
- #2 — Review screen still 5-star + free-text only, **zero tags** (see 2-3 below for exact codes to use)
- #3 — Venue selection: free-text custom venue still fully open, no Google Places / place-type filtering wired
- #4 — Trusted Contacts screen (`TrustedContactsScreen.tsx`) still missing an explicit per-contact toggle: "Let this contact see my live-location during SOS."
- #5 — Incident Report screen (`IncidentReportScreen.tsx`) still missing photo/video evidence-upload capability (Companion's `IncidentEvidenceUploadScreen` is the pattern to follow — though note Companion's own version still has the fake-file-upload bug documented in the Companion TODO, so don't copy that part).
- #6 — Discover screen (`DiscoverScreen.tsx`) still missing two filters: Language and Activity-category (Gender/Rating/Max-Price/Distance filters already exist).
- #7 — Still no "Change Registered Mobile Number" flow anywhere (Settings → Account Settings needs a new screen, OTP-verifying both old and new number).
- #8 — Backend-integration additions still needed when that phase starts: Camera/Selfie SDK, Google Maps SDK, Razorpay SDK, Socket.IO, Firebase push, and `axios` itself (none present yet — see Section 3-1 below for the full picture).
- #9 — `ENABLE_SOS_BACKGROUND_TRACKING: false` still off
- #10 — Confirmed OK, no change needed (re-verify these are still fine before starting work, but as of the last full scan): `ENABLE_VIDEO_CALL: false` correctly reflects audio-only; navigation has no orphaned screens or bad duplicate registrations (re-confirmed again in this pass too); Companion Gender field exists; Counter-Offer price-negotiation already supports rate-change; `AppLockScreen` is correctly a separate security layer from OTP-login; Arrival-Verification (4-digit code → escrow-release + timer-start) is well-designed with no gap found.
- #11 — Wallet scope confirmed: `AddMoneyScreen`, `WithdrawMoneyScreen`, `WithdrawalMethodsScreen` form a general top-up/withdraw wallet, not just booking-escrow. Admin's "Escrow/Wallet Monitoring" module needs to track this general wallet activity too, not just escrow.
- #12 — Session extension still one-sided instant self-extend
- #13 — Voter ID still missing from KYC document options (still only AADHAAR/PAN/PASSPORT/DL)
- #14 — `serviceFee = 50` still hardcoded (coincidentally matches Admin's real value of 50 — but still needs to be API-driven, not assumed)
- #15 — Booking status state-machine still just 7 states, no failure-states (see Admin TODO Section 7-1 — this now has exact target values to expand toward, from Companion's richer model)
- #16 — Push-notification deep-linking still confirmed missing entirely — no "notification tap → jump to specific screen" logic anywhere in the app. Needs building when push-integration happens (tie in the `actionRoute`/`actionParams` fields from Section 3-2 below).
- #17 — Interest/ticket/incident categories still hardcoded, still two independently-maintained copies (`InterestSelectionScreen.tsx` + `activities.mock.ts`)
- #18 — Last-minute companion-cancellation V1 scope decision (recommended, still needs final confirm): refund-only for V1, no automated "suggest a backup companion" flow — that's a meaningfully larger V2 feature needing real-time nearby-availability matching. V1 just needs a clear fast refund-path + an honest in-app message.
- #19 — T&C/Consent version-tracking still missing: no record anywhere of *which* T&C/Privacy-Policy version a user accepted and *when*. Every consent-screen should log user-ID + document-version + timestamp + IP to the backend, visible in Admin's Policy/Content Management module. Not urgent for a demo, but must exist before real-money/real-user launch.
- #20 — Booking data-model still too thin compared to Companion's richer Session model: Customer's `Booking` interface is `{ id, companionId, activity, venue: string, time: string, status }` (venue as plain string, time as plain string, no start/end split) vs Companion's structured `venue` object, separate `scheduledStart`/`scheduledEnd`, `matchScore`, `sessionPassCode`, `safetyTimerActive`, earnings breakdown. The real backend schema needs the rich version — this connects directly to the status-vocabulary decision in Admin TODO Section 7.
- #21 — Notification-category mismatch: Customer's `NotificationCategory` (`All/Bookings/Wallet/Security/Support`, 5, includes a filter-meta "All") still doesn't match Companion's canonical taxonomy, which itself has grown to 11 categories now (see Admin TODO Section 5) — not just the 8 from the original comparison. Also still no `actionRoute`/`actionParams` fields on Customer's notification type (see 3-2 below).
- #22 — Trusted-Contact phone masking inconsistency: Companion's type-file has an explicit "no raw PII stored — masked values only" principle and `maskedPhone`. Customer's `TrustedContact.phone` still stores the raw, unmasked number in local state. Apply the same masking principle to Customer's local-state shape.
- #23 — "Safety Bonus" transaction-type exists in Companion's `TransactionType` enum but what actually triggers it is still undefined from Customer's side too (this is really an Admin/product decision — see Admin TODO Section 5, `trust-score` module, which now has a placeholder rule: 1 incident-free month → ₹100 / trust-points, still pending final business-decision confirmation).
- **Multi-Language Storage note**: only `en` locale exists in this repo right now — no Hindi/regional translation files yet. When Admin's master-data starts feeding lists into this app via API, those entries must arrive as per-language objects (e.g. `{"en": "...", "hi": "..."}`), with the app picking the field matching its current locale and falling back to English if missing. This is a backend/API-contract detail for how this app's data-fetching layer should be built.

## 2. New Findings — App-Level Bugs & Inconsistencies

**2-1. 🔴 SOS button uses a fundamentally weaker interaction model than Companion**
Companion's SOS is a genuine 3-second **hold-to-trigger** gesture. Customer's SOS (`SafetyHubScreen.tsx`) is **tap → `Alert.alert` confirmation dialog** — despite the on-screen text literally saying *"Press and hold in an emergency"*, the actual code has no hold-gesture at all. Safety-UX inconsistency across the platform, and the copy doesn't match the implementation.
**Priority: 🔴 High**

**2-2. 🔴 `MAX_WITHDRAWABLE = 4500` doesn't match any Admin value**
`WithdrawMoneyScreen.tsx` hardcodes 4500. Admin's closest values are `walletBalanceLimits.nonKycMax: 10000` (a balance cap, not a per-withdrawal cap) and `commission.minimumWithdrawalAmount: 1000` (a floor, not a ceiling). There's currently no Admin config for "max withdrawable per transaction" at all — see Admin TODO Section 6-4 for the decision needed there.
**Priority: 🔴 High — needs a decision, not just a wire-up**

**2-3. Review tags — exact codes now available to implement #2 properly**
Use Admin's `ReviewTagOption` list filtered to `appliesTo: CUSTOMER_RATING_COMPANION` or `BOTH`: `great_listener`, `dressed_well`, `safe_comforting`, `catfished_fake_profile`, `boring` (customer→companion specific) + `punctual`, `late`, `rude_unprofessional`, `made_uncomfortable` (shared).

**2-4. Venue Place-Type filtering — exact allow-list now available for #3**
Admin's `PlaceTypeConfig` gives the exact 10 types with `isAllowed`. Filter on: cafe, restaurant, park, museum, book_store, shopping_mall, movie_theater, amusement_park (allowed) — hard-exclude `lodging` and `bar`. Note: this is more precise than the original TODO's suggested type-list (which included `tourist_attraction`/`art_gallery`/`bakery`, not in Admin's actual list — reconcile before building).

**2-5. Cancellation-refund tiers — exact numbers now available for #14**
Admin's `cancellationRefundTiers`: 48hrs+ → 100%, 24–48hrs → 50%, <24hrs → 0%. Note `pricing.cancellationFeePercentage: 10%` is a **separate concept** (a fee, not a refund-tier) — don't conflate the two when building `CancelBookingScreen.tsx`.

**2-6. Zero real-time / push packages installed**
No `socket.io-client`, no `@react-native-firebase/*` in `package.json` — Companion has both already. This app is behind Companion on chat/push readiness; worth syncing milestones before backend integration starts.

---

## 3. Backend-Integration Scope Notes (For When This App's Integration Begins)

**3-1. Confirmed: zero integration started**
No `.env`, no `axios` in `package.json`. `src/services/` contains only `mock/` files: `profile.mock.ts`, `companions.mock.ts`, `activities.mock.ts`, `bookings.mock.ts`, `chat.mock.ts`, `support.mock.ts`, `session.mock.ts`, `reviews.mock.ts`, `safety.mock.ts`, `notifications.mock.ts`, `onboarding.mock.ts`, `wallet.mock.ts`. This gives a clean map of exactly which domains will need a real service-layer built (compare against Companion's `src/services/api/` structure — `auth`, `profile`, `sessions`, `requests`, `availability`, `earnings`, `kyc`, `uploads`, `settings`, `safety`, `support`, `notifications`, `training`, `reviews` — as a template for what Customer's equivalent should look like).

**3-2. No `NotificationCategory.actionRoute`/`actionParams` fields**
Customer's notification type has no equivalent of Companion's `actionRoute`/`actionParams` fields, which are needed for push-notification deep-linking (tap notification → jump to specific screen). Add these fields to the data model now, even before the navigation-handler logic is built, so the backend contract is ready.

**3-3. Self-documented gap: masked/secure calling**
`ArrivalCheckInScreen.tsx` has a "Secure Call" button that shows an `Alert` saying number-masking requires a telephony backend (Twilio/Exotel-style) and isn't built yet. This is honestly documented in the code, but implies a **third-party telephony vendor decision** is still pending, separate from the main app/database backend work — flag for product/ops.

---

## 4. Final Sweep — Confirmed Clean

**4-1. ✅ Zero orphaned screens** — all 92 screen files confirmed reachable via navigation.

**4-2. ✅ TSC clean** — `tsc --noEmit` → 0 errors.

**4-3. ✅ ESLint clean** — 0 errors, 330 warnings (all `react-native/no-inline-styles`, cosmetic).

**4-4. ✅ TODO/FIXME/HACK comment sweep clean** — nothing found beyond what's already listed above.

**4-5. 🟡 Phone-number validation note**
This app correctly uses the `libphonenumber-js` library for real international phone validation (with a 10-digit-Indian fallback) — more robust than Companion's simple India-only regex. Worth confirming this asymmetry between the two apps is intentional (customers might use foreign numbers; companions are expected to be India-based) rather than an oversight on Companion's side.

---

## 5. Priority Order

🔴🔴 **Fix absolutely first (once backend build begins):**
See `CoBuddy_Admin_TODO.md` Section 7 (canonical status vocabulary — Customer's current `BookingStatus` enum is the thinnest of the three and needs the most expansion to match)

🔴 **Fix next:**
2-1 (SOS hold-vs-tap mismatch), 2-2 (withdrawal-limit decision needed), #12/#15 from original TODO, #20 (booking data-model too thin vs. Companion's richer session model — ties directly into the status-vocabulary work)

🟡 **Fix after that:**
#1/#2/#3/#14/#17 from original TODO, using the exact codes now available in 2-3/2-4/2-5 above

🟢 **Low priority / cleanup:**
#6/#13 from original TODO, 3-3 (telephony vendor decision — flag for product, not urgent for app code)

---
*See `CoBuddy_Admin_TODO.md` for the master-data/config reference and the canonical status-vocabulary decision this app depends on.*



Main CoBuddy Customer app (`cobuddycustomerupdated` repo) pe kaam kar raha hoon. Attached `CoBuddy_Customer_TODO.md` file mein poora audit hai — is repo ka deep code-scan karke nikala gaya, exact file-names/field-names ke saath.

Tumhara kaam: is file ko follow karke, isi repo mein, ek-ek item fix karna.

**Kaam karne ka tareeka:**

1. Sabse pehle file ka Section 5 ("Priority Order") padho — usi order mein kaam karna hai: 🔴🔴 pehle, phir 🔴, phir 🟡, phir 🟢 sabse last.

2. Har item fix karne se pehle:
   - Pehle us exact file ko khud check karo (jo file-name TODO mein di hai) — code abhi bhi waisa hi hai ya nahi, confirm karo.
   - Agar TODO ka description aur actual code mein farak mile, to mujhe bolo pehle, khud assume mat karo.

3. Jahan TODO mein "Admin ka real value" diya hai (jaise commission %, rate-limits, master-data lists) — abhi Admin ka real backend nahi hai, to yeh values **hardcoded constants ki jagah hardcoded rakho lekin ek clearly-named single config-file/constants-file mein centralize kar do** (e.g. `src/config/adminValues.ts`), taaki jab real backend/API aaye to sirf ek jagah se fetch-call se replace karna pade — scattered hardcoding wapas mat banao.

4. Jo items "backend-integration ke time" wale hain (jaise Section 3 ke items — abhi is app mein backend hai hi nahi) — un par abhi UI/local-state level tak hi kaam karo, real API-wiring ka structure Companion app ke `src/services/api/` folder ko reference/pattern ki tarah dekh sakte ho (Companion mein integration already shuru ho chuki hai), lekin real backend-URL abhi na daalo jab tak main na bolun.

5. Ek item fix karne ke baad:
   - Chhota summary do: kya fix kiya, kaunsi file/files touch ki.
   - Agar koi cheez TODO ke hisaab se ambiguous lagi ya decision chahiye thi, wahi pe pooch lo — aage mat badho khud-se assume karke.

6. Kabhi bhi koi cheez jo TODO mein "✅ Confirmed OK / no change needed" likhi hai, usko touch mat karo.

7. Jab bhi koi item Admin-repo ya Companion-repo se cross-dependency rakhta ho (TODO mein "See Admin TODO Section X" ya "matches Companion's..." likha hoga), to mujhe clearly bata dena ki yeh decision meri taraf se nahi, doosre repo/team se confirm honi chahiye — khud koi assumption mat lena us decision pe.

Ek baar mein ek 🔴🔴/🔴 item lo, poora fix karo, confirm karke agla lo. Batch mein sab kuch ek saath mat badalna — chhote, verifiable steps mein chalna hai.

Shuru karne se pehle: attached file poori padh lo aur mujhe 2-3 line mein bata do ki tumhara samajh kya bana hai overall scope ka, phir hum Section 5 ke pehle item se shuru karenge.
</USER_REQUEST>
<ADDITIONAL_METADATA>
The current local time is: 2026-08-17T01:11:02+05:30.
</ADDITIONAL_METADATA>