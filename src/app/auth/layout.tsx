import Header from "@/core/layouts/auth/Header";
import Footer from "@/core/layouts/Footer";
import { getCurrentUser } from "@/core/auth/server";
import { redirect } from "next/navigation";

export default async function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (user) {
    return redirect("/");
  }

  return (
    <div className="flex h-full w-full flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
