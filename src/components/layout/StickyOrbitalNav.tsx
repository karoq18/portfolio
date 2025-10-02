'use client';

import { useActiveSection } from "@/app/hooks/useActiveSection";
import { FaUser, FaTools, FaProjectDiagram, FaEnvelope, FaGithub } from 'react-icons/fa';

const navItems = [
  { id: 'about', icon: <FaUser />, label: 'O mnie', href: '#about' },
  { id: 'skills', icon: <FaTools />, label: 'Umiejętności', href: '#skills' },
  { id: 'projects', icon: <FaProjectDiagram />, label: 'Projekty', href: '#projects' },
  { id: 'contact', icon: <FaEnvelope />, label: 'Kontakt', href: '#contact' },
  { id: 'github', icon: <FaGithub />, label: 'GitHub', href: 'https://github.com/karolina-cwiklinska', external: true },
];

export default function StickyOrbitalNav() {
  const activeId = useActiveSection(['about', 'skills', 'projects', 'contact']);

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 bg-opacity-90 px-6 py-3 rounded-full shadow-xl flex gap-5 z-50 md:hidden">
      {navItems.map((item, index) => (
        <a
          key={index}
          href={item.href}
          target={item.external ? '_blank' : '_self'}
          rel="noreferrer"
          className={`w-10 h-10 flex items-center justify-center rounded-full transition text-xl
            ${activeId === item.id ? 'text-green-400' : 'text-white hover:text-green-300'}`}
          title={item.label}
        >
          {item.icon}
        </a>
      ))}
    </nav>
  );
}
