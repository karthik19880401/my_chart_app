<div className="w-full max-w-7xl grid gap-12 grid-cols-[6%_1fr_0.9fr]">
  {/* --- Left Component with Icons --- */}
  <motion.div
    className="p-4 rounded-3xl bg-white shadow-xl border border-gray-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-[370px] flex flex-col justify-center items-center gap-8"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
    whileHover={{ scale: 1.01 }}
  >
    <AiOutlineMail className="text-3xl text-[#272343] opacity-90" />
    <AiOutlineClockCircle className="text-3xl text-[#272343] opacity-90" />
    <AiOutlineDatabase className="text-3xl text-[#272343] opacity-90" />
    <AiOutlineUser className="text-3xl text-[#272343] opacity-90" />
    <AiOutlineCheckCircle className="text-3xl text-[#272343] opacity-90" />
  </motion.div>

  {/* --- Charts 1 and 2 --- */}
  {[1, 2].map((chartIndex) => (
    <motion.div
      key={chartIndex}
      className={`p-10 rounded-3xl bg-white shadow-xl border border-gray-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
        chartIndex === 1 ? 'h-[370px]' : 'h-[370px] w-[90%] justify-self-center'
      }`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      whileHover={{ scale: 1.01 }}
    >
      {/* chart content unchanged */}
    </motion.div>
  ))}
</div>