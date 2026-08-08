# Australian Compliance & Risk Audit — dramandahenderson.com

**Scope:** Legal, regulatory and professional compliance review of the entire website for a medical practitioner/practice operating in Australia.
**Status:** AUDIT ONLY — no remediation implemented. Awaiting your review before any changes.
**Date:** 2026-08-08
**Reviewer note:** This is a technical compliance review, not legal advice. Items marked *[Confirm externally]* should be verified with an appropriately qualified Australian health lawyer, privacy adviser, accountant or Medicare/billing specialist.

Each issue is classified as **Legal/regulatory requirement**, **Professional guidance**, or **Best-practice recommendation**, and given a risk level: **Critical / High / Medium / Low / Best-practice**.

> **Update (2026-08-08):** Following this audit, all specific consultation fees and Medicare rebate figures were **removed** from the Fees page at the practice's direction. The page now states only that the practice is privately billed and that patients with a valid Medicare card are eligible for a Medicare rebate, and invites patients to call for a fee before booking. This **resolves findings F1, F2 and F3** (the accuracy of rebate amounts, the duration-vs-item mapping, and the implied-rebate risk no longer arise). The remaining Fees-page notes (F4 private-billing wording, F6 GST) are unaffected and non-blocking. **P1 (privacy policy) and A1/A3 remain outstanding.**

---

## 1. Executive summary

The website is, overall, unusually low-risk for a medical practice site: it contains **no testimonials, no reviews, no before/after images, no patient stories, and no superlative or outcome-guarantee claims** — the areas that generate most AHPRA advertising complaints. The intentional removal of skin-cancer/cosmetic positioning also removes the highest-risk advertising category (cosmetic procedures now carry their own stricter 2025 guidelines).

The material issues are concentrated in two places:

1. **The Fees page** — the stated Medicare rebate figures ($43.90 / $84.90) are **not current** (the 1 July 2026 benefits are **$45.05** and **$87.10**), and tying a rebate to a *booked duration band* ("15–30-minute appointment") rather than the *Medicare item actually billed* risks being misleading, because the applicable item (and therefore the rebate) depends on the consultation's length and content, not the appointment slot booked.

2. **Privacy** — the practice is bound by the Privacy Act 1988 (health-service providers are **not** covered by the small-business exemption), and **there is no privacy policy on the site**. APP 1.3 requires a clearly expressed, up-to-date privacy policy.

Neither is a reason to delay a *soft* launch, but both should be resolved before the site is actively promoted / DNS is pointed at the live domain. A small number of lower-risk items (schema "specialty" wording, non-clinical qualifications, registration-number display) are best-practice tidy-ups.

Nothing here should be read as second-guessing the practice's **own prices** ($110 / $186) — those are commercial decisions. Only the **objective, government-set rebate figures** and their **presentation** are flagged.

---

## 2. Issues requiring action before publication (or before active promotion)

### F1 — Medicare rebate figures are out of date · **HIGH** · *Legal/regulatory*
- **Location:** `/fees` — both fee cards ("Medicare rebate −$43.90", "−$84.90") and the page `<meta name="description">` which repeats those figures.
- **Concern:** The stated rebates are not the current Medicare benefits. Advertising an inaccurate rebate can be a misleading representation as to price/benefit.
- **Applicable requirement:** Australian Consumer Law ss 18 & 29(1)(i) (misleading representations about price); Health Practitioner Regulation National Law **s 133(1)(a)** (advertising that is false, misleading or deceptive, or likely to mislead/deceive).
- **Source:** MBS Online item 23 — Fee/Benefit **$45.05**, eff. 01-Jul-2026 (https://www9.health.gov.au/mbs/fullDisplay.cfm?type=item&q=23); MBS Online item 36 — Fee/Benefit **$87.10**, eff. 01-Jul-2026 (https://www9.health.gov.au/mbs/fullDisplay.cfm?type=item&q=36&qt=item); ACCC on misleading pricing (https://www.accc.gov.au/business/advertising-and-promotions/advertising-and-selling-guide).
- **Recommended action:** *[Confirm externally — Medicare/billing]* Verify the exact benefit for the item(s) actually billed and update the figures. Add a visible "current as at [Month Year]" note, and state that rebates are set by the Australian Government and change periodically (typically each 1 July). Do **not** rely on this audit's figures as your billing source of truth — confirm against MBS Online / your billing software on the day of publication.
- **Suggested replacement copy:** see F2 (the fix is combined).

### F2 — Rebate tied to booked duration rather than the Medicare item billed · **HIGH** · *Legal/regulatory + Professional guidance*
- **Location:** `/fees` — card headings "15-minute appointment" and "15–30-minute appointment", each mapped to a single rebate.
- **Concern:** The Medicare rebate depends on the **item number billed**, which is determined by the **actual length and clinical content** of the consultation, not the appointment slot booked:
  - A **standard consultation, ≥6 and <20 minutes** = item **23** (benefit **$45.05**).
  - A **longer consultation, ≥20 minutes** = item **36** (benefit **$87.10**).
  The "15–30-minute" band **straddles the 20-minute boundary**: a 15–19 minute consultation attracts item 23 (~$45.05), not the $84.90 shown. Presenting a single fixed rebate for that band can mislead patients into expecting the higher rebate.
- **Applicable requirement:** National Law **s 133(1)(a)**; ACL ss 18 & 29. MBS item descriptors (time thresholds) per MBS Online (as above).
- **Source:** MBS item 23 descriptor "at least 6 minutes and less than 20 minutes"; item 36 descriptor "at least 20 minutes" (URLs as F1).
- **Recommended action:** Re-frame the two tiers around the **Medicare items** rather than booked minutes, so the fee ↔ rebate mapping is accurate, and add qualifying language. Keep the practice's own fee amounts; only change how the rebate is described.
- **Suggested replacement copy (card + note):**
  - Card A — heading **"Standard consultation"**, sub-label "up to 20 minutes (most appointments)": *Consultation fee $110. If you're eligible, Medicare rebate $45.05. Estimated out-of-pocket $64.95.\**
  - Card B — heading **"Longer consultation"**, sub-label "20 minutes or more": *Consultation fee $186. If you're eligible, Medicare rebate $87.10. Estimated out-of-pocket $98.90.\**
  - Note: *"\*The Medicare rebate depends on the consultation item billed, which is based on the length and content of your visit, and on your Medicare eligibility. Rebate amounts are set by the Australian Government and change from time to time (current as at [Month Year]). The out-of-pocket figures above are estimates only — the consultation fee less the rebate — for patients who are eligible for the rebate shown."*
  - *(Figures above use current MBS benefits; if you prefer to keep the booked-duration labels, at minimum change "15–30-minute" so it does not straddle the 20-minute item boundary, and qualify the rebate as "up to".)*

### F3 — "Estimated out-of-pocket" may imply every patient receives the rebate · **MEDIUM** · *Legal/regulatory*
- **Location:** `/fees` — the highlighted "Estimated out-of-pocket" figure on each card (the qualifier currently lives only in the paragraph below the cards).
- **Concern:** The rebate requires a **valid Medicare card** and that the service meets the item requirements. Displaying a prominent out-of-pocket number without an adjacent "if eligible" qualifier can create an impression that the net cost is guaranteed for everyone (e.g. patients without Medicare, or where a different item is billed, pay the full fee).
- **Applicable requirement:** National Law s 133(1)(a); ACL ss 18 & 29; also relevant to s 133(1)(c) (unreasonable expectation of benefit) by analogy.
- **Source:** As F1/F2; Services Australia — Medicare eligibility & claiming (https://www.servicesaustralia.gov.au/medicare).
- **Recommended action:** Put the qualifier **on the card**, next to the out-of-pocket figure (e.g. the "\*" and "if eligible" as in F2), not only in the note beneath. Keep the word "estimated".

### P1 — No privacy policy · **HIGH** · *Legal/regulatory (applies to the practice)*
- **Location:** Whole site — no `/privacy` page; no privacy link in the footer.
- **Concern:** A medical practice **is an APP entity**: the small-business (≤$3m turnover) exemption does **not** apply to an entity that "provides a health service … and holds any health information" (Privacy Act 1988 **s 6D(4)(b)**). APP 1.3 requires a **clearly expressed and up-to-date privacy policy**, and the website is where patients expect to find it.
- **Applicable requirement:** Privacy Act 1988 (Cth) s 6D(4)(b); Australian Privacy Principle 1.3–1.4.
- **Source:** Privacy Act s 6D (https://classic.austlii.edu.au/au/legis/cth/consol_act/pa1988108/s6d.html); OAIC *Guide to health privacy* (https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/health-service-providers/guide-to-health-privacy); OAIC APP 1 guidance (https://www.oaic.gov.au/privacy/australian-privacy-principles/australian-privacy-principles-guidelines).
- **Recommended action:** *[Confirm externally — privacy adviser]* Add a privacy policy page (and footer link) covering what personal/health information is collected, how, why, disclosures (incl. the HotDoc booking provider and any analytics), storage/security, access & correction, complaints, and any overseas disclosure. Many Australian practices adapt the RACGP/AMA privacy policy templates — have the final text reviewed. This is an obligation of the *practice*; the website should surface it.

---

## 3. Lower-risk improvements

### F4 — "Private billing" vs "not a bulk billing practice" · **LOW / Best-practice**
- **Location:** `/fees` intro; `/contact` ("This is a private billing practice…").
- **Assessment:** The current copy **already leads with "private billing practice"** and uses "not bulk billed" only as a plain-language clarifier — which is the recommended emphasis (positive framing first). This is acceptable. Optional refinement: keep "private billing" as the primary term and ensure the phrase never reads as a warning. No compliance defect.
- **Classification:** Best-practice (no change required).

### F6 — GST presentation · **LOW** · *[Confirm externally — accountant]*
- **Location:** `/fees` — prices shown as flat dollar amounts.
- **Assessment:** Medicare-eligible GP consultations are generally **GST-free** (A New Tax System (Goods and Services Tax) Act 1999 s 38-7). If so, the flat amounts are the total payable and no GST line is required; ACL single-price rules (s 48) are satisfied because the total price ($110/$186) is stated prominently. Confirm with the practice accountant that all listed services are GST-free (some non-Medicare services can be taxable).
- **Source:** ATO — GST and health (https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/in-detail/your-industry/gst-and-health); ACL s 48 (component pricing).
- **Classification:** Legal (compliant if GST-free), pending accountant confirmation.

### A1 — Structured-data "medicalSpecialty" may imply specialist registration · **MEDIUM** · *Professional guidance / Legal*
- **Location:** `lib/schema.ts` — Physician JSON-LD `medicalSpecialty: ["PrimaryCare","Gynecologic","Pediatric"]` emitted site-wide.
- **Concern:** Dr Henderson is a **GP with areas of interest** in women's and children's health — not a registered specialist gynaecologist or paediatrician. Machine-readable metadata is still "advertising", and asserting "Gynecologic"/"Pediatric" *specialty* could imply specialist registration, which engages the National Law's protection of specialist titles and s 133(1)(a).
- **Applicable requirement:** National Law s 133(1)(a) and specialist-title provisions (Div 8 / s 115 use of specialist titles); AHPRA advertising guidance on titles/specialties.
- **Source:** AHPRA advertising guidelines (https://www.ahpra.gov.au/Publications/Advertising-hub/Advertising-guidelines-and-other-guidance/Advertising-guidelines.aspx).
- **Recommended action:** Set `medicalSpecialty` to **"PrimaryCare"** only, and continue to express women's/children's health as **areas of interest** via `knowsAbout` (already present). The visible pages already correctly say "GP" / "areas of clinical interest" — this aligns the metadata with that.

### A2 — Non-clinical qualifications listed · **LOW / Best-practice** · *Professional guidance*
- **Location:** `/about` — "Prior qualifications include MAppIFin, BComm, BBus".
- **Assessment:** Not prohibited, and the About page frames them as prior/non-medical, informing a "considered, practical approach" — which avoids implying clinical relevance. They are (correctly) **not** in the homepage trust strip. AHPRA guidance is only that qualifications must not mislead about clinical expertise; the current framing is fine. Optional: label them explicitly as "non-medical" for absolute clarity.
- **Classification:** Best-practice (no change required).

### A6 — Registration status/number not displayed · **LOW / Best-practice**
- **Location:** `/about`, footer.
- **Assessment:** Not legally required on a website, but displaying the AHPRA registration number (and "registered medical practitioner") supports transparency/E-E-A-T and lets patients verify via the AHPRA register. The About page already says "Registered medical practitioner (AHPRA)"; adding the MED number is a nice-to-have.
- **Classification:** Best-practice.

### A5 — Health-information articles: claims & disclaimers · **LOW** · *Legal/Professional*
- **Location:** `/articles/*` (29 articles).
- **Assessment:** Content is educational, non-promotional, with a per-article disclaimer ("general information … not a substitute for personal medical advice … call 000"). No outcome guarantees observed. One general claim to keep defensible: statements that continuity of care is "linked to better health" (there is peer-reviewed support, so acceptable). Ensure any future article edits avoid definitive outcome/effectiveness claims without evidence (s 133(1)(a),(c)).
- **Recommended action:** No change required now; keep the disclaimer and evidence-based tone as an editorial rule.

### A4 — Testimonials/reviews (forward-looking) · **Best-practice** · *Legal if breached*
- **Location:** None currently on the site (compliant).
- **Concern (future):** The s 133(1)(c)/testimonials prohibition still applies in 2026. If Google reviews, embedded review widgets, or patient quotes are added later, do **not** feature reviews that reference clinical care/outcomes. Linking to a Google Business Profile and showing an overall star rating is generally permissible; reproducing individual clinical testimonials is not.
- **Source:** National Law s 133(1)(c); AHPRA advertising guidelines & testimonials guidance (https://www.ahpra.gov.au/Publications/Advertising-hub.aspx).
- **Recommended action:** Adopt an internal "no clinical testimonials in advertising" rule; keep schema free of fabricated `aggregateRating`/`review` (currently clean).

### A3 — Factual claims to verify · **MEDIUM if inaccurate** · *Legal/regulatory*
- **Location:** Site-wide — "FRACGP"; "Registered shared antenatal care provider — Royal Hospital for Women, Randwick"; article authorship "Written by Dr Amanda Henderson" + `reviewedBy`.
- **Concern:** These are verifiable factual claims; if any is not current/accurate it becomes misleading (s 133(1)(a), ACL s 18).
- **Recommended action:** *[Confirm with practitioner]* Confirm current FRACGP status, current RHW shared-care registration, and that Dr Henderson authored/clinically reviewed the articles attributed to her. Retain evidence.

---

## 4. Fees page assessment (responses to the seven specific questions)

1. **Are the rebate amounts current/accurate?** **No.** Current MBS benefits are **$45.05** (item 23) and **$87.10** (item 36), eff. 1 July 2026 — not $43.90/$84.90. → **F1**.
2. **Is appointment duration alone sufficient to describe the rebate?** **No.** The rebate follows the **item billed**, set by the consultation's actual length **and** clinical content; the "15–30-minute" band straddles the item 23/36 20-minute boundary. → **F2**.
3. **Could the out-of-pocket display imply every patient gets the rebate?** **Yes**, as currently placed (qualifier only below the cards). → **F3**.
4. **Should qualifying language accompany the rebate?** **Yes** — "if eligible / valid Medicare card", "depends on the item billed", and a "current as at" date, placed with the figures. Partially present; strengthen and relocate. → **F2/F3**.
5. **Is "not a bulk billing practice" the best wording, or "private billing practice"?** Lead with **"private billing practice"** — the current copy already does this; acceptable. → **F4**.
6. **GST or other pricing disclosure?** GP Medicare-eligible consults are generally **GST-free**; flat totals are fine and satisfy ACL single-price. Confirm with accountant. → **F6**.
7. **Any additional disclosure legally required or advisable?** Advisable (not strictly required): a plain line on **how the rebate is claimed** (patient pays the fee; eligible patients claim the rebate back from Medicare) and the **effective date** of the figures. → best-practice.

**Do not treat this audit's rebate figures as your billing source** — confirm against MBS Online / billing software at publication.

---

## 5. Privacy / data-collection assessment

- **P1 (HIGH):** No privacy policy — required (practice is an APP entity, Privacy Act s 6D(4)(b); APP 1.3). → §2.
- **P2 (MEDIUM, conditional):** No analytics/cookies are currently present (the site only has `data-cta` attributes, no tracker). **Before** enabling Google Analytics or similar: disclose it in the privacy policy, provide an APP 5 collection notice, address APP 8 cross-border disclosure (e.g. US analytics), and implement a cookie/consent mechanism for non-essential cookies (emerging best practice / expected under the Privacy Act reforms). Source: OAIC APP 5 & APP 8 guidelines (https://www.oaic.gov.au/privacy/australian-privacy-principles/australian-privacy-principles-guidelines).
- **P3 (MEDIUM):** Booking is via **HotDoc** (third party). The privacy policy should disclose that bookings are handled by HotDoc and link HotDoc's privacy policy; confirm the data-handling arrangement. *[Confirm externally]*
- **P4 (LOW):** No on-site contact/enquiry form currently (contact is `tel:` links + HotDoc) — this **minimises** collection and is good. If a form is added later, an APP 5 collection notice is required at point of collection.
- **P5 (Best-practice):** The migration notes already caution against sending health-topic browsing data to ad platforms; treat any health-related event data as sensitive and avoid sharing with advertising platforms without consent.

---

## 6. Advertising / AHPRA assessment

Assessed against National Law **s 133** and the *Guidelines for advertising a regulated health service*. Section 133 prohibits advertising that: (a) is false/misleading/deceptive or likely to mislead/deceive; (b) offers gifts/discounts/inducements without stating terms; (c) uses **testimonials** about clinical aspects; (d) creates an **unreasonable expectation** of beneficial treatment; (e) **encourages indiscriminate or unnecessary** use of health services.

- **(a) Misleading:** Main exposure is the **Fees** page (F1–F3) and **schema specialty** (A1). Otherwise copy is measured and specific.
- **(b) Gifts/discounts:** None present — compliant.
- **(c) Testimonials:** **None present — compliant.** Forward-looking caution at A4. Schema contains **no** fabricated ratings/reviews — compliant.
- **(d) Unreasonable expectation:** No cure/guarantee/superlative language ("best", "world-class", etc. are absent). Compliant; keep the editorial rule (A5).
- **(e) Indiscriminate use:** No "book now for X" pressure or unnecessary-service prompts. Compliant.
- **Titles/specialties:** Visible pages correctly use "GP"/"family GP"/"general practitioner" and "areas of clinical interest". Only the **structured-data** specialty wording needs alignment (A1).
- **Cosmetic/skin-cancer:** Intentionally removed — this also removes the separate higher-risk cosmetic-advertising regime (Guidelines for higher-risk non-surgical cosmetic procedures, eff. 2 Sept 2025). Confirm no residual references remain (migration retired them; the retired image is archived, not shown).

**Overall AHPRA risk: LOW**, once the Fees figures/framing (F1–F3) and schema specialty (A1) are addressed.

---

## 7. Recommended changes, prioritised (implementation order)

1. **F1 + F2** — Correct and re-frame the Fees page: accurate current rebates, item-based tiers (or qualified duration labels), "current as at" date. *[Confirm figures with Medicare/billing.]*
2. **F3** — Move "if eligible / estimated" qualifiers onto the fee cards, beside the out-of-pocket figure.
3. **P1** — Add a privacy policy page + footer link. *[Confirm content with privacy adviser.]*
4. **A1** — Change schema `medicalSpecialty` to `PrimaryCare`; keep interests in `knowsAbout`.
5. **A3** — Verify FRACGP, RHW shared-care status, and article authorship are current/accurate.
6. **P3** — Disclose HotDoc (and, if/when added, analytics) in the privacy policy.
7. **F6** — Confirm GST-free status of listed services with the accountant.
8. **A6 / A2 / P2 / A4** — Best-practice: add AHPRA reg number; label non-medical degrees; set up analytics/cookies compliantly *before* enabling; adopt a no-clinical-testimonials rule.

---

## 8. Items requiring external professional confirmation

- **Medicare/billing specialist:** exact current benefit for the item(s) billed; correct item mapping for the practice's appointment types; wording of rebate/claiming explanation. (F1, F2, F4-note)
- **Privacy adviser:** privacy-policy content and scope; HotDoc data arrangement; analytics/cookie consent design under the current/soon-amended Privacy Act. (P1, P2, P3)
- **Accountant:** GST-free status of all listed services. (F6)
- **Health lawyer (optional):** final sign-off that the Fees framing and schema specialty wording satisfy s 133 and the ACL. (F1–F3, A1)
- **Practitioner:** confirm FRACGP currency, RHW shared-care registration, article authorship/review. (A3)

Where the law is in flux — notably the **Privacy Act reforms** (cookies/consent, small-business exemption review) — treat the cookie/consent items as *emerging* expectations and confirm the current position at publication.

---

## 9. Official sources consulted

- **MBS Online — Item 23** (Level B, ≥6 & <20 min; Fee/Benefit $45.05, eff. 01-Jul-2026): https://www9.health.gov.au/mbs/fullDisplay.cfm?type=item&q=23
- **MBS Online — Item 36** (Level C, ≥20 min; Fee/Benefit $87.10, eff. 01-Jul-2026): https://www9.health.gov.au/mbs/fullDisplay.cfm?type=item&q=36&qt=item
- **AHPRA — Guidelines for advertising a regulated health service:** https://www.ahpra.gov.au/Publications/Advertising-hub/Advertising-guidelines-and-other-guidance/Advertising-guidelines.aspx *(page blocks automated fetch; content cross-checked against multiple secondary summaries citing it)*
- **Health Practitioner Regulation National Law — s 133** (advertising offences): via AHPRA advertising hub and state National Law (e.g. https://legislation.nsw.gov.au).
- **Privacy Act 1988 (Cth) — s 6D** (small business / health service exception): https://classic.austlii.edu.au/au/legis/cth/consol_act/pa1988108/s6d.html
- **OAIC — Guide to health privacy:** https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/health-service-providers/guide-to-health-privacy
- **OAIC — Australian Privacy Principles guidelines (APP 1, 5, 8):** https://www.oaic.gov.au/privacy/australian-privacy-principles/australian-privacy-principles-guidelines
- **ACCC — Advertising and selling guide (misleading claims, component pricing):** https://www.accc.gov.au/business/advertising-and-promotions/advertising-and-selling-guide
- **Australian Consumer Law** — Competition and Consumer Act 2010 (Cth) Sch 2, ss 18, 29, 48.
- **Services Australia — Medicare (eligibility & claiming):** https://www.servicesaustralia.gov.au/medicare
- **ATO — GST and health:** https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/in-detail/your-industry/gst-and-health

*Figures verified against MBS Online on 2026-08-08. Medicare benefits are indexed and change (typically each 1 July) — re-verify at publication.*
