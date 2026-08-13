import React, { useState } from "react";
import type { Stakeholder, InvestmentRound } from "./types/captable";
import { calculateCapTable } from "./utils/capTableEngine";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const INITIAL_STAKEHOLDERS: Stakeholder[] = [
  { id: '1', name: 'Founder 1', role: 'Founder', shares: 5000000 },
  { id: '2', name: 'Founder 2', role: 'Founder', shares: 3000000 },
  { id: '3', name: 'ESOP Pool', role: 'Option Pool', shares: 2000000 },
];

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];

//Shared style object for all inputs and selects
const inputStyle: React.CSSProperties = {
  padding: '10px 12px',
  borderRadius: '6px',
  border: '1px solid #334155',
  backgroundColor: '#0f172a',
  color: '#f8fafc',
  fontSize: '14px',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box'
};

export default function App() {
  const [stakeholders, setStakeHolders] = useState<Stakeholder[]>(INITIAL_STAKEHOLDERS);
  const [rounds, setRounds] = useState<InvestmentRound[]>([]);

  //Stakeholders input form state
  const [newStakeHolderName, setNewStakeHolderName] = useState('');
  const [newStakeHolderRole, setNewStakeHolderRole] = useState<'Founder' | 'Angel' | 'VC' | 'Option Pool'>('Founder');
  const [newStakeHolderShares, setNewStakeHolderShares] = useState<number | ''>('');

  //Round input from state
  const [roundName, setRoundName] = useState('See Round');
  const [preMoney, setPreMoney] = useState<number | ''>(10000000);
  const [investment, setInvestment] = useState<number | ''>(20000000);
  const [investor, setInvestor] = useState('');

  const { updatedStakeholders, totalShares, totalValuation } = calculateCapTable(stakeholders, rounds);

  //Dynamic Stakeholder handler
  const handleAddStakeholder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStakeHolderName || !newStakeHolderShares) return;

    const newEntry: Stakeholder = {
      id: 'stk-${Date.now()}',
      name: newStakeHolderName,
      role: newStakeHolderRole,
      shares: Number(newStakeHolderShares),
    };

    setStakeHolders([...stakeholders, newEntry]);
    setNewStakeHolderName(''),
      setNewStakeHolderShares('');
  };

  //Dynamic Round Handler
  const handleAddRound = (e: React.FormEvent) => {
    e.preventDefault();
    if (!investor || !preMoney || !investment) return;

    const newRound: InvestmentRound = {
      id: 'rnd-${Date.now}',
      roundName,
      preMoneyValuation: Number(preMoney),
      investmentAmount: Number(investment),
      investorName: investor,
    };

    setRounds([...rounds, newRound]);
    setInvestor('');
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh' }}>
      <h1>Startup Cap Table Simulator</h1>

      {/*Summary Cards*/}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div style={{ padding: '15px', background: '#1e293b', borderRadius: '8px', minWidth: '200px' }}>
          <small>Total Outstanding Shares</small>
          <h2>{totalShares.toLocaleString()}</h2>
        </div>
        <div style={{ padding: '15px', background: '#1e293b', borderRadius: '8px', minWidth: '200px' }}>
          <small>Implied Valuation</small>
          <h2>${totalValuation.toLocaleString()}</h2>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <div>
          {/* Form 1: Add Dynamic Stakeholder*/}
          <div style={{ background: '#1e293b', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <h3>1. Add Stakeholder / Initial Equity</h3>
            <form onSubmit={handleAddStakeholder} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="text"
                placeholder="Stakeholder Name"
                value={newStakeHolderName}
                onChange={(e) => setNewStakeHolderName(e.target.value)}
                required
              />
              <select
                value={newStakeHolderRole}
                onChange={(e) => setNewStakeHolderRole(e.target.value as any)}
                style={{ padding: '8px', borderRadius: '4px' }}>
                <option value="Founder">Founder</option>
                <option value="Angel">Angel</option>
                <option value="VC">VC</option>
                <option value="Option Pool">Option Pool</option>
              </select>
              <input
                type="number"
                placeholder="Shares Issued"
                value={newStakeHolderShares}
                onChange={(e) => setNewStakeHolderShares(e.target.value ? Number(e.target.value) : '')}
                required
              />
              <button type="submit" style={{ padding: '8px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Add Stakeholder
              </button>
            </form>
          </div>

          {/* Form 2: Simulate Investment Round */}
          <div style={{ background: '#1e293b', padding: '15px', borderRadius: '8px' }}>
            <h3>2. Simulate Funding Rounds</h3>
            <form onSubmit={handleAddRound} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input type="text" placeholder="Round Name" value={roundName} onChange={(e) => setRoundName(e.target.value)}
                required
              />
              <input type="number" placeholder="Pre-Money Valuation ($)" value={preMoney} onChange={(e) => setPreMoney(e.target.value ? Number(e.target.value) : '')}
                required
              />
              <input type="number" placeholder="Investment Amount ($)" value={investment} onChange={(e) => setInvestment(e.target.value ? Number(e.target.value) : '')}
                required
              />
              <input type="text" placeholder="Investor Name" value={investor} onChange={(e) => setInvestor(e.target.value)}
                required
              />
              <button type="submit" style={{ padding: '8px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Simulate Round & Dilute
              </button>
            </form>
          </div>

          {/*Table View*/}
          <h3 style={{ marginTop: '30px' }}>Cap Table Breakdown</h3>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #334155' }}>
                <th>Stakeholder</th>
                <th>Roles</th>
                <th>Shares</th>
                <th>Ownership %</th>
              </tr>
            </thead>
            <tbody>
              {updatedStakeholders.map((s) => (
                <tr key={s.stakeholderId} style={{ borderBottom: '1px solid #1e283b' }}>
                  <td>{s.name}</td>
                  <td>{s.role}</td>
                  <td>{s.shares.toLocaleString()}</td>
                  <td><b>{s.ownershipPercentage}%</b></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/*Visual Chart*/}
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', height: '450px' }}>
          <h3>Equity Ownership Breakdown</h3>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie data={updatedStakeholders} dataKey="ownershipPercentage" nameKey="name" cx="50%" outerRadius={100} label>
                {updatedStakeholders.map((_, index) => (
                  <Cell key={'cell-${index}'} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
