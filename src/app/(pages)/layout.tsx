import Header from "@/core/layouts/pages/Header";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full overflow-y-auto">
      <Header></Header>
      {children}
    </div>
  );
}
