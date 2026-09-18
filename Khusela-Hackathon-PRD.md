# Khusela Safety — Hackathon PRD

**Status:** Hackathon build scope
**Version:** 0.1-hackathon
**Date:** 18 September 2026
**Repository:** Khusela frontend shell + Firebase backend
**Purpose:** Define exactly what we are building, and explicitly what we are not, so the team ships one working demo instead of a partial production system.

---

## 1. What we're building

Khusela is a safety app for women in South Africa facing gender-based violence. For this hackathon, we are demonstrating one core loop, end to end, for real:

> Press SOS → capture live location → alert a trusted contact by SMS → show the alert live on a map → AI gives a quick triage suggestion.

This is not a full production platform. It is a proof of concept that the core detection-to-alert loop can work in real time using free/low-cost tools.

---

## 2. In scope for the hackathon

- **SOS activation:** existing `SosActiveScreen` / `SosCountdownOverlay` write a real Firestore document on activation (replacing `mockData.ts`).
- **Live location:** browser Geolocation API captures lat/lng at time of activation.
- **Real-time map:** `SafetyMapScreen` subscribes to Firestore (`onSnapshot`) and shows active incidents live, no refresh needed.
- **Guardian SMS alert:** a Cloud Function fires on new incidents and sends a real SMS via Twilio (trial account, one verified guardian number) with a link to the live map.
- **AI triage:** the same Cloud Function calls the Gemini API for a simple urgency level + suggested resource, written back onto the incident document.
- **No authentication:** a single hardcoded demo user ID stands in for real accounts.
- **Open Firestore rules (test mode):** acceptable for a local, judged demo only.

---

## 3. Explicitly out of scope

Everything below is real, unbuilt, and should **not** be implied as working in the demo or pitch:

- Phone/OTP authentication, sessions, or account management
- Trusted-contact invite/accept flow (guardian number is hardcoded)
- Provider/responder dispatch, verification, or provider portal
- POPIA consent records, data export/deletion, audit trails
- Offline/USSD/SMS-only fallback channels
- Duress PIN, safety PIN, or any covert-state handling
- Community incident reporting, moderation, or danger-zone scoring
- Admin/operations console
- Any accessibility, security-rule, or load testing beyond a basic smoke test

If the existing frontend shell displays any of the above as if functional (fake accreditation numbers, fake response times, fake dispatch confirmations), **flag it clearly as a demo/mock in the pitch** — don't let judges believe it's live.

---

## 4. Tech stack

| Layer | Tool |
|---|---|
| Frontend | Existing React + TypeScript (Vite) shell |
| Database | Cloud Firestore (single `incidents` collection) |
| Backend logic | Firebase Cloud Functions (TypeScript) |
| Notifications | Twilio (SMS, trial account) + Firebase Cloud Messaging (in-app, stretch) |
| AI | Gemini API (free tier) |
| Hosting | Not required unless frontend isn't already deployed |

---

## 5. Data model

Single collection, `incidents`:

| Field | Type | Notes |
|---|---|---|
| `userId` | string | hardcoded demo value |
| `lat` | number | from Geolocation API |
| `lng` | number | from Geolocation API |
| `timestamp` | Firestore Timestamp | server time |
| `status` | string | `"active"` / `"resolved"` |
| `urgencyLevel` | string | added by Cloud Function (Gemini) |
| `suggestedResource` | string | added by Cloud Function (Gemini) |

---

## 6. MVP acceptance criteria (demo-ready, not production-ready)

1. Pressing SOS creates exactly one Firestore document with real coordinates.
2. `SafetyMapScreen` shows the new incident live, without a page refresh.
3. The hardcoded guardian phone number receives a real SMS with a live-map link within a few seconds.
4. The incident document is updated with an AI-generated urgency level and resource suggestion.
5. None of the above requires the user to sign in.
6. The pitch clearly states what is real (this loop) vs. what is mocked (everything else in the existing shell).

---

## 7. Stretch goals, if time remains

- FCM push to other logged-in devices in addition to SMS.
- A second guardian contact.
- A basic resolve/cancel button that updates `status` to `"resolved"`.
- Swap the hardcoded urgency logic for a short chatbot triage (2–3 questions) instead of a single Gemini call.

---

## 8. One-line pitch framing

*"We built and demonstrated the core detection-to-alert loop of a Samsung SOS-style safety app for South Africa's GBV crisis — real location, real SMS, real AI triage — as the foundation for the fuller trusted-network and verified-responder system outlined in our full product spec."*
