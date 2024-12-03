import React, { createContext, useContext, useState } from "react";

interface BusinessSettings {
  name: string;
  website: string;
  email: string;
  phone: string;
  protocol: "https" | "http";
  countryCode: string;
}

interface NotificationSettings {
  newReviews: {
    email: boolean;
    push: boolean;
  };
  lowRatings: {
    email: boolean;
    push: boolean;
  };
  responseReminders: {
    email: boolean;
    push: boolean;
  };
  weeklyReports: boolean;
  monthlySummary: boolean;
  quietHours: {
    start: string;
    end: string;
  };
  weekendNotifications: boolean;
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  autoLogout: "15" | "30" | "60" | "never";
}

interface AppearanceSettings {
  theme: "light" | "dark" | "system";
  accentColor: string;
  fontSize: "sm" | "md" | "lg";
  compactMode: boolean;
  showQuickActions: boolean;
}

interface TemplateSettings {
  positiveReview: string;
  negativeReview: string;
  reviewRequest: {
    subject: string;
    body: string;
  };
  followUp: {
    subject: string;
    body: string;
  };
  smsRequest: string;
  smsFollowUp: string;
  autoPersonalization: boolean;
  smartSuggestions: boolean;
}

interface TeamMember {
  id: string;
  email: string;
  role: "admin" | "member" | "viewer";
  status: "active" | "pending";
}

interface TeamSettings {
  members: TeamMember[];
  allowResponseEditing: boolean;
  requireApproval: boolean;
  analyticsAccess: boolean;
}

interface SettingsContextType {
  business: BusinessSettings;
  notifications: NotificationSettings;
  security: SecuritySettings;
  appearance: AppearanceSettings;
  templates: TemplateSettings;
  team: TeamSettings;
  updateBusinessSettings: (settings: Partial<BusinessSettings>) => void;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;
  updateSecuritySettings: (settings: Partial<SecuritySettings>) => void;
  updateAppearanceSettings: (settings: Partial<AppearanceSettings>) => void;
  updateTemplateSettings: (settings: Partial<TemplateSettings>) => void;
  updateTeamSettings: (settings: Partial<TeamSettings>) => void;
  inviteTeamMember: (email: string, role: TeamMember["role"]) => void;
  removeTeamMember: (id: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [business, setBusiness] = useState<BusinessSettings>({
    name: "",
    website: "",
    email: "",
    phone: "",
    protocol: "https",
    countryCode: "1",
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    newReviews: { email: true, push: true },
    lowRatings: { email: true, push: true },
    responseReminders: { email: true, push: false },
    weeklyReports: true,
    monthlySummary: true,
    quietHours: { start: "22", end: "8" },
    weekendNotifications: false,
  });

  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    autoLogout: "30",
  });

  const [appearance, setAppearance] = useState<AppearanceSettings>({
    theme: "system",
    accentColor: "orange",
    fontSize: "md",
    compactMode: false,
    showQuickActions: true,
  });

  const [templates, setTemplates] = useState<TemplateSettings>({
    positiveReview:
      "Thank you for your wonderful {rating}-star review, {name}! We're delighted to hear about your experience at {business}.",
    negativeReview:
      "We apologize for your experience, {name}. At {business}, we strive to provide the best service possible.",
    reviewRequest: {
      subject: "Share your experience with {business}",
      body: "Dear {name},\n\nThank you for choosing {business}. We'd love to hear about your experience!\n\nClick here to leave a review: {review_link}",
    },
    followUp: {
      subject: "We'd love your feedback, {name}",
      body: "Dear {name},\n\nThank you for your recent visit to {business}. We hope you had a great experience!\n\nIf you haven't already, we'd appreciate your feedback: {review_link}",
    },
    smsRequest:
      "{business}: Thanks for visiting! We'd love your feedback. Leave a review here: {review_link}",
    smsFollowUp:
      "{business}: Hi {name}, hope you enjoyed your visit! We'd appreciate your feedback: {review_link}",
    autoPersonalization: true,
    smartSuggestions: true,
  });

  const [team, setTeam] = useState<TeamSettings>({
    members: [],
    allowResponseEditing: true,
    requireApproval: false,
    analyticsAccess: true,
  });

  const updateBusinessSettings = (settings: Partial<BusinessSettings>) => {
    setBusiness((prev) => ({ ...prev, ...settings }));
  };

  const updateNotificationSettings = (
    settings: Partial<NotificationSettings>,
  ) => {
    setNotifications((prev) => ({ ...prev, ...settings }));
  };

  const updateSecuritySettings = (settings: Partial<SecuritySettings>) => {
    setSecurity((prev) => ({ ...prev, ...settings }));
  };

  const updateAppearanceSettings = (settings: Partial<AppearanceSettings>) => {
    setAppearance((prev) => ({ ...prev, ...settings }));
  };

  const updateTemplateSettings = (settings: Partial<TemplateSettings>) => {
    setTemplates((prev) => ({ ...prev, ...settings }));
  };

  const updateTeamSettings = (settings: Partial<TeamSettings>) => {
    setTeam((prev) => ({ ...prev, ...settings }));
  };

  const inviteTeamMember = (email: string, role: TeamMember["role"]) => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      email,
      role,
      status: "pending",
    };
    setTeam((prev) => ({
      ...prev,
      members: [...prev.members, newMember],
    }));
  };

  const removeTeamMember = (id: string) => {
    setTeam((prev) => ({
      ...prev,
      members: prev.members.filter((member) => member.id !== id),
    }));
  };

  return (
    <SettingsContext.Provider
      value={{
        business,
        notifications,
        security,
        appearance,
        templates,
        team,
        updateBusinessSettings,
        updateNotificationSettings,
        updateSecuritySettings,
        updateAppearanceSettings,
        updateTemplateSettings,
        updateTeamSettings,
        inviteTeamMember,
        removeTeamMember,
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
