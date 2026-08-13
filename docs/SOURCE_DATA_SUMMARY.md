# Source Data Summary

## Data Models
The application operates on dynamic TypeScript data interfaces:

- **Stakeholder Model (`Stakeholder`):**
  - `id`: Unique identifier
  - `name`: Stakeholder name
  - `role`: Founder | Angel | VC | Option Pool
  - `shares`: Number of equity shares held

- **Investment Round Model (`InvestmentRound`):**
  - `id`: Round identifier
  - `roundName`: Seed, Series A, etc.
  - `preMoneyValuation`: Pre-money valuation ($)
  - `investmentAmount`: Investment capital injected ($)
  - `investorName`: Investor name
