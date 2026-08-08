# Content map — patient questions → pages

How the site answers real questions patients ask AI assistants and search
engines. Each hub uses answer-first Q&A passages (rendered as HTML **and**
`FAQPage` schema), an "In brief" summary, and verified Australian sources.

## 20 highest-value questions the site now answers

| # | Question | Answered at |
|---|---|---|
| 1 | Can a GP help with perimenopause and menopause? | `/womens-health` |
| 2 | When should I see a GP about heavy periods? | `/womens-health` · `/articles/understanding-what-causes-heavy-periods` |
| 3 | What contraception can I discuss with a GP? | `/womens-health` · `/articles/contraception-options-in-australia-how-a-gp-can-help-you-choose` |
| 4 | Can a GP help with PCOS? | `/womens-health` · `/articles/pcos-and-irregular-periods-what-a-gp-can-check-first` |
| 5 | I've found a breast lump — should I see a GP? | `/womens-health` · `/articles/breast-lumps-breast-pain-and-screening-when-to-see-a-gp` |
| 6 | Do I need a referral for cervical screening? | `/womens-health` · `/articles/cervical-screening-and-self-collection-a-gp-guide-for-patients` |
| 7 | What is GP shared antenatal care? | `/pregnancy-care` · `/articles/shared-antenatal-care-with-a-gp-and-the-royal-hospital-for-women` |
| 8 | Can a GP do pregnancy shared care with the Royal Hospital for Women? | `/pregnancy-care` |
| 9 | When should I see a GP before trying to get pregnant? | `/pregnancy-care` · `/articles/when-should-i-see-a-gp-before-trying-for-a-baby` |
| 10 | What happens at a pre-pregnancy (preconception) GP appointment? | `/pregnancy-care` |
| 11 | Positive pregnancy test — what happens at the first GP visit? | `/pregnancy-care` · `/articles/positive-pregnancy-test-what-happens-at-the-first-gp-visit` |
| 12 | What does the six-week postnatal check involve? | `/pregnancy-care` · `/articles/the-six-week-postnatal-check-looking-after-mother-and-baby` |
| 13 | When should I take my child to a GP for a fever? | `/childrens-health` |
| 14 | What does a GP check at a baby's six-week appointment? | `/childrens-health` |
| 15 | When are childhood immunisations due? | `/childrens-health` · `/articles/childhood-immunisations-and-development-checks-with-a-gp` |
| 16 | Can a GP help with my child's eczema? | `/childrens-health` · `/articles/baby-and-childhood-eczema-getting-the-basics-right` |
| 17 | I'm worried about my child's development — should I see a GP? | `/childrens-health` |
| 18 | Can I talk to a GP about ADHD concerns in my child? | `/childrens-health` · `/articles/adhd-concerns-in-children-first-steps-with-a-gp` |
| 19 | What should I bring to my first appointment? | `/general-gp-care` |
| 20 | How far ahead should I book a travel appointment? | `/general-gp-care` · `/articles/travel-medicine-and-vaccines-what-to-discuss-before-you-go` |

**Also answered:** who/what/qualifications/where (`/about` fact block + FAQ);
continuity, mental health, men's health, general health checks (`/general-gp-care`).

### Local queries (supported by the site's facts)
- "Female GP in Maroubra / South Maroubra" → `/`, `/about`
- "GP in Maroubra for women's health / perimenopause" → `/womens-health`
- "Pregnancy shared care near Randwick / with the Royal Hospital for Women" → `/pregnancy-care`
- "GP in Maroubra for preconception care" → `/pregnancy-care`
- "Where to take my child to a GP in Maroubra" → `/childrens-health`

## 10 highest-value content gaps still remaining

1. **Menopause & MHT depth** — a dedicated article on managing menopause / who can prescribe menopausal hormone therapy (perimenopause article exists; this would answer "can my GP prescribe HRT?").
2. **Newborn / first-weeks GP care** — jaundice, weight, feeding, the newborn check (feeding & six-week content exists, but not a first-weeks overview).
3. **Childhood illness red flags** — a fuller "when is my child's illness serious?" piece beyond the fever FAQ.
4. **Preconception checklist** — folate, vaccinations, screening as a practical checklist (the "when to see a GP before a baby" article is close but not a checklist).
5. **Chronic disease management / GP management plans** — care plans, team care, reviews (mentioned on the hub, no dedicated content).
6. **Adult mental health** — a general anxiety/low-mood/mental-health-care-plan article (perinatal mental health exists; general adult does not).
7. **Contraception comparison** — a side-by-side of methods (article exists but could be deeper/structured).
8. **Pelvic pain / endometriosis pathway** — a dedicated "when pelvic pain needs investigation" piece (endometriosis article exists; pelvic pain as an entry point does not).
9. **Immunisation schedule reference** — a plain-language schedule explainer (kept general on the hub; a reference page would help "what vaccines at what age").
10. **Preventive health by age/sex** — a "what checks should I have and when" overview.

*(Non-content gaps also outstanding: privacy policy page; confirmed opening hours; additional verified `sameAs` profiles — see the compliance & entity docs.)*

## Medical statements deliberately NOT added (could not verify, or avoided for safety)

- **Specific vaccine ages/doses.** Kept to "follow the National Immunisation Program"; did not enumerate exact ages/vaccines (the Australian Immunisation Handbook URL did not resolve during checks — did not want to state a schedule I couldn't confirm).
- **Exact developmental-check ages.** Kept general ("newborn period and key ages") rather than citing specific months.
- **A numeric fever temperature threshold.** Used age/symptom red-flags (under 3 months, non-blanching rash, poor feeding, etc.) aligned with Healthdirect, rather than a specific °C cutoff.
- **Cervical screening interval as a number of years.** Kept general ("when it's due") to avoid stating an interval I did not verify against a primary source.
- **Drug names / doses** for MHT or contraception — referred to categories only ("the pill", "IUD", "menopausal hormone therapy"), no brands or dosing.
- **"Medically reviewed by" another clinician** — deliberately not claimed; the editorial policy states content is author-attributed to Dr Henderson and reviewed periodically.
- **Skin cancer checks / cosmetic services** — excluded by the practice's positioning.
- **Outcome guarantees / effectiveness claims** — none added.
- **External deep links that did not return HTTP 200** during verification (some health.gov.au / Immunisation Handbook / Smartraveller / Raising Children pages) — omitted in favour of verified Healthdirect, Jean Hailes, Pregnancy Birth & Baby, RHW, RANZCOG, Cancer Council, RACGP and NSW Health links.

## Where to edit
- Hub Q&A, "In brief", sources → `lib/site.ts` (`serviceAreas[].faqs`, `inBriefByArea`, `furtherReadingByArea`).
- Articles → `content/articles/*.mdx`.
- Editorial policy → `app/editorial-policy/page.tsx`.
- Article trust block → `app/articles/[slug]/page.tsx`.
