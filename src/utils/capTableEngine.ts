import type { Stakeholder, InvestmentRound, CapTableSummary } from '../types/captable';

export function calculateCapTable(
    initialStakeholders: Stakeholder[],
    rounds: InvestmentRound[]
): { updatedStakeholders: CapTableSummary[]; totalShares: number; totalValuation: number } {
    let currentStakeholders = [...initialStakeholders];
    let totalShares = currentStakeholders.reduce((sum, s) => sum + s.shares, 0);
    let sharePrice = 1.0; // Default base valuation price per share

    // Process each funding round sequentially
    rounds.forEach((round) => {
        sharePrice = round.preMoneyValuation / totalShares;
        const newShares = Math.round(round.investmentAmount / sharePrice);

        // Add or update investor shares
        const existingIndex = currentStakeholders.findIndex(
            (s) => s.name.toLowerCase() === round.investorName.toLowerCase()
        );

        if (existingIndex >= 0) {
            currentStakeholders[existingIndex].shares += newShares;
        } else {
            currentStakeholders.push({
                id: `inv-${Date.now()}`,
                name: round.investorName,
                role: 'VC',
                shares: newShares,
            });
        }

        totalShares += newShares;
    });

    const totalValuation = totalShares * sharePrice;

    // Calculate percentage breakdown for ownership visualization
    const updatedStakeholders: CapTableSummary[] = currentStakeholders.map((s) => ({
        stakeholderId: s.id,
        name: s.name,
        role: s.role,
        shares: s.shares,
        ownershipPercentage: Number(((s.shares / totalShares) * 100).toFixed(2)),
    }));

    return { updatedStakeholders, totalShares, totalValuation };
}