import { getCurrentProfile } from "@/core/auth/server";
import { prisma } from "@/db";
import NotificationsSection from "@/features/settings/sections/NotificationsSection";

export default async function SettingNotifications() {
  const profile = await getCurrentProfile();
  await prisma.notifications.updateMany({
    where: {
      to: profile.id,
      viewed: false,
    },
    data: {
      viewed: true,
    },
  });

  return <NotificationsSection />;
}
