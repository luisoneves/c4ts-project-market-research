'use client';

import { useState, useRef, FormEvent } from 'react';
import questionsData from '../data/questions.json';

// Simple Toast Component
const Toast = ({ message, onClose }: { message: string, onClose: () => void }) => (
    <div className="fixed top-4 right-4 max-w-sm w-full bg-white dark:bg-gray-800 border-l-4 border-green-500 shadow-lg rounded-r-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 z-50 animate-fade-in-down">
        <div className="p-4 flex-1">
            <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                    <span className="text-2xl">✅</span>
                </div>
                <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {message}
                    </p>
                </div>
            </div>
        </div>
        <div className="flex border-l border-gray-200 dark:border-gray-700">
            <button
                onClick={onClose}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
                Close
            </button>
        </div>
    </div>
);

export default function QuestionsSection() {
    const [submitting, setSubmitting] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        setShowToast(false);

        const formData = new FormData(e.currentTarget);
        const fileInput = formData.get('file') as File;

        // Generate Client ID
        const submissionId = Math.random().toString().slice(2, 8);

        formData.append('id', submissionId);

        try {
            let fileUrl = '';

            // 1. Validation
            if (fileInput && fileInput.size > 0) {
                // 200MB limit
                if (fileInput.size > 200 * 1024 * 1024) {
                    alert('O arquivo é muito grande. O limite máximo é 200MB.');
                    setSubmitting(false);
                    return;
                }

                // File type validation
                const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp', 'application/pdf'];
                if (!allowedTypes.includes(fileInput.type)) {
                    alert('Tipo de arquivo não permitido. Apenas JPEG, PNG, SVG, WEBP e PDF são aceitos.');
                    setSubmitting(false);
                    return;
                }

                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!uploadRes.ok) {
                    throw new Error('Falha no upload do arquivo.');
                }

                const uploadData = await uploadRes.json();
                fileUrl = uploadData.url;
            }

            // 2. Submit to Formspree (Fallback/Notification)
            // Clone formData to send to Formspree
            const formspreeData = new FormData();
            formData.forEach((value, key) => {
                if (key !== 'file') { // Don't send file binary to Formspree if using URL
                    formspreeData.append(key, value);
                }
            });
            if (fileUrl) {
                formspreeData.append('file_url', fileUrl);
            }

            const formspreeRes = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || '', {
                method: 'POST',
                body: formspreeData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!formspreeRes.ok) {
                console.warn('Falha ao enviar para Formspree, mas upload ok.');
            }

            // 3. Success Feedback
            setShowToast(true);
            if (formRef.current) {
                formRef.current.reset();
            }

        } catch (error) {
            console.error('Erro no envio:', error);
            alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section id="questions" className="section questions-section bg-gray-50 dark:bg-gray-800 transition-colors duration-300 relative">
            {showToast && (
                <Toast
                    message="Seu protótipo foi enviado! Vamos analisar sua ideia e entraremos em contato em até 48h."
                    onClose={() => setShowToast(false)}
                />
            )}

            <div className="container mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{questionsData.title}</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{questionsData.subtitle}</p>

                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="max-w-2xl mx-auto bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
                >
                    {questionsData.fields.map((field) => {
                        const labelClass = "block mb-2 text-gray-700 dark:text-gray-200";
                        const inputClass = "w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none";

                        if (field.type === 'select') {
                            return (
                                <label key={field.name} className="block mb-4">
                                    <span className={labelClass}>{field.label}</span>
                                    <select name={field.name} required={field.required} className={inputClass} defaultValue="">
                                        <option value="" disabled>Selecione...</option>
                                        {field.options?.map((opt) => (
                                            <option key={opt} value={opt.toLowerCase()}>{opt}</option>
                                        ))}
                                    </select>
                                </label>
                            );
                        } else if (field.type === 'textarea') {
                            return (
                                <label key={field.name} className="block mb-4">
                                    <span className={labelClass}>{field.label}</span>
                                    <textarea name={field.name} className={inputClass} rows={3} required={field.required}></textarea>
                                </label>
                            );
                        } else if (field.type === 'file') {
                            return (
                                <label key={field.name} className="block mb-4">
                                    <span className={labelClass}>{field.label}</span>
                                    <input
                                        type="file"
                                        name="file" // Ensure name is 'file' for backend
                                        accept={field.accept}
                                        className={inputClass}
                                        disabled={submitting}
                                    />
                                </label>
                            );
                        } else {
                            return (
                                <label key={field.name} className="block mb-4">
                                    <span className={labelClass}>{field.label}</span>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        placeholder={field.placeholder || ''}
                                        required={field.required}
                                        className={inputClass}
                                    />
                                </label>
                            );
                        }
                    })}

                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-green-600 dark:bg-green-500 text-white px-6 py-3 rounded hover:bg-green-700 dark:hover:bg-green-600 w-full transition-colors font-semibold flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? 'Enviando...' : questionsData.submitLabel}
                    </button>
                </form>
            </div>
        </section>
    );
}
