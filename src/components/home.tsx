import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "./dashboard/Sidebar";
import ReviewFeed from "./dashboard/ReviewFeed";
import AnalyticsPanel from "./dashboard/AnalyticsPanel";
import NotificationCenter from "./dashboard/NotificationCenter";
import IntegrationPanel from "./dashboard/IntegrationPanel";

const Home = () => {
  const [activeTab, setActiveTab] = React.useState("reviews");

  return (
    <div className="flex h-screen w-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar activePath="/" />

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="h-full"
          >
            <div className="border-b px-6 py-2">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
              </TabsList>
            </div>

            <div className="h-[calc(100%-53px)] overflow-hidden">
              <TabsContent value="reviews" className="h-full m-0">
                <ReviewFeed />
              </TabsContent>

              <TabsContent value="analytics" className="h-full m-0">
                <AnalyticsPanel />
              </TabsContent>

              <TabsContent value="integrations" className="h-full m-0">
                <IntegrationPanel />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Notification Panel */}
        <div className="w-[400px] border-l h-screen overflow-hidden">
          <NotificationCenter className="h-full rounded-none border-none" />
        </div>
      </div>
    </div>
  );
};

export default Home;
