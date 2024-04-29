import { AuthProvider } from "@/core/auth/AuthProvider";
import Header from "@/core/layouts/pages/Header";
import Footer from "@/core/layouts/pages/Footer";
import { getCurrentUser } from "@/core/auth/server";

export default async function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <AuthProvider defaultUser={user}>
      <div className="h-full w-full overflow-y-auto">
        <Header></Header>
        {children}
        <Footer></Footer>
      </div>
    </AuthProvider>
  );
}
