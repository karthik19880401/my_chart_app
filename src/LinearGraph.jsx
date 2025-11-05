import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  ResponsiveContainer,
  ReferenceArea,
  ReferenceLine,
} from "recharts";
import { motion } from "framer-motion";
import {
  AiFillDatabase,
  AiFillClockCircle,
  AiOutlineCloud,
  AiFillTool,
  AiFillCheckCircle,
} from "react-icons/ai";

const data = [
  { name: "9:00 AM", hour: 9, value: 60, label: "CDS - Niv 1" },
  { name: "10:00 AM", hour: 10, value: 60, label: "CDS - Niv 2" },
  { name: "1:00 PM", hour: 13, value: 60, label: "SAU - HL 2" },
  { name: "2:00 PM", hour: 14, value: 60, label: "SAU - Data" },
  { name: "4:10 PM", hour: 16.17, value: 60, label: "CDS - Niv 3" },
  { name: "5:00 PM", hour: 17, value: 60, label: "CDS - Niv 1" },
];

export default function App() {
  const [resolver, setResolver] = useState("Mark Miller");
  const resolvers = ["Mark Miller", "Flora MOREAU", "Jean Dupont", "Sophie Lambert"];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white font-[Calibri] py-12 px-16">
      {/* Intro Component */}
      <motion.div
        className="w-full max-w-7xl bg-white p-6 rounded-3xl mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-lg font-semibold text-gray-900 mb-2 text-left">
          Demande de restauration d'une archive Outlook
        </h1>
        <p className="text-sm text-gray-700 leading-relaxed text-left">
          Ci-dessous, vous avez une vue d'ensemble de la procédure pour traiter une demande de
          restauration d'une archive. Chacune des étapes est à appliquer consciencieusement, elle
          est décrite sur le panel à droite. La ligne verticale du graph vous permet de voir les
          différents groupes d'affectation et leur temps d'intervention, le graph sinusoidal vous
          montre le temps de traitement, la différence entre le temps de traitement d'une phase
          préétablie et le temps pris pour le faire.
        </p>
      </motion.div>

      {/* Layout */}
      <div className="w-full max-w-7xl grid gap-10 grid-cols-1 lg:grid-cols-[6%,54%,40%]">
        {/* Left Icon Component */}
        <motion.div
          className="bg-white border border-gray-200 rounded-3xl flex flex-col items-center justify-center py-10 gap-6"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {[AiFillDatabase, AiFillClockCircle, AiOutlineCloud, AiFillTool, AiFillCheckCircle].map(
            (Icon, index) => (
              <Icon key={index} className="text-gray-700 text-xl hover:text-[#bae8e8] transition-colors" />
            )
          )}
        </motion.div>

        {/* Charts */}
        {[1, 2].map((chartIndex) => (
          <motion.div
            key={chartIndex}
            className="p-8 rounded-3xl bg-white shadow-xl border border-gray-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex justify-between items-start mb-3">
              <p className="text-xs text-gray-700">
                Numéro d'incident : {chartIndex === 1 ? "INC0123478" : "INC0987654"}
              </p>
              <div className="flex flex-col items-end">
                <h2 className="text-sm font-extrabold text-gray-950 mb-1 tracking-tight">
                  Évolution du traitement de l'incident
                </h2>
                <div className="w-16 h-[2px] bg-[#bae8e8] mb-2"></div>
              </div>
            </div>

            <div className="w-full h-[300px] bg-gradient-to-b from-[#e3f6f5] to-[#ffffff] rounded-xl px-10 py-12 flex items-end justify-center relative overflow-hidden">
              <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 40, right: 60, left: 60, bottom: 80 }}>
                  <defs>
                    <linearGradient id={`colorValue${chartIndex}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#bae8e8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#bae8e8" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <ReferenceArea x1={10} x2={13} fill="oklch(0.977 0.013 236.62)" fillOpacity={1} />
                  <ReferenceLine x={11.5} stroke="#272343" strokeDasharray="3 3" strokeWidth={1.5} />
                  <ReferenceLine x={15.5} stroke="#272343" strokeDasharray="3 3" strokeWidth={1.5} />

                  <XAxis
                    dataKey="hour"
                    type="number"
                    domain={[9, 17]}
                    ticks={[9, 10, 13, 14, 16.17, 17]}
                    stroke="#272343"
                    axisLine={{ stroke: "#272343" }}
                    tickLine={false}
                    tick={({ x, y, payload }) => {
                      const hours = Math.floor(payload.value);
                      const minutes = Math.round((payload.value % 1) * 60);
                      const displayHour = hours > 12 ? hours - 12 : hours;
                      const ampm = hours >= 12 ? "PM" : "AM";
                      return (
                        <g>
                          <text
                            x={x}
                            y={y + 27}
                            textAnchor="middle"
                            fill="#272343"
                            fontSize={12}
                            fontFamily="Calibri"
                          >
                            {`${displayHour}:${minutes.toString().padStart(2, "0")} ${ampm}`}
                          </text>
                        </g>
                      );
                    }}
                  />

                  <Line
                    type="linear"
                    dataKey="value"
                    stroke="#272343"
                    strokeWidth={3}
                    dot={(props) => {
                      const { cx, cy, index } = props;
                      const label = data[index].label;
                      const isSAUHL2 = label === "SAU - HL 2";
                      const fillColor = isSAUHL2 ? "red" : "green";
                      const radius = isSAUHL2 ? 6 : 3;
                      return (
                        <g>
                          <circle
                            cx={cx}
                            cy={cy - 4}
                            r={radius}
                            fill={fillColor}
                            stroke="#bae8e8"
                            strokeWidth={1.5}
                          />
                          {label && (
                            <text
                              x={cx + 10}
                              y={cy - 12}
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
                    fill={`url(#colorValue${chartIndex})`}
                    isAnimationActive
                    animationDuration={1500}
                    style={{ filter: "drop-shadow(0px 4px 6px rgba(39,35,67,0.6))" }}
                  />
                </LineChart>
              </ResponsiveContainer>

              {chartIndex === 1 && (
                <div className="absolute bottom-4 right-4 text-xs text-gray-700 flex items-center gap-2">
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
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
