import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      label: t.contact.phone,
      value: "+41 76 564 37 53",
      href: "tel:+41765643753",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      label: t.contact.email,
      value: "contact@pintocolor.ch",
      href: "mailto:contact@pintocolor.ch",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      label: t.contact.address,
      value: "Route de Belfaux 8A, 1762 Givisiez, Switzerland",
      href: "https://maps.google.com/?q=Route+de+Belfaux+8A,+1762+Givisiez",
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm uppercase tracking-widest text-primary">{t.contact.label}</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-4">
            {t.contact.title1}
            <br />
            <span className="text-accent">{t.contact.title2}</span>
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">{t.contact.description}</p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 items-start">
          <motion.div
            className="space-y-6"
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
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.href}
                target={info.label === t.contact.address ? "_blank" : undefined}
                rel={info.label === t.contact.address ? "noopener noreferrer" : undefined}
                variants={itemVariants}
                className="flex gap-4 p-6 bg-background rounded-xl border shadow-soft hover:shadow-medium hover:border-accent/50 transition-all group"
              >
                <div className="text-accent group-hover:scale-110 transition-transform">{info.icon}</div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {info.value}
                  </p>
                </div>
              </motion.a>
            ))}

            <motion.div
              variants={itemVariants}
              className="pt-6"
            >
              <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90">
                <a href="tel:+41765643753">
                  <Phone className="h-5 w-5 mr-2" />
                  {t.contact.callNow}
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="overflow-hidden rounded-xl shadow-soft border"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <iframe
              src="https://maps.google.com/maps?q=Route+de+Belfaux+8A,+1762+Givisiez&t=m&z=15&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
