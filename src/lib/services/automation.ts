interface AutomationStep {
  id: string;
  type: "wait" | "message" | "rating" | "action" | "condition";
  config: {
    delay?: number;
    messageType?: "email" | "sms";
    content?: string;
    ratingThreshold?: number;
    action?: string;
    incentive?: string;
    urls?: {
      google?: string;
      feedback?: string;
    };
  };
}

interface AutomationFlow {
  id: string;
  name: string;
  type: "email" | "sms";
  status: "active" | "paused";
  steps: AutomationStep[];
  templates: {
    initial: string;
    highRating: string;
    lowRating: string;
  };
  metrics: {
    sent: number;
    openRate: number;
    clickRate: number;
    conversionRate: number;
  };
}

class AutomationService {
  private static instance: AutomationService;
  private automations: Map<string, AutomationFlow> = new Map();

  private constructor() {
    // Initialize with default automations
    this.automations.set("email-default", {
      id: "email-default",
      name: "Email Review Collection",
      type: "email",
      status: "active",
      steps: [
        { id: "1", type: "wait", config: { delay: 24 } },
        {
          id: "2",
          type: "message",
          config: {
            messageType: "email",
            content:
              "Hi {name}, thank you for visiting {business}! We'd love to hear your feedback. Please rate your experience:",
            urls: {
              google: "https://g.page/review/...",
              feedback: "https://feedback.koudos.io/...",
            },
          },
        },
        { id: "3", type: "rating", config: { ratingThreshold: 4 } },
        {
          id: "4",
          type: "condition",
          config: {
            ratingThreshold: 4,
            incentive: "10% off your next visit",
          },
        },
        {
          id: "5",
          type: "action",
          config: {
            action: "redirect",
            urls: {
              google: "https://g.page/review/...",
              feedback: "https://feedback.koudos.io/...",
            },
          },
        },
      ],
      templates: {
        initial:
          "Hi {name}, thank you for visiting {business}! We'd love to hear your feedback.",
        highRating:
          "Thank you for your amazing feedback! 🌟 We'd love it if you shared your experience on Google: {google_url}. As a thank-you, you'll receive {incentive}!",
        lowRating:
          "We're sorry we didn't meet your expectations. Could you share how we can improve? Reply here or fill out this feedback form: {feedback_url}.",
      },
      metrics: {
        sent: 1284,
        openRate: 68,
        clickRate: 42,
        conversionRate: 35,
      },
    });

    this.automations.set("sms-default", {
      id: "sms-default",
      name: "SMS Review Collection",
      type: "sms",
      status: "active",
      steps: [
        { id: "1", type: "wait", config: { delay: 2 } },
        {
          id: "2",
          type: "message",
          config: {
            messageType: "sms",
            content:
              "Hi {name}, thank you for visiting {business}! On a scale of 1-5, how was your experience?",
            urls: {
              google: "https://g.page/review/...",
              feedback: "https://feedback.koudos.io/...",
            },
          },
        },
        { id: "3", type: "rating", config: { ratingThreshold: 4 } },
        {
          id: "4",
          type: "condition",
          config: {
            ratingThreshold: 4,
            incentive: "10% off your next visit",
          },
        },
        {
          id: "5",
          type: "action",
          config: {
            action: "redirect",
            urls: {
              google: "https://g.page/review/...",
              feedback: "https://feedback.koudos.io/...",
            },
          },
        },
      ],
      templates: {
        initial:
          "Hi {name}, thank you for visiting {business}! On a scale of 1-5, how was your experience?",
        highRating:
          "Thank you for your amazing feedback! 🌟 Share your experience on Google: {google_url} and receive {incentive}!",
        lowRating:
          "We're sorry we didn't meet your expectations. Help us improve: {feedback_url}",
      },
      metrics: {
        sent: 856,
        openRate: 92,
        clickRate: 38,
        conversionRate: 32,
      },
    });
  }

  static getInstance(): AutomationService {
    if (!AutomationService.instance) {
      AutomationService.instance = new AutomationService();
    }
    return AutomationService.instance;
  }

  async getAutomation(id: string): Promise<AutomationFlow | null> {
    return this.automations.get(id) || null;
  }

  async getAutomationByType(
    type: "email" | "sms",
  ): Promise<AutomationFlow | null> {
    return this.automations.get(`${type}-default`) || null;
  }

  async updateAutomationStep(
    automationId: string,
    stepId: string,
    updates: Partial<AutomationStep>,
  ): Promise<void> {
    const automation = this.automations.get(automationId);
    if (!automation) return;

    automation.steps = automation.steps.map((step) =>
      step.id === stepId ? { ...step, ...updates } : step,
    );
    this.automations.set(automationId, automation);
  }

  async updateAutomationTemplates(
    automationId: string,
    templates: Partial<AutomationFlow["templates"]>,
  ): Promise<void> {
    const automation = this.automations.get(automationId);
    if (!automation) return;

    automation.templates = { ...automation.templates, ...templates };
    this.automations.set(automationId, automation);
  }

  async toggleAutomationStatus(automationId: string): Promise<void> {
    const automation = this.automations.get(automationId);
    if (!automation) return;

    automation.status = automation.status === "active" ? "paused" : "active";
    this.automations.set(automationId, automation);
  }

  async updateAutomationDelay(
    automationId: string,
    delay: number,
  ): Promise<void> {
    const automation = this.automations.get(automationId);
    if (!automation) return;

    const waitStep = automation.steps.find((step) => step.type === "wait");
    if (waitStep) {
      waitStep.config.delay = delay;
      this.automations.set(automationId, automation);
    }
  }
}

export const automationService = AutomationService.getInstance();
