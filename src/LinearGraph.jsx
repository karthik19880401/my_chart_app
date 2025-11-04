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
      <div className="w-full max-w-7xl grid gap-12 grid-cols-1 lg:grid-cols-2">

        {[1, 2].map((chartIndex) => (
          <motion.div
            key={chartIndex}
            className="p-10 rounded-3xl bg-white shadow-xl border border-gray-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition