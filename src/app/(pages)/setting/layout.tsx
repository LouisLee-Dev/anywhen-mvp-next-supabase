import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SettingLeftNavigation } from "@/features/settings/components/SettingLeftNavigation";

export const metadata: Metadata = {
  title: "Setting",
  description: "Account Profile setting.",
};

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/setting",
  },
  {
    title: "Notifications",
    href: "/setting/notifications",
  },
  {
    title: "Payment Methods",
    href: "/setting/payment",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="page-content-wrapper">
      <div className="px-[8rem] py-3">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-5 gap-4">
          <aside className="col-span-1">
            <SettingLeftNavigation items={sidebarNavItems} />
          </aside>
          <div className="col-span-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
