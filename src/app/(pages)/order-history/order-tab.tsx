import { getCurrentProfile } from "@/core/auth/server";
import { prisma } from "@/db";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardSection from "@/features/order/sections/DashboardSection";

export async function OrderTab() {
  const profile = await getCurrentProfile();

  const allRequests: any[] = await prisma.requests.findMany({
    where: {
      profile_id: profile.id,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  const activeRequests: any[] = allRequests.filter(
    (request) => request.status === "booking",
  );

  const pendingRequests: any[] = allRequests.filter(
    (request) => request.status === "pending",
  );

  const acceptedRequests: any[] = allRequests.filter(
    (request) => request.status === "accepted",
  );

  const declinedRequests: any[] = allRequests.filter(
    (request) => request.status === "declined",
  );

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="all" className="w-[20%]">
          All
        </TabsTrigger>
        <TabsTrigger value="booking" className="w-[20%]">
          Active
        </TabsTrigger>
        <TabsTrigger value="pending" className="w-[20%]">
          Pending
        </TabsTrigger>
        <TabsTrigger value="accepted" className="w-[20%]">
          Booking
        </TabsTrigger>
        <TabsTrigger value="declined" className="w-[20%]">
          Declined
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <DashboardSection requests={allRequests} propertyId="null" />
      </TabsContent>
      <TabsContent value="booking">
        <DashboardSection requests={activeRequests} propertyId="null" />
      </TabsContent>
      <TabsContent value="pending">
        <DashboardSection requests={pendingRequests} propertyId="null" />
      </TabsContent>
      <TabsContent value="accepted">
        <DashboardSection requests={acceptedRequests} propertyId="null" />
      </TabsContent>
      <TabsContent value="declined">
        <DashboardSection requests={declinedRequests} propertyId="null" />
      </TabsContent>
    </Tabs>
  );
}
