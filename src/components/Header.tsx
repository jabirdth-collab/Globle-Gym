import { useState, useEffect } from 'react';
import { Dumbbell, Menu, X, Settings2 } from 'lucide-react';

interface HeaderProps {
  onAdminToggle: () => void;
  isAdminVisible: boolean;
  onClaimFreePass: () => void;
}

export default function Header({ onAdminToggle, isAdminVisible, onClaimFreePass }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'Programs', href: '#programs' },
    { label: 'Club Tour', href: '#tour' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'BMI Tool', href: '#bmi' },
    { label: 'Memberships', href: '#pricing' },
    { label: 'Coaches', href: '#coaches' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="app-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-obsidian-900/90 backdrop-blur-md border-b border-obsidian-700 py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2 group" id="nav-logo">
            <span className="p-2 bg-neon-yellow text-obsidian-900 rounded-lg group-hover:rotate-12 transition-transform duration-300">
              <Dumbbell className="h-6 w-6" />
            </span>
            <span className="font-display font-bold text-xl sm:text-2xl tracking-wider text-white">
              GLOBAL<span className="text-neon-yellow">GYM</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" id="desktop-nav">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-slate-300 hover:text-neon-yellow font-medium text-sm tracking-wide transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Call To Actions */}
          <div className="hidden sm:flex items-center space-x-4">
            <button
              onClick={onAdminToggle}
              id="admin-hub-toggle"
              className={`p-2 rounded-lg border transition-all duration-200 ${
                isAdminVisible
                  ? 'bg-neon-yellow/20 border-neon-yellow text-neon-yellow'
                  : 'border-obsidian-700 text-slate-400 hover:border-slate-500 hover:text-white'
              }`}
              title="Toggle Admin Lead Hub"
            >
              <Settings2 className="h-5 w-5" />
            </button>
            <button
              onClick={onClaimFreePass}
              id="header-free-pass"
              className="bg-neon-yellow hover:bg-neon-yellow-hover text-obsidian-900 px-5 py-2 rounded-lg font-display font-semibold text-sm tracking-uppercase transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] shadow-[0_4px_14px_rgba(202,234,16,0.25)]"
            >
              Claim Free Pass
            </button>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={onAdminToggle}
              id="admin-hub-toggle-mobile"
              className={`p-2 rounded-md ${
                isAdminVisible ? 'text-neon-yellow bg-obsidian-700' : 'text-slate-400'
              }`}
            >
              <Settings2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-trigger"
              className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-obsidian-800 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden bg-obsidian-800 border-b border-obsidian-700" id="mobile-nav-panel">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 rounded-md text-base font-medium text-slate-300 hover:bg-obsidian-700 hover:text-neon-yellow transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-obsidian-700 px-3 flex flex-col space-y-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onClaimFreePass();
                }}
                id="mobile-free-pass"
                className="w-full bg-neon-yellow text-obsidian-900 py-3 rounded-lg font-display font-semibold text-center hover:bg-neon-yellow-hover transition-colors shadow-md"
              >
                Claim Free Pass
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
