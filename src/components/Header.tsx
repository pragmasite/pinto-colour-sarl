import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Globe, Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage, getPathForLanguage } from "@/hooks/useLanguage";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, lang, otherLanguages } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.about, href: "#about-us" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.gallery, href: "#gallery" },
    { label: t.nav.hours, href: "#hours" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <a href="#" className="flex flex-col hover:opacity-80 transition-opacity">
          <span
            className={`font-serif text-xl font-bold ${
              isScrolled ? "text-primary" : "text-white"
            }`}
          >
            Pinto Colour
          </span>
          <span
            className={`text-xs tracking-widest ${
              isScrolled ? "text-muted-foreground" : "text-white/70"
            }`}
          >
            {t.nav.profession}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isScrolled
                  ? "text-foreground hover:text-primary"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}

          {/* Language Switcher */}
          <div className="flex items-center gap-2">
            <div className="h-6 w-px bg-muted"></div>
            {otherLanguages.map((langOption) => (
              <Link
                key={langOption}
                to={getPathForLanguage(langOption, location.pathname)}
                className={`text-xs font-medium uppercase px-2 py-1 rounded transition-colors ${
                  isScrolled
                    ? "text-foreground hover:text-primary"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {langOption}
              </Link>
            ))}
          </div>

          <Button asChild size="sm" className="ml-2">
            <a href="tel:+41765643753">
              <Phone className="h-4 w-4 mr-2" />
              {t.nav.call}
            </a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 ${isScrolled ? "text-foreground" : "text-white"}`}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b">
          <nav className="container mx-auto px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t">
              <div className="flex gap-2 mb-3">
                {otherLanguages.map((langOption) => (
                  <Link
                    key={langOption}
                    to={getPathForLanguage(langOption, location.pathname)}
                    className="text-xs font-medium uppercase px-2 py-1 rounded text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {langOption}
                  </Link>
                ))}
              </div>
              <Button asChild size="sm" className="w-full">
                <a href="tel:+41765643753">
                  <Phone className="h-4 w-4 mr-2" />
                  {t.nav.call}
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
