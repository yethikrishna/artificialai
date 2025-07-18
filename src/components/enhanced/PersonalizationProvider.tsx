import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface PersonalizationSettings {
  theme: 'light' | 'dark' | 'auto';
  animationsEnabled: boolean;
  soundEnabled: boolean;
  preferredModel: string | null;
  chatHistory: boolean;
  notifications: boolean;
  language: string;
}

interface PersonalizationContextType {
  settings: PersonalizationSettings;
  updateSettings: (updates: Partial<PersonalizationSettings>) => void;
  resetSettings: () => void;
}

const defaultSettings: PersonalizationSettings = {
  theme: 'auto',
  animationsEnabled: true,
  soundEnabled: false,
  preferredModel: null,
  chatHistory: true,
  notifications: true,
  language: 'en'
};

const PersonalizationContext = createContext<PersonalizationContextType | undefined>(undefined);

interface PersonalizationProviderProps {
  children: ReactNode;
}

export function PersonalizationProvider({ children }: PersonalizationProviderProps) {
  const [settings, setSettings] = useState<PersonalizationSettings>(defaultSettings);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('yeti-personalization');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error('Failed to parse personalization settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('yeti-personalization', JSON.stringify(settings));
  }, [settings]);

  // Apply theme changes
  useEffect(() => {
    const root = document.documentElement;
    
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else if (settings.theme === 'light') {
      root.classList.remove('dark');
    } else {
      // Auto theme - check system preference
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      if (mediaQuery.matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [settings.theme]);

  const updateSettings = (updates: Partial<PersonalizationSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('yeti-personalization');
  };

  return (
    <PersonalizationContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </PersonalizationContext.Provider>
  );
}

export function usePersonalization() {
  const context = useContext(PersonalizationContext);
  if (context === undefined) {
    throw new Error('usePersonalization must be used within a PersonalizationProvider');
  }
  return context;
}