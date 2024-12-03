interface Milestone {
  id: string;
  type: "rating_improvement" | "review_count" | "response_rate" | "custom";
  title: string;
  description: string;
  value: number;
  previousValue?: number;
  timeframe?: {
    start: string;
    end: string;
  };
  achieved: boolean;
  achievedAt?: string;
  icon?: string;
}

interface MilestoneProgress {
  currentValue: number;
  targetValue: number;
  percentageComplete: number;
}

class MilestoneService {
  private static instance: MilestoneService;
  private milestones: Map<string, Milestone> = new Map();

  private constructor() {}

  static getInstance(): MilestoneService {
    if (!MilestoneService.instance) {
      MilestoneService.instance = new MilestoneService();
    }
    return MilestoneService.instance;
  }

  private calculatePriority(
    rating: number,
    text: string,
  ): "high" | "medium" | "low" {
    // Basic priority calculation based on rating and sentiment
    if (rating === 1) return "high";
    if (rating === 2) return "medium";
    if (rating === 3) return "low";
    return "low";
  }

  private calculateDeadline(priority: string): string {
    const now = new Date();
    switch (priority) {
      case "high":
        now.setHours(now.getHours() + 4); // 4 hours
        break;
      case "medium":
        now.setHours(now.getHours() + 12); // 12 hours
        break;
      case "low":
        now.setHours(now.getHours() + 24); // 24 hours
        break;
      default:
        now.setHours(now.getHours() + 48); // 48 hours
        break;
    }
    return now.toISOString();
  }

  private generateMilestones(metrics: {
    averageRating: number;
    totalReviews: number;
    responseRate: number;
    previousMetrics?: {
      averageRating: number;
      totalReviews: number;
      responseRate: number;
    };
  }): Milestone[] {
    const milestones: Milestone[] = [];
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Rating Improvement Milestone
    if (
      metrics.previousMetrics &&
      metrics.averageRating > metrics.previousMetrics.averageRating
    ) {
      milestones.push({
        id: `rating-${Date.now()}`,
        type: "rating_improvement",
        title: "Rating Improvement",
        description: `Your average rating improved from ${metrics.previousMetrics.averageRating.toFixed(1)} to ${metrics.averageRating.toFixed(1)} stars!`,
        value: metrics.averageRating,
        previousValue: metrics.previousMetrics.averageRating,
        timeframe: {
          start: thirtyDaysAgo.toISOString(),
          end: now.toISOString(),
        },
        achieved: true,
        achievedAt: now.toISOString(),
      });
    }

    // Review Count Milestones
    const reviewMilestones = [100, 500, 1000, 5000];
    for (const milestone of reviewMilestones) {
      if (metrics.totalReviews >= milestone) {
        milestones.push({
          id: `reviews-${milestone}`,
          type: "review_count",
          title: "Review Milestone",
          description: `Congratulations! You have reached ${milestone} reviews!`,
          value: milestone,
          achieved: true,
          achievedAt: now.toISOString(),
        });
      }
    }

    // Response Rate Milestone
    if (metrics.responseRate >= 90) {
      milestones.push({
        id: "response-rate-90",
        type: "response_rate",
        title: "High Response Rate",
        description:
          "You have maintained a 90%+ response rate. Great job engaging with your customers!",
        value: 90,
        achieved: true,
        achievedAt: now.toISOString(),
      });
    }

    return milestones;
  }

  async updateMilestones(metrics: {
    averageRating: number;
    totalReviews: number;
    responseRate: number;
    previousMetrics?: {
      averageRating: number;
      totalReviews: number;
      responseRate: number;
    };
  }): Promise<Milestone[]> {
    const newMilestones = this.generateMilestones(metrics);

    // Store new milestones
    newMilestones.forEach((milestone) => {
      this.milestones.set(milestone.id, milestone);
    });

    return newMilestones;
  }

  async getMilestones(filters?: {
    type?: Milestone["type"];
    achieved?: boolean;
    timeframe?: { start: string; end: string };
  }): Promise<Milestone[]> {
    let milestones = Array.from(this.milestones.values());

    if (filters) {
      milestones = milestones.filter((m) => {
        if (filters.type && m.type !== filters.type) return false;
        if (filters.achieved !== undefined && m.achieved !== filters.achieved)
          return false;
        if (filters.timeframe && m.timeframe) {
          const start = new Date(filters.timeframe.start);
          const end = new Date(filters.timeframe.end);
          const achievedAt = new Date(m.achievedAt!);
          if (achievedAt < start || achievedAt > end) return false;
        }
        return true;
      });
    }

    return milestones.sort((a, b) => {
      if (!a.achievedAt || !b.achievedAt) return 0;
      return (
        new Date(b.achievedAt).getTime() - new Date(a.achievedAt).getTime()
      );
    });
  }

  async getProgress(
    milestoneId: string,
    currentValue: number,
  ): Promise<MilestoneProgress | null> {
    const milestone = this.milestones.get(milestoneId);
    if (!milestone) return null;

    return {
      currentValue,
      targetValue: milestone.value,
      percentageComplete: Math.min(100, (currentValue / milestone.value) * 100),
    };
  }
}

export const milestoneService = MilestoneService.getInstance();
