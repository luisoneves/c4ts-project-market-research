'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
    Github,
    Linkedin,
    Send,
    Moon,
    Sun,
    Mail,
    MapPin,
    Briefcase,
    FolderKanban,
    Lightbulb,
    Users,
} from 'lucide-react';
import contactsData from '../data/contacts.json';
import { ThemeMode, LocalStorageKey, THEME_CLASSES, SocialIcon } from '@/constants';

export default function Sidebar() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Check local storage or system preference
        const stored = localStorage.getItem(LocalStorageKey.THEME);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const shouldDark = stored === ThemeMode.DARK || (!stored && prefersDark);
        console.log('[theme] hydrate', { stored, prefersDark, shouldDark });
        if (shouldDark) {
            document.documentElement.classList.add(THEME_CLASSES.DARK);
            setDarkMode(true);
        } else {
            document.documentElement.classList.remove(THEME_CLASSES.DARK);
            setDarkMode(false);
        }
    }, []);

    const toggleTheme = () => {
        const next = !darkMode;
        console.log('[theme] toggle', { from: darkMode, to: next });
        if (next) {
            document.documentElement.classList.add(THEME_CLASSES.DARK);
            localStorage.setItem(LocalStorageKey.THEME, ThemeMode.DARK);
        } else {
            document.documentElement.classList.remove(THEME_CLASSES.DARK);
            localStorage.setItem(LocalStorageKey.THEME, ThemeMode.LIGHT);
        }
        setDarkMode(next);
    };

    const navItems = [
        { href: '#studio', label: 'Quem somos', Icon: Users },
        { href: '#services', label: 'Serviços', Icon: Briefcase },
        { href: '#projects', label: 'Projetos', Icon: FolderKanban },
        { href: '#questions', label: 'Validar Ideia', Icon: Lightbulb },
    ];

    const logoSrc = darkMode ? '/assets/logo/logo-white.svg' : '/assets/logo/logo.svg';

    return (
        <aside className="fixed left-0 top-0 h-screen w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between p-6 overflow-y-auto z-50 transition-colors duration-300">
            {/* Top Section */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <Image
                            src={logoSrc}
                            alt="C4TS logo"
                            width={24}
                            height={24}
                            className="w-6 h-6"
                        />
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">C4TS</h1>
                    </div>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Toggle Dark Mode"
                    >
                        {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-500" />}
                    </button>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                    "Soluções de tecnologia para iniciar ou escalar seu negócio. Decisões baseadas em dados, não em palpites."
                </p>

                <nav className="space-y-4">
                    {navItems.map(({ href, label, Icon }) => (
                        <a
                            key={href}
                            href={href}
                            className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <Icon className="w-4 h-4" />
                                <span>{label}</span>
                            </div>
                        </a>
                    ))}
                </nav>
            </div>

            {/* Bottom Section */}
            <div>
                <div className="flex space-x-6 mb-8">
                    {contactsData.social.map((social) => {
                        // Map icon names from JSON to Lucide components
                        let Icon = Send; // Default
                        if (social.name === SocialIcon.GITHUB) Icon = Github;
                        if (social.name === SocialIcon.LINKEDIN) Icon = Linkedin;
                        if (social.name === SocialIcon.TELEGRAM) Icon = Send;

                        return (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300 flex items-center gap-1"
                                title={social.name}
                            >
                                <Icon className="w-5 h-5" />
                            </a>
                        );
                    })}
                </div>

                <div className="space-y-2 text-xs font-light text-gray-400 dark:text-gray-500 opacity-75">
                    <p className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <a href="mailto:contato@c4ts.tech" className="hover:underline">contato@c4ts.tech</a>
                    </p>
                    <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>São Paulo, SP</span>
                    </p>
                    <p className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                        © 2025 C4TS — Laboratório de Soluções Digitais
                    </p>
                </div>
            </div>
        </aside>
    );
}
