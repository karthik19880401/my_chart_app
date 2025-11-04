import React, { useState } from 'react';
import { LineChart, Line, XAxis, ResponsiveContainer, ReferenceArea, ReferenceLine } from 'recharts';
import { motion } from 'framer-motion';
import { AiOutlineLine } from 'react-icons/ai';

const data = [
  { name: '9:00 AM', hour: 9, value: 60, label: 'CDS - Niv 1' },
  { name: '10:00 AM', hour: 10, value: 60, label: 'CDS - Niv 2' },
  { name: '1:00 PM', hour: 13, value: 60, label: 'SAU - HL 2' },
  { name: '2:00 PM', hour: 14, value: 60, label: 'SAU - Data' },
  { name: '4:10 PM', hour: 16.17, value: 60, label: 'CDS - Niv 3' },
  { name: '5:00 PM', hour: 17, value: 60, label: 'CDS - Niv 1' }
];

export default function DualGraphPreview() {
  const [resolver, setResolver] = useState('Mark Miller');
  const resolvers = ['Mark Miller', 'Flora MOREAU', 'Jean Dupont', 'Sophie Lambert'];

  const ChartCard = ({ id, incident, subtitle, resolved }) => (
    <motion.div
      key={id}
      className="p-6 rounded-3xl bg-white shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-200"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex justify-between items-start mb-3">
        <p className="text-xs text-gray-700 text-left">Numéro d'incident : {incident}</p>
        <div className="flex flex-col items-end">
          <h2 className="text-sm font-extrabold text-gray-950 mb-1 tracking-tight">Évolution du traitement de l'incident</h2>
          <p className="text-xs text-gray-700 mb-1">{subtitle}</p>
          <div className="w-16 h-[2px] bg-[#bae8e8] mb-2"></div>
        </div>
      </div>

      <div className="flex justify-end items-center mb-6">
        <p className="text-xs text-gray-700 text-right">Résolu le {resolved}</p>
      </div>

      <div className="w-full h-[400px] bg-gradient-to-b from-[#e3f6f5] to-[#ffffff] rounded-xl px-6 py-10 flex items-end justify-center relative overflow-hidden">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 40, right: 30, left: 30, bottom: 80 }}>
            <defs>
              <linearGradient id={`color${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#bae8e8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#bae8e8" stopOpacity={0}/>
              </linearGradient>
            </defs>

            <ReferenceArea x1={10} x2={13} fill="oklch(0.977 0.013 236.62)" fillOpacity={1} />
            <ReferenceLine x={11.5} stroke="#272343" strokeDasharray="3 3" strokeWidth={1.5} />
            <ReferenceLine x={15.5} stroke="#272343" strokeDasharray="3 3" strokeWidth={1.5} />

            <XAxis dataKey="hour" type="number" domain={[9, 17]} ticks={[9, 10, 13, 14, 16.17, 17]} stroke="#272343" axisLine={{ stroke: '#272343' }} tickLine={false}
              tick={({ x, y, payload }) => {
                const hours = Math.floor(payload.value);
                const minutes = Math.round((payload.value % 1) * 60);
                const displayHour = hours > 12 ? hours - 12 : hours;
                const ampm = hours >= 12 ? 'PM' : 'AM';
                return (
                  <g>
                    <text x={x} y={y + 20} textAnchor="middle" fill="#272343" fontSize={12} fontFamily="Calibri">
                      {`${displayHour}:${minutes.toString().padStart(2, '0')} ${ampm}`}
                    </text>
                  </g>
                );
              }}
            />

            <Line type="linear" dataKey="value" stroke="#272343" strokeWidth={3} dot={(props) => {
              const { cx, cy, index } = props;
              const label = data[index].label;
              const isSAUHL2 = label === 'SAU - HL 2';
              const fillColor = isSAUHL2 ? 'red' : 'green';
              const radius = isSAUHL2 ? 6 : 3;
              return (
                <g>
                  <circle cx={cx} cy={cy} r={radius} fill={fillColor} stroke="#bae8e8" strokeWidth={1.5} />
                  {label && (
                    <text x={cx + 10} y={cy - 10} textAnchor="start" fontSize={10} fill="#272343" fontFamily="Calibri">{label}</text>
                  )}
                </g>
              );
            }} activeDot={{ r: 6 }} fill={`url(#color${id})`} isAnimationActive animationDuration={1500} />
          </LineChart>
        </ResponsiveContainer>

        <div className="absolute top-1/2 left-[32%] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-4">
          <AiOutlineLine className="text-gray-700 text-3xl opacity-80 rotate-90" />
          <span className="text-xs text-gray-800">Incident Majeur</span>
        </div>

        <div className="absolute bottom-4 right-4 text-xs text-gray-700 flex items-center gap-2">
          <span>Résolu par</span>
          <select value={resolver} onChange={(e) => setResolver(e.target.value)} className="text-xs border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-1 focus:ring-[#bae8e8] bg-white">
            {resolvers.map((name) => (<option key={name} value={name}>{name}</option>))}
          </select>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 font-[Calibri] py-10 px-10">
      <div className="w-full max-w-7xl grid gap-8 grid-cols-1 lg:grid-cols-2">
        <ChartCard id="A" incident="INC0123478" subtitle="Demande de restauration d'archive à la date du 25 Octobre 2025" resolved="3 Novembre 2025" />
        <ChartCard id="B" incident="INC0987654" subtitle="Analyse secondaire — 25 Octobre 2025" resolved="4 Novembre 2025" />
      </div>
    </div>
  );
}

