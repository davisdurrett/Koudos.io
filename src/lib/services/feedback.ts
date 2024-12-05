interface FeedbackResponse {
  businessId: string;
  rating: number;
  source: "sms" | "email";
  customerPhone?: string;
  customerEmail?: string;
}

interface FeedbackRequest {
  email?: string;
  phone?: string;
  name: string;
  appointmentId: string;
}

class FeedbackService {
  private static instance: FeedbackService;

  private constructor() {}

  static getInstance(): FeedbackService {
    if (!FeedbackService.instance) {
      FeedbackService.instance = new FeedbackService();
    }
    return FeedbackService.instance;
  }

  async sendEmailRequest(request: FeedbackRequest): Promise<void> {
    const { email, name, appointmentId } = request;
    if (!email) return;

    const template = await this.getEmailTemplate();
    const content = this.replaceVariables(template.content, {
      customer_name: name,
      business_name: "[Business Name]",
      rating_url_1: this.generateFeedbackUrl(1, appointmentId),
      rating_url_2: this.generateFeedbackUrl(2, appointmentId),
      rating_url_3: this.generateFeedbackUrl(3, appointmentId),
      rating_url_4: this.generateFeedbackUrl(4, appointmentId),
      rating_url_5: this.generateFeedbackUrl(5, appointmentId),
    });

    // Here you would integrate with your email service provider
    console.log(`Sending email to ${email}:`, {
      subject: template.subject,
      content,
    });
  }

  async sendSMSRequest(request: FeedbackRequest): Promise<void> {
    const { phone, name, appointmentId } = request;
    if (!phone) return;

    const template = await this.getSMSTemplate();
    const content = this.replaceVariables(template.content, {
      customer_name: name,
      business_name: "[Business Name]",
      rating_url_1: this.generateFeedbackUrl(1, appointmentId),
    });

    // Here you would integrate with your SMS service provider
    console.log(`Sending SMS to ${phone}:`, content);
  }

  async handleSMSResponse(
    phone: string,
    message: string,
    businessId: string,
  ): Promise<void> {
    // Parse the SMS response (expecting a number 1-5)
    const rating = parseInt(message.trim());

    if (isNaN(rating) || rating < 1 || rating > 5) {
      await this.sendSMSMessage(
        phone,
        "Please reply with a number between 1 and 5 to rate your experience.",
      );
      return;
    }

    // Process the feedback
    await this.processFeedback({
      businessId,
      rating,
      source: "sms",
      customerPhone: phone,
    });

    // Send appropriate follow-up
    if (rating === 5) {
      await this.sendSMSMessage(
        phone,
        "Thank you for your amazing feedback! Share your experience on Google and receive a special offer: {google_url}",
      );
    } else {
      await this.sendSMSMessage(
        phone,
        "Thank you for your feedback. We'd love to hear more about your experience: {feedback_url}",
      );
    }
  }

  private generateFeedbackUrl(rating: number, appointmentId: string): string {
    const baseUrl = "https://koudos.io/feedback";
    const params = new URLSearchParams({
      rating: rating.toString(),
      appointmentId,
    });
    return `${baseUrl}?${params.toString()}`;
  }

  private async getEmailTemplate() {
    // In a real implementation, this would fetch from your database
    return {
      subject: "We'd Love Your Feedback!",
      content:
        "Hi {customer_name},\n\nThank you for choosing {business_name}! Please click below to rate your experience:\n\n⭐ {rating_url_1}\n⭐⭐ {rating_url_2}\n⭐⭐⭐ {rating_url_3}\n⭐⭐⭐⭐ {rating_url_4}\n⭐⭐⭐⭐⭐ {rating_url_5}",
    };
  }

  private async getSMSTemplate() {
    // In a real implementation, this would fetch from your database
    return {
      content:
        "Hi {customer_name}, how was your experience at {business_name}? Rate us 1-5 stars: {rating_url_1}",
    };
  }

  private replaceVariables(
    template: string,
    variables: Record<string, string>,
  ): string {
    let result = template;
    Object.entries(variables).forEach(([key, value]) => {
      result = result.replace(new RegExp(`\{${key}\}`, "g"), value);
    });
    return result;
  }

  private async processFeedback(feedback: FeedbackResponse): Promise<void> {
    // Store the feedback
    await this.storeFeedback(feedback);

    // If it's a low rating (1-3), send internal alert
    if (feedback.rating <= 3) {
      await this.sendInternalAlert(feedback);
    }

    // If it's a 5-star rating, prepare incentive
    if (feedback.rating === 5) {
      await this.prepareIncentive(feedback);
    }
  }

  private async storeFeedback(feedback: FeedbackResponse): Promise<void> {
    // Here you would store the feedback in your database
    console.log("Storing feedback:", feedback);
  }

  private async sendInternalAlert(feedback: FeedbackResponse): Promise<void> {
    // Here you would send an alert to the business about the low rating
    console.log("Sending internal alert for low rating:", feedback);
  }

  private async prepareIncentive(feedback: FeedbackResponse): Promise<void> {
    // Here you would prepare the incentive for the customer
    console.log("Preparing incentive for 5-star rating:", feedback);
  }

  private async sendSMSMessage(phone: string, message: string): Promise<void> {
    // Here you would integrate with your SMS provider
    console.log(`Sending SMS to ${phone}:`, message);
  }
}

export const feedbackService = FeedbackService.getInstance();
