'use client';

import { LocalStorageKey, SocialIcon, THEME_CLASSES, ThemeMode } from '@/constants';
import {
    Briefcase,
    FolderKanban,
    Github,
    Lightbulb,
    Linkedin,
    Mail,
    MapPin,
    Moon,
    Send,
    Sun,
    Users,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import contactsData from '../data/contacts.json';

export default function Sidebar() {
    const [darkMode, setDarkMode] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    const EXPANDED_WIDTH = '20rem';
    const COLLAPSED_WIDTH = '50px';

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

    useEffect(() => {
        setHydrated(true);
    }, []);

    useEffect(() => {
        const applyWidth = (isCollapsed: boolean) => {
            document.documentElement.style.setProperty(
                '--sidebar-width',
                isCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
            );
        };

        const handleResize = () => {
            const shouldCollapse = window.innerWidth < 1000;
            setCollapsed(shouldCollapse);
            applyWidth(shouldCollapse);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        document.documentElement.style.setProperty(
            '--sidebar-width',
            collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
        );
    }, [collapsed]);

    const navItems = [
        { href: '#studio', label: 'Quem somos', Icon: Users },
        { href: '#services', label: 'Serviços', Icon: Briefcase },
        { href: '#projects', label: 'Projetos', Icon: FolderKanban },
        { href: '#questions', label: 'Validar Ideia', Icon: Lightbulb },
    ];

    const isCollapsed = hydrated ? collapsed : false;
    const isDark = hydrated ? darkMode : false;
    const logoSrc = isDark ? '/assets/logo/logo-white.svg' : '/assets/logo/logo.svg';
    const toggleCollapsed = () => setCollapsed((prev) => !prev);

    const sidebarWidth = isCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;
    const sidebarPadding = isCollapsed ? 'p-3' : 'p-6';

    return (
        <div
            className="relative flex-shrink-0"
            style={{ width: sidebarWidth, transition: 'width 0.3s ease' }}
        >
            <aside
                className={`sticky top-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between overflow-y-auto overflow-x-visible z-50 transition-all duration-300 relative flex-shrink-0 ${sidebarPadding}`}
                style={{ width: '100%' }}
            >
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
                            {!isCollapsed && <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">C4TS</h1>}
                        </div>
                        {!isCollapsed && (
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                aria-label="Toggle Dark Mode"
                            >
                                {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-500" />}
                            </button>
                        )}
                    </div>

                    {!isCollapsed && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                            "Soluções de tecnologia para iniciar ou escalar seu negócio. Decisões baseadas em dados, não em palpites."
                        </p>
                    )}

                    <nav className="space-y-4">
                        {navItems.map(({ href, label, Icon }) => (
                            <a
                                key={href}
                                href={href}
                                className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <Icon className="w-4 h-4" />
                                    {!isCollapsed && <span>{label}</span>}
                                </div>
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Bottom Section */}
                {!isCollapsed && (
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
                )}

            </aside>
            <button
                onClick={toggleCollapsed}
                className="fixed top-6 w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-[60]"
                style={{ left: 'var(--sidebar-width)', transform: 'translateX(calc(50% - 30px))' }}
                aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
            >
                {collapsed ? '>' : '<'}
            </button>
        </div>
    );
}
