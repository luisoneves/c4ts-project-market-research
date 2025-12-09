// src/components/ConnectSection.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
// import Script from 'next/script'; // Pode manter comentado se não usa

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    clarity: (...args: any[]) => void;
    ym: (...args: any[]) => void;
  }
}

// IDs de rastreamento - Fallback seguro se as variáveis não existirem
const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || 'G-V3HNTBMVQE';
const YANDEX_METRICA_ID = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID || '105756046';

const ConnectSection: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [submissionId, setSubmissionId] = useState('');

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setSubmissionId(`sub-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file || !name || !whatsapp || !submissionId) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('whatsapp', whatsapp);
    formData.append('email', email);
    formData.append('id', submissionId);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Upload successful:', result);

        const clarityEventHeader = response.headers.get('X-Clarity-Event');
        if (clarityEventHeader && window.clarity) {
          window.clarity('event', clarityEventHeader);
        }

        const ga4EventHeader = response.headers.get('X-GA4-Event');
        if (ga4EventHeader && window.gtag) {
          window.gtag('event', ga4EventHeader, {
            event_category: 'form_submission',
            event_label: `Submission ID: ${submissionId}`,
            value: 1,
          });
        }

        if (window.ym) {
            // Conversão segura do ID para número
            const yandexId = parseInt(String(YANDEX_METRICA_ID), 10);
            if (!isNaN(yandexId)) {
                window.ym(yandexId, 'reachGoal', 'form_submitted', {
                    submissionId: submissionId,
                    fileName: file.name,
                });
            }
        }

        alert('Formulário enviado com sucesso! Sua solicitação está sendo processada.');
        formRef.current?.reset();
        setFile(null);
        setName('');
        setWhatsapp('');
        setEmail('');
        setSubmissionId(`sub-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);

      } else {
        const errorData = await response.json();
        console.error('Upload failed:', errorData.error);
        alert(`Falha ao enviar formulário: ${errorData.error || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Network or submission error:', error);
      alert('Ocorreu um erro ao tentar enviar o formulário.');
    }
  };

  return (
    <section id="connect" className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
          Conecte-se Conosco
        </h2>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
          Tem uma ideia ou precisa de uma solução? Vamos conversar.
        </p>
        <form ref={formRef} onSubmit={handleSubmit} className="mt-12 text-left space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 dark:text-gray-200">
              Nome Completo
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="whatsapp" className="block text-lg font-medium text-gray-700 dark:text-gray-200">
              WhatsApp (com DDD)
            </label>
            <input
              type="tel"
              id="whatsapp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required
              placeholder="(XX) XXXXX-XXXX"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 dark:text-gray-200">
              Email (Opcional)
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="file" className="block text-lg font-medium text-gray-700 dark:text-gray-200">
              Anexe seu arquivo (documento, imagem, etc.)
            </label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              required
              className="mt-1 block w-full text-sm text-gray-900 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer bg-gray-50 dark:bg-gray-700 focus:outline-none focus:border-indigo-500"
            />
            {file && <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Arquivo selecionado: {file.name}</p>}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-800"
            >
              Enviar Solicitação
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ConnectSection;
