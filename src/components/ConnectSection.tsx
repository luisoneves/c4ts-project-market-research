
import contactsData from '../data/contacts.json';
import { Send, Github, Linkedin, Mail, MapPin } from 'lucide-react';

export default function ConnectSection() {
    return (
        <section id="connect" className="section connect-section bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{contactsData.title}</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{contactsData.description}</p>

                <div className="flex flex-wrap gap-6 mb-8">
                    {contactsData.social.map((social) => {
                        let Icon = Send;
                        if (social.name === 'GitHub') Icon = Github;
                        if (social.name === 'LinkedIn') Icon = Linkedin;

                        return (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-bold">{social.name}</span>
                            </a>
                        )
                    })}
                </div>

                <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400">
                    {contactsData.contactInfo.map((contact, index) => {
                        const isEmail = contact.type === 'email';
                        return (
                            <span key={index} className="mr-4 flex items-center gap-2">
                                {isEmail ? <Mail className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                                {contact.value}
                            </span>
                        )
                    })}
                </div>
                <div className="mt-8 text-gray-500 dark:text-gray-600 text-sm">
                    {contactsData.copyright}
                </div>
            </div>
        </section>
    );
}
