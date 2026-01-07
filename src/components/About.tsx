import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Check } from "lucide-react";

const About = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
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
    <section id="about-us" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm uppercase tracking-widest text-primary">{t.about.label}</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-4">
            {t.about.title1}
            <br />
            <span className="text-accent">{t.about.title2}</span>
          </h2>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-serif text-2xl mb-4">{t.about.title1}</h3>
            <p className="text-muted-foreground mb-4">{t.about.p1}</p>
            <p className="text-muted-foreground mb-8">{t.about.p2}</p>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-serif text-primary mb-2">20+</div>
                <p className="text-sm text-muted-foreground">{t.about.stat1}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-serif text-primary mb-2">500+</div>
                <p className="text-sm text-muted-foreground">{t.about.stat2}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-serif text-primary mb-2">5.0</div>
                <p className="text-sm text-muted-foreground">{t.about.stat3}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 gap-4"
          >
            {t.about.features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-background p-6 rounded-xl border shadow-soft hover:shadow-medium transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <Check className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif font-bold text-foreground mb-2">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
