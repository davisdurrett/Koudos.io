interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  recentActivity: Array<{
    type: string;
    date: string;
    details: string;
  }>;
}

class CRMService {
  private static instance: CRMService;
  private customers: Map<string, Customer> = new Map();

  private constructor() {
    // Initialize with some mock data
    this.customers.set("Jennifer Lee", {
      id: "cust_1",
      name: "Jennifer Lee",
      email: "jennifer@example.com",
      phone: "(555) 777-8888",
      createdAt: "2023-01-15",
      recentActivity: [
        {
          type: "appointment",
          date: new Date().toISOString(),
          details: "Regular service appointment",
        },
      ],
    });

    this.customers.set("Emma Thompson", {
      id: "cust_2",
      name: "Emma Thompson",
      email: "emma@example.com",
      phone: "(555) 123-4567",
      createdAt: "2023-03-20",
      recentActivity: [
        {
          type: "purchase",
          date: new Date().toISOString(),
          details: "Premium service package",
        },
      ],
    });

    this.customers.set("Kevin Patel", {
      id: "cust_3",
      name: "Kevin Patel",
      email: "kevin@example.com",
      phone: "(555) 678-9012",
      createdAt: "2023-06-10",
      recentActivity: [
        {
          type: "complaint",
          date: new Date().toISOString(),
          details: "Service delay issue",
        },
      ],
    });
  }

  static getInstance(): CRMService {
    if (!CRMService.instance) {
      CRMService.instance = new CRMService();
    }
    return CRMService.instance;
  }

  async searchCustomer(name: string): Promise<Customer | null> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Case-insensitive search
    const customer = this.customers.get(name);
    if (!customer) {
      // Try to find a partial match
      for (const [key, value] of this.customers.entries()) {
        if (key.toLowerCase().includes(name.toLowerCase())) {
          return value;
        }
      }
      return null;
    }
    return customer;
  }

  async updateCustomer(
    customerId: string,
    updates: Partial<Customer>,
  ): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    for (const [key, value] of this.customers.entries()) {
      if (value.id === customerId) {
        this.customers.set(key, { ...value, ...updates });
        break;
      }
    }
  }

  async addActivity(
    customerId: string,
    activity: Customer["recentActivity"][0],
  ): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    for (const [key, value] of this.customers.entries()) {
      if (value.id === customerId) {
        value.recentActivity.unshift(activity);
        this.customers.set(key, value);
        break;
      }
    }
  }
}

export const crmService = CRMService.getInstance();
