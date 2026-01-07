import { useLanguage } from "@/hooks/useLanguage";
import { Mail, Phone } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3 mb-8">
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Pinto Colour Sàrl</h3>
            <p className="text-sm text-primary-foreground/80">{t.footer.description}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t.footer.navigation}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about-us" className="hover:text-accent transition-colors">
                  {t.about.label}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-accent transition-colors">
                  {t.services.label}
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-accent transition-colors">
                  {t.gallery.label}
                </a>
              </li>
              <li>
                <a href="#hours" className="hover:text-accent transition-colors">
                  {t.hours.label}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-accent transition-colors">
                  {t.contact.label}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t.contact.label}</h4>
            <div className="space-y-3 text-sm">
              <a
                href="tel:+41765643753"
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Phone className="h-4 w-4" />
                +41 76 564 37 53
              </a>
              <a
                href="mailto:contact@pintocolor.ch"
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Mail className="h-4 w-4" />
                contact@pintocolor.ch
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8">
          <p className="text-center text-sm text-primary-foreground/70">
            © {currentYear} Pinto Colour Sàrl. {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
