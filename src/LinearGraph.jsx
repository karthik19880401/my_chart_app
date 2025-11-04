import React, { useState } from 'react';
import { LineChart, Line, XAxis, ResponsiveContainer, ReferenceArea, ReferenceLine } from 'recharts';
import { motion } from 'framer-motion';
import { AiOutlineLine } from 'react-icons/ai';

const data = [
  { name: '9:00 AM', hour: 9, value: 60, label: "CDS - Niv 1" },
  { name: '10:00 AM', hour: 10, value: 60, label: "CDS - Niv 2" },
  { name: '1:00 PM', hour: 13, value: 60, label: "SAU - HL 2" },
  { name: '2:00 PM', hour: 14, value: 60, label: "SAU - Data" },
  { name: '4:10 PM', hour: 16.17, value: 60, label: "CDS - Niv 3" },
  { name: '5:00 PM', hour: 17, value: 60, label: "CDS - Niv 1" }
];

export default function LinearGraph() {
  const [resolver, setResolver] = useState('Mark Miller');
  const resolvers = ['Mark Miller', 'Flora MOREAU', 'Jean Dupont', 'Sophie Lambert'];

  return (
    <div className="flex items-center justify-center min-h-screen bg-white font-[Calibri] py-20 px-20">
      <div className="w-full max-w-7xl grid gap-12 grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
        
        {/* --- FIRST (WIDER) CHART --- */}
        <motion.div
          className="p-10 rounded-3xl bg-white shadow-xl border border-gray-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex justify-between items-start mb-3">
            <p className="text-xs text-gray-700 text-left">Numéro d'incident : INC0123478</p>
            <div className="flex flex-col items-end">
              <h2 className="text-sm font-extrabold text-gray-950 mb-1 tracking-tight">
                Évolution du traitement de l'incident
              </h2>
              <p className="text-xs text-gray-700 mb-1">
                Demande de restauration d'archive à la date du 25 Octobre 2025
              </p>
              <div className="w-16 h-[2px] bg-[#bae8e8] mb-2"></div>
            </div>
          </div>

          <div className="flex justify-end items-center mb-6">
            <p className="text-xs text-gray-700 text-right">
              Résolu le 3 Novembre 2025
            </p>
          </div>

          <div className="w-full h-[240px] bg-gradient-to-b from-[#e3f6f5] to-[#ffffff] rounded-xl px-10 py-12 flex items-end justify-center relative overflow-hidden">
            <ResponsiveContainer>
              <LineChart data={data} margin={{ top: 36, right: 60, left: 60, bottom: 87 }}>
                <defs>
                  <linearGradient id="colorValue1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#bae8e8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#bae8e8" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <ReferenceArea x1={10} x2={13} fill="oklch(0.977 0.013 236.62)" fillOpacity={1} />
                <ReferenceLine x={11.5} stroke="#272343" strokeDasharray="3 3" strokeWidth={1.5} />
                <ReferenceLine x={15.5} stroke="#272343" strokeDasharray="3 3" strokeWidth={1.5} />

                {/* X axis moved 7px down */}
                <XAxis
                  dataKey="hour"
                  type="number"
                  domain={[9, 17]}
                  ticks={[9, 10, 13, 14, 16.17, 17]}
                  stroke="#272343"
                  axisLine={{ stroke: '#272343' }}
                  tickLine={false}
                  tick={({ x, y, payload }) => {
                    const hours = Math.floor(payload.value);
                    const minutes = Math.round((payload.value % 1) * 60);
                    const displayHour = hours > 12 ? hours - 12 : hours;
                    const ampm = hours >= 12 ? 'PM' : 'AM';
                    return (
                      <g>
                        <text
                          x={x}
                          y={y + 27} // +7px lower than before
                          textAnchor="middle"
                          fill="#272343"
                          fontSize={12}
                          fontFamily="Calibri"
                        >
                          {`${displayHour}:${minutes.toString().padStart(2, '0')} ${ampm}`}
                        </text>
                      </g>
                    );
                  }}
                />

                {/* Line chart moved 4px up */}
                <Line
                  type="linear"
                  dataKey="value"
                  stroke="#272343"
                  strokeWidth={3}
                  dot={(props) => {
                    const { cx, cy, index } = props;
                    const label = data[index].label;
                    const isSAUHL2 = label === 'SAU - HL 2';
                    const fillColor = isSAUHL2 ? 'red' : 'green';
                    const radius = isSAUHL2 ? 6 : 3;
                    return (
                      <g>
                        <circle cx={cx} cy={cy - 4} r={radius} fill={fillColor} stroke="#bae8e8" strokeWidth={1.5} />
                        {label && (
                          <text
                            x={cx + 10}
                            y={cy - 14}
                            textAnchor="start"
                            fontSize={10}
                            fill="#272343"
                            fontFamily="Calibri"
                          >
                            {label}
                          </text>
                        )}
                      </g>
                    );
                  }}
                  activeDot={{ r: 6 }}
                  fill="url(#colorValue1)"
                  isAnimationActive
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>

            <div className="absolute top-[52%] left-[32%] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-4">
              <AiOutlineLine className="text-gray-700 text-3xl opacity-80 rotate-90" />
              <span className="text-xs text-gray-800">Incident Majeur</span>
            </div>
          </div>

          <div className="mt-6 flex justify-end text-xs text-gray-700 gap-2">
            <span>Résolu par</span>
            <select
              value={resolver}
              onChange={(e) => setResolver(e.target.value)}
              className="text-xs border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-1 focus:ring-[#bae8e8] bg-white"
            >
              {resolvers.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* --- SECOND (NARROWER) COMPONENT --- */}
        <motion.div
          className="p-10 rounded-3xl bg-white shadow-xl border border-gray-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex justify-between items-start mb-3">
            <p className="text-xs text-gray-700 text-left">
              Numéro d'incident : INC0987654
            </p>
            <div className="flex flex-col items-end">
              <h2 className="text-sm font-extrabold text-gray-950 mb-1 tracking-tight">
                Évolution du traitement de l'incident
              </h2>
              <p className="text-xs text-gray-700 mb-1">
                Analyse secondaire — 25 Octobre 2025
              </p>
              <div className="w-16 h-[2px] bg-[#bae8e8] mb-2"></div>
            </div>
          </div>

          <div className="flex justify-center items-center h-[240px] bg-gray-50 rounded-xl text-gray-400 text-sm italic">
            Aucun graphique pour cet incident
          </div>
        </motion.div>
      </div>
    </div>
  );
}
