interface CRMCredentials {
  platform: string;
  apiKey: string;
  domain?: string;
}

interface CRMConnection {
  id: string;
  platform: string;
  status: "connected" | "disconnected" | "error";
  lastSync?: string;
  error?: string;
}

class CRMService {
  private static instance: CRMService;
  private connections: Map<string, CRMConnection> = new Map();

  private constructor() {}

  static getInstance(): CRMService {
    if (!CRMService.instance) {
      CRMService.instance = new CRMService();
    }
    return CRMService.instance;
  }

  async connect(credentials: CRMCredentials): Promise<CRMConnection> {
    try {
      // Validate credentials
      if (!this.validateCredentials(credentials)) {
        throw new Error("Invalid credentials");
      }

      // Simulate API call to CRM platform
      const connection = await this.testConnection(credentials);

      // Store connection
      this.connections.set(connection.id, connection);

      return connection;
    } catch (error) {
      throw new Error(
        `Failed to connect to ${credentials.platform}: ${error.message}`,
      );
    }
  }

  private validateCredentials(credentials: CRMCredentials): boolean {
    const { platform, apiKey, domain } = credentials;

    if (!platform || !apiKey) return false;

    // Platform-specific validation
    switch (platform) {
      case "hubspot":
        return Boolean(domain && domain.includes("hubspot.com"));
      case "salesforce":
        return apiKey.length >= 32;
      case "zoho":
        return apiKey.length >= 16;
      default:
        return true;
    }
  }

  private async testConnection(
    credentials: CRMCredentials,
  ): Promise<CRMConnection> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate unique connection ID
    const id = `${credentials.platform}-${Date.now()}`;

    return {
      id,
      platform: credentials.platform,
      status: "connected",
      lastSync: new Date().toISOString(),
    };
  }

  async disconnect(connectionId: string): Promise<void> {
    const connection = this.connections.get(connectionId);
    if (!connection) {
      throw new Error("Connection not found");
    }

    // Simulate cleanup
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Update connection status
    connection.status = "disconnected";
    this.connections.set(connectionId, connection);
  }

  async getConnection(connectionId: string): Promise<CRMConnection | null> {
    return this.connections.get(connectionId) || null;
  }

  async getAllConnections(): Promise<CRMConnection[]> {
    return Array.from(this.connections.values());
  }
}

export const crmService = CRMService.getInstance();
