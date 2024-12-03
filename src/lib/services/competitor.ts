interface Competitor {
  id: string;
  name: string;
  location: string;
  website?: string;
  googlePlaceId: string;
  metrics: {
    averageRating: number;
    totalReviews: number;
    responseRate: number;
    averageResponseTime: number;
  };
  trends: {
    ratings: Array<{
      date: string;
      value: number;
    }>;
    reviews: Array<{
      date: string;
      count: number;
    }>;
  };
  lastUpdated: string;
  isTracked: boolean;
}

interface CompetitorInsight {
  type: "rating" | "volume" | "response" | "sentiment";
  comparison: "better" | "worse" | "similar";
  metric: string;
  difference: number;
  recommendation?: string;
}

class CompetitorService {
  private static instance: CompetitorService;
  private competitors: Map<string, Competitor> = new Map();

  private constructor() {}

  static getInstance(): CompetitorService {
    if (!CompetitorService.instance) {
      CompetitorService.instance = new CompetitorService();
    }
    return CompetitorService.instance;
  }

  async addCompetitor(data: {
    name: string;
    location: string;
    googlePlaceId: string;
    website?: string;
  }): Promise<Competitor> {
    // Simulate API call to fetch competitor data
    const competitor: Competitor = {
      id: Date.now().toString(),
      ...data,
      metrics: {
        averageRating: 4.2 + Math.random() * 0.6,
        totalReviews: Math.floor(100 + Math.random() * 900),
        responseRate: Math.floor(60 + Math.random() * 35),
        averageResponseTime: Math.floor(12 + Math.random() * 36),
      },
      trends: {
        ratings: Array.from({ length: 6 }, (_, i) => ({
          date: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 7),
          value: 4.0 + Math.random() * 0.8,
        })).reverse(),
        reviews: Array.from({ length: 6 }, (_, i) => ({
          date: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 7),
          count: Math.floor(10 + Math.random() * 40),
        })).reverse(),
      },
      lastUpdated: new Date().toISOString(),
      isTracked: true,
    };

    this.competitors.set(competitor.id, competitor);
    return competitor;
  }

  async removeCompetitor(id: string): Promise<void> {
    this.competitors.delete(id);
  }

  async getCompetitor(id: string): Promise<Competitor | null> {
    return this.competitors.get(id) || null;
  }

  async getAllCompetitors(): Promise<Competitor[]> {
    return Array.from(this.competitors.values());
  }

  async getCompetitorInsights(businessMetrics: {
    averageRating: number;
    totalReviews: number;
    responseRate: number;
    averageResponseTime: number;
  }): Promise<CompetitorInsight[]> {
    const competitors = Array.from(this.competitors.values());
    if (competitors.length === 0) return [];

    const insights: CompetitorInsight[] = [];

    // Calculate averages
    const avgCompetitorMetrics = {
      averageRating:
        competitors.reduce((sum, c) => sum + c.metrics.averageRating, 0) /
        competitors.length,
      totalReviews:
        competitors.reduce((sum, c) => sum + c.metrics.totalReviews, 0) /
        competitors.length,
      responseRate:
        competitors.reduce((sum, c) => sum + c.metrics.responseRate, 0) /
        competitors.length,
      averageResponseTime:
        competitors.reduce((sum, c) => sum + c.metrics.averageResponseTime, 0) /
        competitors.length,
    };

    // Rating comparison
    const ratingDiff =
      businessMetrics.averageRating - avgCompetitorMetrics.averageRating;
    insights.push({
      type: "rating",
      comparison:
        ratingDiff > 0.1 ? "better" : ratingDiff < -0.1 ? "worse" : "similar",
      metric: avgCompetitorMetrics.averageRating.toFixed(1),
      difference: Math.abs(ratingDiff),
      recommendation:
        ratingDiff < -0.1
          ? "Focus on improving customer satisfaction in key areas"
          : undefined,
    });

    // Review volume comparison
    const volumeDiff =
      businessMetrics.totalReviews - avgCompetitorMetrics.totalReviews;
    insights.push({
      type: "volume",
      comparison:
        volumeDiff > 10 ? "better" : volumeDiff < -10 ? "worse" : "similar",
      metric: avgCompetitorMetrics.totalReviews.toFixed(0),
      difference: Math.abs(volumeDiff),
      recommendation:
        volumeDiff < -10
          ? "Implement a review collection strategy to increase review volume"
          : undefined,
    });

    // Response rate comparison
    const responseDiff =
      businessMetrics.responseRate - avgCompetitorMetrics.responseRate;
    insights.push({
      type: "response",
      comparison:
        responseDiff > 5 ? "better" : responseDiff < -5 ? "worse" : "similar",
      metric: `${avgCompetitorMetrics.responseRate.toFixed(0)}%`,
      difference: Math.abs(responseDiff),
      recommendation:
        responseDiff < -5
          ? "Improve response time and rate to match competitors"
          : undefined,
    });

    return insights;
  }

  async refreshCompetitorData(id: string): Promise<Competitor> {
    const competitor = this.competitors.get(id);
    if (!competitor) throw new Error("Competitor not found");

    // Simulate API call to refresh data
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update metrics with small random changes
    competitor.metrics = {
      ...competitor.metrics,
      averageRating: Math.max(
        1,
        Math.min(
          5,
          competitor.metrics.averageRating + (Math.random() - 0.5) * 0.2,
        ),
      ),
      totalReviews:
        competitor.metrics.totalReviews + Math.floor(Math.random() * 5),
    };

    competitor.lastUpdated = new Date().toISOString();
    this.competitors.set(id, competitor);

    return competitor;
  }
}

export const competitorService = CompetitorService.getInstance();
