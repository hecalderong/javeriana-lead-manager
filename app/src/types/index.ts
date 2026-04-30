export interface Event {
  id: number;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
}

export interface Lead {
  id: number;
  name: string;
  email: string;
  timestamp: number;
}

export interface LeadContextType {
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'timestamp'>) => void;
  removeLead: (id: number) => void;
}

export type CategoryOption = 'Pregrado' | 'Posgrado' | 'Educación Continua' | '';