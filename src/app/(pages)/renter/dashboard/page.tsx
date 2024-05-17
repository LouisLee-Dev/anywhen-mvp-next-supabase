import { getCurrentProfile } from "@/core/auth/server";
import { prisma } from "@/db";
import DashboardSection from "@/features/renter/sections/DashboardSection";

export default async function Renters() {
  return <DashboardSection />;
}
