# User Acceptance Testing Checklist

## Project Information
- **PoC Number:** PoC 71
- **PoC Title:** Startup Cap Table Simulator
- **Developer:** Sharon S Varghese
- **Batch:** Batch 7
- **Test Date:** August 13, 2026

| Test ID | Feature | Preconditions | Test Steps | Expected Result | Actual Result | Status | Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **UAT-01** | App Initialization | Dev server running | Open `http://localhost:5173` | Dashboard renders cleanly with dark theme | Page loaded with initial state | **PASS** | `Screenshot (130).png` |
| **UAT-02** | Add Stakeholder | App initialized | Fill form and submit | New stakeholder added and pie chart updates | Cap table and chart updated | **PASS** | Manual Execution |
| **UAT-03** | Simulate Funding Round | Stakeholders loaded | Enter round details and submit | Investment round processes and applies dilution | Round simulated correctly | **PASS** | Manual Execution |
## Defects Identified & Fixed
- **Defect 1:** Module resolution error for `recharts`. Fixed via `npm install recharts`.
- **Defect 2:** Casing mismatch in engine return `updatedStakeHolders` vs `updatedStakeholders`. Fixed in destructuring assignment.

## Final Result
**UAT PASS**