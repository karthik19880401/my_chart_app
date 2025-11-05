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
    <div className="flex flex-col items-center justify-center min-h-screen bg-white font-[Calibri] py-20 px-20">
      
      {/* --- Intro Text Component --- */}
      <motion.div
        className="max-w-6xl mb-10 text-center bg-[#f9fbfb] p-8 rounded-2xl shadow-md border border-gray-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-xl font-bold text-[#272343] mb-3">Demande de restauration d'une archive Outlook</h1>
        <p className="text-sm text-gray-700 leading-relaxed">
          Ci-dessous, vous avez une vue d'ensemble de la procédure pour traiter une demande de restauration d'une archive,
          chacune des étapes est à appliquer consciencieusement, elle est décrite sur le panel à droite.
          La ligne verticale du graph vous permet de voir les différents groupes d'affectation et leur temps d'intervention,
          le graph sinusoïdal vous montre le temps de traitement, la différence entre le temps de traitement d'une phase
          prétablie et le temps pris pour le faire.
        </p>
      </motion.div>

      {/* --- Charts Section --- */}
      <div className="w-full max-w-7xl grid gap-12 grid-cols-1 lg:grid-cols-2">
        {[1, 2].map((chartIndex) => (
          <motion.div
            key={chartIndex}
            className={`p-10 rounded-3xl bg-white shadow-xl border border-gray-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${chartIndex === 1 ? 'h-[350px]' : 'h-[350px] w-[90%] justify-self-center'}`}
            initial={{ opacity: 0