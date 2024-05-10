import { AuthProvider } from "@/core/auth/AuthProvider";
import Header from "@/core/layouts/pages/Header";
import Footer from "@/core/layouts/Footer";
import { getCurrentProfile, getCurrentUser } from "@/core/auth/server";

export default async function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  const profile = await getCurrentProfile();

  return (
    <AuthProvider defaultUser={user} defaultProfile={profile}>
      <div className="h-full w-full ">
        <Header></Header>
        {children}
        <Footer></Footer>
      </div>
    </AuthProvider>
  );
}
