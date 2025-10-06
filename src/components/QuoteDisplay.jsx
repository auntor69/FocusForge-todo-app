import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export function QuoteDisplay({ quote, accentColor }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow p-6 mb-6 border-l-4"
      style={{ borderLeftColor: accentColor }}
    >
      <div className="flex gap-4">
        <Quote className="w-8 h-8 flex-shrink-0 opacity-30" style={{ color: accentColor }} />
        <blockquote className="text-gray-700 dark:text-gray-200 text-lg italic">
          "{quote.text}"
        </blockquote>
      </div>
    </motion.div>
  );
}
