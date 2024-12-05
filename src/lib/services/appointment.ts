import { feedbackService } from "./feedback";

interface AppointmentDetails {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  date: Date;
  type: string;
  status: "completed" | "cancelled" | "no-show";
}

class AppointmentService {
  private static instance: AppointmentService;

  private constructor() {}

  static getInstance(): AppointmentService {
    if (!AppointmentService.instance) {
      AppointmentService.instance = new AppointmentService();
    }
    return AppointmentService.instance;
  }

  async handleAppointmentCompletion(
    appointment: AppointmentDetails,
  ): Promise<void> {
    // Get feedback automation settings
    const settings = await this.getFeedbackSettings();
    if (!settings.enabled) return;

    // Schedule feedback request based on delay
    setTimeout(
      async () => {
        await this.sendFeedbackRequest(appointment, settings);
      },
      settings.delay * 60 * 60 * 1000,
    ); // Convert hours to milliseconds
  }

  private async sendFeedbackRequest(
    appointment: AppointmentDetails,
    settings: {
      enabled: boolean;
      delay: number;
      channel: "email" | "sms" | "both";
    },
  ): Promise<void> {
    const { customerEmail, customerPhone, customerName } = appointment;

    // Determine which channels to use based on available contact info and settings
    if (
      (settings.channel === "email" || settings.channel === "both") &&
      customerEmail
    ) {
      await feedbackService.sendEmailRequest({
        email: customerEmail,
        name: customerName,
        appointmentId: appointment.id,
      });
    }

    if (
      (settings.channel === "sms" || settings.channel === "both") &&
      customerPhone
    ) {
      await feedbackService.sendSMSRequest({
        phone: customerPhone,
        name: customerName,
        appointmentId: appointment.id,
      });
    }
  }

  private async getFeedbackSettings() {
    // In a real implementation, this would fetch from your database
    return {
      enabled: true,
      delay: 24, // hours
      channel: "both" as const,
    };
  }
}

export const appointmentService = AppointmentService.getInstance();
