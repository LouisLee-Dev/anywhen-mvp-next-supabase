import { AuthProvider } from "@/core/auth/AuthProvider";
import Header from "@/core/layouts/pages/Header";
import Footer from "@/core/layouts/pages/Footer";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div className="w-full h-full overflow-y-auto">
        <Header></Header>
        {children}
        <Footer></Footer>
      </div>
    </AuthProvider>
  );
}
