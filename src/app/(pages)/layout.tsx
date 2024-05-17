import { AuthProvider } from "@/core/auth/AuthProvider";
import Header from "@/core/layouts/pages/Header";
import Footer from "@/core/layouts/Footer";
import { getCurrentProfile, getCurrentUser } from "@/core/auth/server";
import { prisma } from "@/db";

export default async function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  const profile = await getCurrentProfile();
  const notifications = user?.id
    ? await prisma.notifications.findMany({
        where: {
          to: user.id,
        },
        orderBy: {
          created_at: "desc",
        },
      })
    : [];

  return (
    <AuthProvider
      defaultUser={user}
      defaultProfile={profile}
      notifications={notifications}
    >
      <div className="h-full w-full">
        <Header></Header>
        {children}
        <Footer></Footer>
      </div>
    </AuthProvider>
  );
}
