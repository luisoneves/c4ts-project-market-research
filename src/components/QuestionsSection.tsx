'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import questionsData from '../data/questions.json';

export default function QuestionsSection() {
    const [uploading, setUploading] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    const [status, setStatus] = useState('');

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];

        setUploading(true);
        setStatus('Uploading...');

        try {
            const fileName = `${Date.now()}_${file.name.replace(/\s/g, '_')}`;
            const { data, error } = await supabase.storage
                .from('uploads')
                .upload(fileName, file);

            if (error) {
                throw error;
            }

            // Get public URL
            const { data: publicUrlData } = supabase.storage
                .from('uploads')
                .getPublicUrl(fileName);

            if (publicUrlData) {
                setFileUrl(publicUrlData.publicUrl);
                setStatus('Upload complete!');
            }
        } catch (error: any) {
            console.error('Upload Error:', error);
            setStatus(`Upload failed: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    return (
        <section id="questions" className="section questions-section bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{questionsData.title}</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{questionsData.subtitle}</p>

                <form
                    action={process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT}
                    method="POST"
                    className="max-w-2xl mx-auto bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
                >
                    {/* Hidden input for file URL */}
                    <input type="hidden" name="file_url" value={fileUrl} />

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
                                        accept={field.accept}
                                        className={inputClass}
                                        onChange={handleFileChange}
                                        disabled={uploading}
                                    />
                                    <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">{status}</p>
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
                        disabled={uploading}
                        className="bg-green-600 dark:bg-green-500 text-white px-6 py-3 rounded hover:bg-green-700 dark:hover:bg-green-600 w-full transition-colors font-semibold flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {uploading ? 'Aguarde o upload...' : questionsData.submitLabel}
                    </button>
                </form>
            </div>
        </section>
    );
}
