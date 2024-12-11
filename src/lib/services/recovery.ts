interface RecoveryPlan {
  reviewId: string;
  customerId: string;
  status: "pending" | "in_progress" | "completed";
  actions: Array<{
    type: "email" | "call" | "service_plan";
    status: "pending" | "completed";
    notes?: string;
    scheduledFor?: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

class RecoveryService {
  private static instance: RecoveryService;
  private recoveryPlans: Map<string, RecoveryPlan> = new Map();

  private constructor() {}

  static getInstance(): RecoveryService {
    if (!RecoveryService.instance) {
      RecoveryService.instance = new RecoveryService();
    }
    return RecoveryService.instance;
  }

  async startRecovery(
    reviewId: string,
    customerId: string,
  ): Promise<RecoveryPlan> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const plan: RecoveryPlan = {
      reviewId,
      customerId,
      status: "in_progress",
      actions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.recoveryPlans.set(reviewId, plan);
    return plan;
  }

  async getRecoveryPlan(reviewId: string): Promise<RecoveryPlan | null> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return this.recoveryPlans.get(reviewId) || null;
  }

  async updateRecoveryAction(
    reviewId: string,
    actionType: string,
    updates: Partial<RecoveryPlan["actions"][0]>,
  ): Promise<void> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const plan = this.recoveryPlans.get(reviewId);
    if (!plan) return;

    // Add new action if it doesn't exist
    const existingActionIndex = plan.actions.findIndex(
      (a) => a.type === actionType,
    );
    if (existingActionIndex === -1) {
      plan.actions.push({
        type: actionType as "email" | "call" | "service_plan",
        status: "completed",
        scheduledFor: new Date(),
        ...updates,
      });
    } else {
      plan.actions[existingActionIndex] = {
        ...plan.actions[existingActionIndex],
        ...updates,
      };
    }

    plan.updatedAt = new Date();
    this.recoveryPlans.set(reviewId, plan);
  }

  async completeRecovery(reviewId: string): Promise<void> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const plan = this.recoveryPlans.get(reviewId);
    if (!plan) return;

    plan.status = "completed";
    plan.updatedAt = new Date();
    this.recoveryPlans.set(reviewId, plan);
  }
}

export const recoveryService = RecoveryService.getInstance();
