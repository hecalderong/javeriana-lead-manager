import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Lead, LeadContextType } from '../types';

const LeadContext = createContext<LeadContextType | undefined>(undefined);

const STORAGE_KEY = 'javeriana_leads';

export const LeadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  }, [leads]);

  const addLead = (leadData: Omit<Lead, 'id' | 'timestamp'>) => {
    const newLead: Lead = {
      ...leadData,
      id: Date.now(),
      timestamp: Date.now(),
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const removeLead = (id: number) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
  };

  return (
    <LeadContext.Provider value={{ leads, addLead, removeLead }}>
      {children}
    </LeadContext.Provider>
  );
};

export const useLeadContext = (): LeadContextType => {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLeadContext must be used within LeadProvider');
  }
  return context;
};
