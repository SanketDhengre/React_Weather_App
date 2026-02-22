import { motion } from "framer-motion";

export default function Forecast({ title, data }) {
  return (
    <div className="w-full relative z-10">
      <div className="flex items-center justify-start mb-4">
        <h3 className="font-medium text-sm md:text-base text-white/70 uppercase tracking-widest">
          {title}
        </h3>
      </div>
      <div className="h-px bg-white/10 w-full mb-6" />

      <div className="flex items-center justify-between gap-2 overflow-x-auto scrollbar-none pb-2">
        {data.map((d, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors min-w-[80px]"
          >
            <p className="font-medium text-xs sm:text-sm text-white/80">{d.title}</p>
            <img
              src={d.icon}
              alt="weather icon"
              className="w-12 h-12 sm:w-14 sm:h-14 my-2 drop-shadow-md filter"
            />
            <p className="font-semibold text-base sm:text-lg text-white">{`${d.temp.toFixed()}°`}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

