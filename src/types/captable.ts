export interface Stakeholder {
    id: string;
    name: string;
    role: 'Founder' | 'Angel' | 'VC' | 'Option Pool';
    shares: number;
}

export interface InvestmentRound {
    id: string;
    roundName: string;
    preMoneyValuation: number;
    investmentAmount: number;
    investorName: string;
    newSharesIssued?: number;
}

export interface CapTableSummary {
    stakeholderId: string;
    name: string;
    role: string;
    shares: number;
    ownershipPercentage: number;
}