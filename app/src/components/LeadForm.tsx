import React, { useState } from 'react';
import { useLeadContext } from '../context/LeadContext';

const normalizeName = (name: string): string => {
  return name
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const validateEmail = (email: string): { valid: boolean; message?: string } => {
  const trimmedEmail = email.trim();
  const emailRegex = /^[^\s@]+@([^\s@]+)$/;
  const match = emailRegex.exec(trimmedEmail);
  if (!match) return { valid: false, message: 'Formato de email inválido' };
  const domain = match[1].toLowerCase();
  if (domain !== 'javeriana.edu.co') {
    return { valid: false, message: 'El email debe tener dominio @javeriana.edu.co' };
  }
  return { valid: true };
};

const LeadForm: React.FC = () => {
  const { addLead } = useLeadContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccessMsg('');

    let hasError = false;
    const newErrors: { name?: string; email?: string } = {};

    const trimmedName = name.trim();
    if (!trimmedName) {
      newErrors.name = 'El nombre es obligatorio';
      hasError = true;
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      newErrors.email = emailValidation.message;
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // Normalización
    const normalizedName = normalizeName(name);
    const normalizedEmail = email.trim().toLowerCase();

    addLead({ name: normalizedName, email: normalizedEmail });
    setSuccessMsg(`¡Lead registrado! ${normalizedName} ha sido agregado correctamente.`);
    setName('');
    setEmail('');
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-javeriana/10 dark:bg-blue-400/10 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-javeriana dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Interesados</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
            Nombre completo <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              id="name"
              placeholder="Ej. Juan Pérez"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-4 focus:ring-javeriana/20 focus:border-javeriana focus:outline-none dark:bg-gray-700 dark:text-white transition-all ${
                errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
          </div>
          {errors.name && <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.name}
          </p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
            Email Institucional <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <input
              type="email"
              id="email"
              placeholder="usuario@javeriana.edu.co"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-4 focus:ring-javeriana/20 focus:border-javeriana focus:outline-none dark:bg-gray-700 dark:text-white transition-all ${
                errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
          </div>
          {errors.email && <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.email}
          </p>}
        </div>

        <button
          type="submit"
          className="w-full bg-javeriana text-white py-3 px-4 rounded-xl hover:bg-javeriana-dark shadow-lg shadow-javeriana/20 transition-all duration-300 font-bold text-sm transform active:scale-[0.98]"
        >
          Registrar Información
        </button>

        {successMsg && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-xl text-center border border-green-100 dark:border-green-800 animate-pulse-subtle">
            <div className="flex items-center justify-center gap-2 font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {successMsg}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};


export default LeadForm;