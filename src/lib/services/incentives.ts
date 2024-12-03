import { nanoid } from "nanoid";

interface Incentive {
  id: string;
  type: "discount" | "gift_card" | "loyalty_points";
  value: number;
  code: string;
  expiryDate?: string;
  status: "active" | "sent" | "redeemed" | "expired";
  reviewId?: string;
  customerId?: string;
  createdAt: string;
  redeemedAt?: string;
  conditions?: {
    minRating?: number;
    minSpend?: number;
    maxUses?: number;
    currentUses?: number;
  };
  metadata?: {
    campaign?: string;
    source?: string;
    notes?: string;
  };
}

interface IncentiveStats {
  totalSent: number;
  totalRedeemed: number;
  totalCost: number;
  redemptionRate: number;
  averageValue: number;
  typeBreakdown: Record<string, number>;
  monthlyStats: Array<{
    month: string;
    sent: number;
    redeemed: number;
    cost: number;
  }>;
}

interface CreateIncentiveParams {
  type: Incentive["type"];
  value: number;
  expiryDate?: string;
  conditions?: Incentive["conditions"];
  metadata?: Incentive["metadata"];
}

class IncentiveService {
  private static instance: IncentiveService;
  private incentives: Map<string, Incentive> = new Map();
  private readonly CODE_LENGTH = 8;

  private constructor() {}

  static getInstance(): IncentiveService {
    if (!IncentiveService.instance) {
      IncentiveService.instance = new IncentiveService();
    }
    return IncentiveService.instance;
  }

  private generateUniqueCode(): string {
    const code = nanoid(this.CODE_LENGTH).toUpperCase();
    return `KDS-${code}`;
  }

  private validateIncentive(data: CreateIncentiveParams): boolean {
    if (data.value <= 0) return false;
    if (data.conditions?.minSpend && data.conditions.minSpend < 0) return false;
    if (data.conditions?.maxUses && data.conditions.maxUses < 1) return false;
    if (data.expiryDate && new Date(data.expiryDate) < new Date()) return false;
    return true;
  }

  async createIncentive(data: CreateIncentiveParams): Promise<Incentive> {
    if (!this.validateIncentive(data)) {
      throw new Error("Invalid incentive parameters");
    }

    const incentive: Incentive = {
      id: Date.now().toString(),
      code: this.generateUniqueCode(),
      status: "active",
      createdAt: new Date().toISOString(),
      conditions: {
        minRating: 5,
        ...data.conditions,
        currentUses: 0,
      },
      ...data,
    };

    this.incentives.set(incentive.id, incentive);
    return incentive;
  }

  async sendIncentive(
    incentiveId: string,
    customerId: string,
  ): Promise<Incentive> {
    const incentive = this.incentives.get(incentiveId);
    if (!incentive) throw new Error("Incentive not found");
    if (incentive.status !== "active")
      throw new Error("Incentive is not active");

    // Check conditions
    if (
      incentive.conditions?.maxUses &&
      incentive.conditions.currentUses >= incentive.conditions.maxUses
    ) {
      throw new Error("Incentive usage limit reached");
    }

    // Update incentive
    incentive.status = "sent";
    incentive.customerId = customerId;
    if (incentive.conditions?.currentUses !== undefined) {
      incentive.conditions.currentUses++;
    }

    this.incentives.set(incentiveId, incentive);
    return incentive;
  }

  async redeemIncentive(code: string): Promise<Incentive> {
    const incentive = Array.from(this.incentives.values()).find(
      (i) => i.code === code && i.status === "sent",
    );

    if (!incentive) throw new Error("Invalid or expired incentive code");
    if (incentive.expiryDate && new Date(incentive.expiryDate) < new Date()) {
      incentive.status = "expired";
      throw new Error("Incentive has expired");
    }

    incentive.status = "redeemed";
    incentive.redeemedAt = new Date().toISOString();
    this.incentives.set(incentive.id, incentive);
    return incentive;
  }

  async getIncentiveStats(): Promise<IncentiveStats> {
    const incentives = Array.from(this.incentives.values());
    const totalSent = incentives.filter(
      (i) => i.status === "sent" || i.status === "redeemed",
    ).length;
    const totalRedeemed = incentives.filter(
      (i) => i.status === "redeemed",
    ).length;
    const redeemedIncentives = incentives.filter(
      (i) => i.status === "redeemed",
    );
    const totalCost = redeemedIncentives.reduce((sum, i) => sum + i.value, 0);

    // Calculate type breakdown
    const typeBreakdown = incentives.reduce(
      (acc, i) => {
        acc[i.type] = (acc[i.type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Calculate monthly stats
    const monthlyStats = this.calculateMonthlyStats(incentives);

    return {
      totalSent,
      totalRedeemed,
      totalCost,
      redemptionRate: totalSent > 0 ? (totalRedeemed / totalSent) * 100 : 0,
      averageValue:
        redeemedIncentives.length > 0
          ? totalCost / redeemedIncentives.length
          : 0,
      typeBreakdown,
      monthlyStats,
    };
  }

  private calculateMonthlyStats(
    incentives: Incentive[],
  ): Array<{ month: string; sent: number; redeemed: number; cost: number }> {
    const monthlyData = new Map<
      string,
      { sent: number; redeemed: number; cost: number }
    >();

    // Get last 12 months
    const months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return date.toISOString().substring(0, 7); // YYYY-MM format
    }).reverse();

    // Initialize monthly data
    months.forEach((month) => {
      monthlyData.set(month, { sent: 0, redeemed: 0, cost: 0 });
    });

    // Populate data
    incentives.forEach((incentive) => {
      const month = incentive.createdAt.substring(0, 7);
      if (monthlyData.has(month)) {
        const data = monthlyData.get(month)!;
        if (incentive.status === "sent" || incentive.status === "redeemed") {
          data.sent++;
        }
        if (incentive.status === "redeemed") {
          data.redeemed++;
          data.cost += incentive.value;
        }
      }
    });

    return months.map((month) => ({
      month,
      ...monthlyData.get(month)!,
    }));
  }

  async getIncentives(filters?: {
    status?: Incentive["status"];
    type?: Incentive["type"];
    customerId?: string;
    campaign?: string;
    minValue?: number;
    maxValue?: number;
    dateRange?: { start: string; end: string };
  }): Promise<Incentive[]> {
    let incentives = Array.from(this.incentives.values());

    if (filters) {
      incentives = incentives.filter((i) => {
        if (filters.status && i.status !== filters.status) return false;
        if (filters.type && i.type !== filters.type) return false;
        if (filters.customerId && i.customerId !== filters.customerId)
          return false;
        if (filters.campaign && i.metadata?.campaign !== filters.campaign)
          return false;
        if (filters.minValue && i.value < filters.minValue) return false;
        if (filters.maxValue && i.value > filters.maxValue) return false;
        if (filters.dateRange) {
          const date = new Date(i.createdAt);
          const start = new Date(filters.dateRange.start);
          const end = new Date(filters.dateRange.end);
          if (date < start || date > end) return false;
        }
        return true;
      });
    }

    return incentives.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  async bulkCreateIncentives(
    params: CreateIncentiveParams,
    count: number,
  ): Promise<Incentive[]> {
    const incentives: Incentive[] = [];
    for (let i = 0; i < count; i++) {
      const incentive = await this.createIncentive(params);
      incentives.push(incentive);
    }
    return incentives;
  }

  async expireIncentive(incentiveId: string): Promise<Incentive> {
    const incentive = this.incentives.get(incentiveId);
    if (!incentive) throw new Error("Incentive not found");
    if (incentive.status === "redeemed")
      throw new Error("Cannot expire redeemed incentive");

    incentive.status = "expired";
    this.incentives.set(incentiveId, incentive);
    return incentive;
  }
}

export const incentiveService = IncentiveService.getInstance();
