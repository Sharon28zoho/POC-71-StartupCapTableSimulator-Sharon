# Architecture Summary

## Tech Stack
- **Frontend:** React 18 / 19, TypeScript, Vite
- **Data Visualization:** Recharts
- **Styling:** CSS-in-JS inline dark mode styling

## Data Flow
1. **User Input:** User enters stakeholder or investment round parameters in `App.tsx`.
2. **State Management:** React local state (`useState`) tracks initial equity and funding rounds.
3. **Engine Calculation:** State arrays are passed into `calculateCapTable()` utility function in `src/utils/capTableEngine.ts`.
4. **Rendering:** Updated values are rendered in the Cap Table breakdown and visualized real-time using `Recharts` (`PieChart`, `Pie`, `Cell`, `Tooltip`).
