'use client';

import { useState, useEffect } from 'react';
import { Github, Linkedin, Send, Moon, Sun, Mail, MapPin } from 'lucide-react';
import contactsData from '../data/contacts.json';
import { ThemeMode, LocalStorageKey, THEME_CLASSES, SocialIcon } from '@/constants';

export default function Sidebar() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Check local storage or system preference
        if (localStorage.getItem(LocalStorageKey.THEME) === ThemeMode.DARK || (!(LocalStorageKey.THEME in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setDarkMode(true);
            document.documentElement.classList.add(THEME_CLASSES.DARK);
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove(THEME_CLASSES.DARK);
        }
    }, []);

    const toggleTheme = () => {
        if (darkMode) {
            document.documentElement.classList.remove(THEME_CLASSES.DARK);
            localStorage.setItem(LocalStorageKey.THEME, ThemeMode.LIGHT);
            setDarkMode(false);
        } else {
            document.documentElement.classList.add(THEME_CLASSES.DARK);
            localStorage.setItem(LocalStorageKey.THEME, ThemeMode.DARK);
            setDarkMode(true);
        }
    };

    return (
        <aside className="fixed left-0 top-0 h-screen w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between p-6 overflow-y-auto z-50 transition-colors duration-300">
            {/* Top Section */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">C4TS</h1>
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
                    {/* Simple anchor links for single page scroll */}
                    <a href="#studio" className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Quem somos</a>
                    <a href="#services" className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Serviços</a>
                    <a href="#projects" className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Projetos</a>
                    <a href="#questions" className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Validar Ideia</a>
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
