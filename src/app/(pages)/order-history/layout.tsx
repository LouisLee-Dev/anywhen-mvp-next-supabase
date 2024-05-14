import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./components/sidebar-nav";

export const metadata: Metadata = {
  title: "Order History",
  description: "Order History.",
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="overflow-hidden md:hidden">
        <Image
          src="/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <Image
          src="/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Order-History</h2>
          <p className="text-muted-foreground">Check your order history.</p>
        </div>
        <div className="flex flex-col space-y-8 lg:space-x-12 lg:space-y-0">
          {children}
        </div>
      </div>
    </>
  );
}
