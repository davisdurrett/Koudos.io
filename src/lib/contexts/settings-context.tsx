import React, { createContext, useContext, useState, useEffect } from "react";

interface BusinessSettings {
  name: string;
  website: string;
  email: string;
  phone: string;
  logo?: string;
  protocol: "https" | "http";
  countryCode: string;
  ratingThreshold: number;
  googleReviewUrl: string;
  feedbackFormUrl: string;
}

interface AIResponseSettings {
  tone: "professional" | "casual" | "friendly";
  delay: number;
  maxLength: number;
  includeBusinessName: boolean;
  customPrompt?: string;
}

interface NotificationSettings {
  emailEnabled: boolean;
  pushEnabled: boolean;
  soundEnabled: boolean;
  aiAutoResponse: boolean;
  urgentRatingThreshold: number;
  responseReminders: boolean;
  aiSettings: AIResponseSettings;
  reminderInterval: number;
  urgentNotifications: string[];
}

interface Settings {
  business: BusinessSettings;
  notifications: NotificationSettings;
}

const defaultSettings: Settings = {
  business: {
    name: "My Business",
    website: "",
    email: "",
    phone: "",
    protocol: "https",
    countryCode: "1",
    ratingThreshold: 4,
    googleReviewUrl: "https://g.page/review/...",
    feedbackFormUrl: "https://feedback.koudos.io/...",
  },
  notifications: {
    emailEnabled: true,
    pushEnabled: true,
    soundEnabled: true,
    aiAutoResponse: false,
    urgentRatingThreshold: 2,
    responseReminders: true,
    aiSettings: {
      tone: "professional",
      delay: 0,
      maxLength: 500,
      includeBusinessName: true,
      customPrompt: "",
    },
    reminderInterval: 24,
    urgentNotifications: [""],
  },
};

interface SettingsContextType {
  settings: Settings;
  isLoading: boolean;
  updateBusinessSettings: (settings: Partial<BusinessSettings>) => void;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;
  saveSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings from localStorage on mount
  useEffect(() => {
    const loadSettings = () => {
      try {
        const savedSettings = localStorage.getItem("settings");
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings));
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const updateBusinessSettings = (updates: Partial<BusinessSettings>) => {
    setSettings((prev) => ({
      ...prev,
      business: { ...prev.business, ...updates },
    }));
  };

  const updateNotificationSettings = (
    updates: Partial<NotificationSettings>,
  ) => {
    setSettings((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, ...updates },
    }));
  };

  const saveSettings = () => {
    localStorage.setItem("settings", JSON.stringify(settings));
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        isLoading,
        updateBusinessSettings,
        updateNotificationSettings,
        saveSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
