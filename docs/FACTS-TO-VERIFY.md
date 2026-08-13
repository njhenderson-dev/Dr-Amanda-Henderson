# Facts to verify

These facts are currently **assumed** on the site (carried over from the
original website or supplied verbally). They should be confirmed by Dr Henderson
/ the practice before being relied on. Nothing here was invented, but each
should be checked and corrected if wrong. Update the referenced files if a value
changes — do not hard-code facts elsewhere.

| Fact | Assumed value | Where it's used | Confirm |
|---|---|---|---|
| **FRACGP** (current fellowship) | Fellow of the RACGP | `lib/site.ts` (`qualifications`, `credentials`); About page; `lib/schema.ts` (`hasCredential`, memberOf RACGP); article bylines | Confirm current fellowship status |
| **MBBS** | Held | `lib/site.ts`; About page; schema `hasCredential` | Confirm |
| **AHPRA registration** | Registered medical practitioner | About page ("Registered medical practitioner (AHPRA)") | Confirm current registration; optionally add the MED registration number |
| **Royal Hospital for Women — shared antenatal care** | Registered shared care provider, Randwick | Homepage trust strip; About; Pregnancy hub; `lib/site.ts` service copy; `llms.txt` | Confirm current shared-care registration |
| **Practice / NAP** | GP Maroubra, 14 Meagher Avenue, South Maroubra NSW 2035; (02) 9311 9311 | `lib/site.ts` (`practice`); schema `MedicalClinic`/`Physician`; Contact | Confirm address + phone are current |
| **HotDoc appointment types** | Standard (~15 min), Long (up to 30 min), New patient (45 min, phone-booked) | `data/appointmentTypes.ts` (appointment selector) | Confirm the exact HotDoc reason-for-visit labels and durations; update `bookingName`/`duration` to match precisely |
| **Prior (non-medical) qualifications** | MAppIFin, BComm, BBus | About page ("prior qualifications") | Confirm; these are framed as non-clinical |

Still to obtain (kept as empty placeholders so nothing is invented — see
`lib/site.ts` `clinicExtras`): practice **opening hours**, **geo coordinates**,
and a verified **Google Business Profile** URL for `sameAs`.
