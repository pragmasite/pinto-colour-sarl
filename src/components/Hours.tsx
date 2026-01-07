import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, CheckCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const Hours = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Example schedule - adjust as needed
  const schedule = [
    { hours: "07:00 - 19:00" },
    { hours: "07:00 - 19:00" },
    { hours: "07:00 - 19:00" },
    { hours: "07:00 - 19:00" },
    { hours: "07:00 - 18:00" },
    { hours: "08:00 - 12:00" },
    { hours: t.hours.closed },
  ];

  // Get today's day (0 = Sunday, 1-6 = Mon-Sat)
  // Convert to index (0 = Monday, 6 = Sunday)
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1;

  return (
    <section id="hours" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm uppercase tracking-widest text-primary">{t.hours.label}</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-4">{t.hours.title}</h2>
        </motion.div>

        <motion.div
          className="mx-auto max-w-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="rounded-2xl border bg-background shadow-soft overflow-hidden">
            <div className="flex items-center gap-3 border-b bg-primary/5 px-6 py-4">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-serif text-lg font-bold">{t.hours.header}</span>
            </div>
            <div className="divide-y">
              {schedule.map((item, i) => {
                const isToday = i === todayIndex;
                const isClosed = item.hours === t.hours.closed;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className={`px-6 py-4 flex justify-between items-center transition-colors ${
                      isToday ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isToday && <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />}
                      <span className={`text-sm ${isToday ? "font-semibold text-primary" : ""}`}>
                        {t.hours.days[i]}
                      </span>
                      {isToday && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full whitespace-nowrap">
                          {t.hours.today}
                        </span>
                      )}
                    </div>
                    <span className={`text-sm ${isClosed ? "text-muted-foreground" : ""}`}>
                      {item.hours}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hours;
