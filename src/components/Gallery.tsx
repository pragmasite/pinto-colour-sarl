import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { X } from "lucide-react";

const Gallery = () => {
  const { t, lang } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Descriptions translated
  const descriptions: { [key: string]: string[] } = {
    fr: ["Façade professionnelle", "Préparation peinture", "Intérieur moderne", "Finition qualité"],
    de: ["Professionelle Fassade", "Farbvorbereitung", "Modernes Interieur", "Hochwertige Verarbeitung"],
    en: ["Professional facade", "Paint preparation", "Modern interior", "Quality finish"],
  };

  const images = [
    { src: "/images/img-1.jpg", alt: descriptions[lang][0] },
    { src: "/images/img-2.jpg", alt: descriptions[lang][1] },
    { src: "/images/img-3.jpg", alt: descriptions[lang][2] },
    { src: "/images/img-4.jpg", alt: descriptions[lang][3] },
  ];

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="gallery" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm uppercase tracking-widest text-primary">{t.gallery.label}</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-4">{t.gallery.title}</h2>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">{t.gallery.description}</p>
        </motion.div>

        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
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
          {images.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl"
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-sm font-medium text-white">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-accent transition-colors z-10"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              className="w-full h-auto rounded-lg"
            />
            <p className="text-white text-center mt-4">{images[selectedImage].alt}</p>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Gallery;
