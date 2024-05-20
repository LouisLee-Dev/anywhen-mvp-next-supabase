import { getMyRequests } from "@/features/renter/actions";
import DashboardSection from "@/features/renter/sections/DashboardSection";

export default async function Renters() {
  const requests: any[] = await getMyRequests();

  return (
    <div className="page-content-wrapper">
      <DashboardSection requests={requests} />
    </div>
  );
}
