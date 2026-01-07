import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Palette, Home, Hammer, Wrench } from "lucide-react";

const Services = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const iconMap: { [key: number]: React.ReactNode } = {
    0: <Palette className="h-8 w-8" />,
    1: <Wrench className="h-8 w-8" />,
    2: <Hammer className="h-8 w-8" />,
    3: <Home className="h-8 w-8" />,
    4: <Wrench className="h-8 w-8" />,
    5: <Palette className="h-8 w-8" />,
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm uppercase tracking-widest text-primary">{t.services.label}</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-4">{t.services.title}</h2>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">{t.services.description}</p>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {t.services.items.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-background p-8 rounded-xl border shadow-soft hover:shadow-medium hover:border-accent/50 transition-all group cursor-pointer"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-accent group-hover:text-accent/80 transition-colors">
                  {iconMap[index % 6]}
                </div>
              </div>
              <h3 className="font-serif text-lg font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
