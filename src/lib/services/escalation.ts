import { nanoid } from "nanoid";

export type EscalationStatus =
  | "pending"
  | "in_progress"
  | "resolved"
  | "closed";
export type EscalationPriority = "low" | "medium" | "high" | "urgent";

interface Escalation {
  id: string;
  reviewId: string;
  customerId: string;
  rating: number;
  reviewText: string;
  status: EscalationStatus;
  priority: EscalationPriority;
  assignedTo?: string;
  deadline?: string;
  notes: Array<{
    id: string;
    text: string;
    createdAt: string;
    createdBy: string;
  }>;
  resolutionTemplate?: {
    type: "apology" | "discount" | "service_improvement";
    content: string;
  };
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

interface CreateEscalationParams {
  reviewId: string;
  customerId: string;
  rating: number;
  reviewText: string;
  priority?: EscalationPriority;
  assignedTo?: string;
  deadline?: string;
}

class EscalationService {
  private static instance: EscalationService;
  private escalations: Map<string, Escalation> = new Map();

  private constructor() {}

  static getInstance(): EscalationService {
    if (!EscalationService.instance) {
      EscalationService.instance = new EscalationService();
    }
    return EscalationService.instance;
  }

  private calculatePriority(rating: number, text: string): EscalationPriority {
    // Basic priority calculation based on rating and sentiment
    if (rating === 1) return "urgent";
    if (rating === 2) return "high";
    if (rating === 3) return "medium";
    return "low";
  }

  private calculateDeadline(priority: EscalationPriority): string {
    const now = new Date();
    switch (priority) {
      case "urgent":
        now.setHours(now.getHours() + 4); // 4 hours
        break;
      case "high":
        now.setHours(now.getHours() + 12); // 12 hours
        break;
      case "medium":
        now.setHours(now.getHours() + 24); // 24 hours
        break;
      case "low":
        now.setHours(now.getHours() + 48); // 48 hours
        break;
    }
    return now.toISOString();
  }

  async createEscalation(params: CreateEscalationParams): Promise<Escalation> {
    const priority =
      params.priority ||
      this.calculatePriority(params.rating, params.reviewText);
    const deadline = params.deadline || this.calculateDeadline(priority);

    const escalation: Escalation = {
      id: nanoid(),
      status: "pending",
      priority,
      deadline,
      notes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...params,
    };

    this.escalations.set(escalation.id, escalation);
    return escalation;
  }

  async updateEscalation(
    id: string,
    updates: Partial<Escalation>,
  ): Promise<Escalation> {
    const escalation = this.escalations.get(id);
    if (!escalation) throw new Error("Escalation not found");

    const updatedEscalation = {
      ...escalation,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    if (updates.status === "resolved" && !updatedEscalation.resolvedAt) {
      updatedEscalation.resolvedAt = new Date().toISOString();
    }

    this.escalations.set(id, updatedEscalation);
    return updatedEscalation;
  }

  async addNote(id: string, text: string, userId: string): Promise<Escalation> {
    const escalation = this.escalations.get(id);
    if (!escalation) throw new Error("Escalation not found");

    const note = {
      id: nanoid(),
      text,
      createdAt: new Date().toISOString(),
      createdBy: userId,
    };

    escalation.notes.push(note);
    escalation.updatedAt = new Date().toISOString();
    this.escalations.set(id, escalation);

    return escalation;
  }

  async assignEscalation(id: string, userId: string): Promise<Escalation> {
    const escalation = this.escalations.get(id);
    if (!escalation) throw new Error("Escalation not found");

    escalation.assignedTo = userId;
    escalation.status = "in_progress";
    escalation.updatedAt = new Date().toISOString();

    this.escalations.set(id, escalation);
    return escalation;
  }

  async resolveEscalation(
    id: string,
    resolution: {
      type: "apology" | "discount" | "service_improvement";
      content: string;
    },
  ): Promise<Escalation> {
    const escalation = this.escalations.get(id);
    if (!escalation) throw new Error("Escalation not found");

    escalation.status = "resolved";
    escalation.resolutionTemplate = resolution;
    escalation.resolvedAt = new Date().toISOString();
    escalation.updatedAt = new Date().toISOString();

    this.escalations.set(id, escalation);
    return escalation;
  }

  async getEscalation(id: string): Promise<Escalation | null> {
    return this.escalations.get(id) || null;
  }

  async getEscalations(filters?: {
    status?: EscalationStatus;
    priority?: EscalationPriority;
    assignedTo?: string;
    overdue?: boolean;
  }): Promise<Escalation[]> {
    let escalations = Array.from(this.escalations.values());

    if (filters) {
      escalations = escalations.filter((e) => {
        if (filters.status && e.status !== filters.status) return false;
        if (filters.priority && e.priority !== filters.priority) return false;
        if (filters.assignedTo && e.assignedTo !== filters.assignedTo)
          return false;
        if (filters.overdue && e.deadline && new Date(e.deadline) < new Date())
          return false;
        return true;
      });
    }

    return escalations.sort((a, b) => {
      // Sort by priority first
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
      const priorityDiff =
        priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;

      // Then by deadline
      if (a.deadline && b.deadline) {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }
      return 0;
    });
  }

  async getEscalationStats(): Promise<{
    total: number;
    byStatus: Record<EscalationStatus, number>;
    byPriority: Record<EscalationPriority, number>;
    averageResolutionTime: number;
    overdueCount: number;
  }> {
    const escalations = Array.from(this.escalations.values());
    const now = new Date();

    const byStatus = escalations.reduce(
      (acc, e) => {
        acc[e.status] = (acc[e.status] || 0) + 1;
        return acc;
      },
      {} as Record<EscalationStatus, number>,
    );

    const byPriority = escalations.reduce(
      (acc, e) => {
        acc[e.priority] = (acc[e.priority] || 0) + 1;
        return acc;
      },
      {} as Record<EscalationPriority, number>,
    );

    const resolvedEscalations = escalations.filter((e) => e.resolvedAt);
    const totalResolutionTime = resolvedEscalations.reduce((sum, e) => {
      const resolutionTime =
        new Date(e.resolvedAt!).getTime() - new Date(e.createdAt).getTime();
      return sum + resolutionTime;
    }, 0);

    const overdueCount = escalations.filter(
      (e) =>
        e.deadline && new Date(e.deadline) < now && e.status !== "resolved",
    ).length;

    return {
      total: escalations.length,
      byStatus,
      byPriority,
      averageResolutionTime:
        resolvedEscalations.length > 0
          ? totalResolutionTime / resolvedEscalations.length
          : 0,
      overdueCount,
    };
  }
}

export const escalationService = EscalationService.getInstance();
