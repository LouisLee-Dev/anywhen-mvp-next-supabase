import { getCurrentProfile } from "@/core/auth/server";
import { prisma } from "@/db";
import DashboardSection from "@/features/renter/sections/DashboardSection";

export default async function Renters() {
  const profile = await getCurrentProfile();

  const myRequests: any[] = await prisma.requests.findMany({
    where: {
      profile_id: profile.id,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return <DashboardSection requests={myRequests} />;
}
