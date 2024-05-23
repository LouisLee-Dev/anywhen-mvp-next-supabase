"use client";

import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/core/auth/AuthProvider";

export default function NotificationsSection() {
  const [{ notifications }] = useAuth();

  console.log(notifications);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          You can see all notifications here.
        </p>
      </div>
      <Separator />
      <div className="space-y-2 px-6">
        {notifications.map((notification) => (
          <div key={notification.id}>
            <div className="space-y-1 py-2">
              <h3 className="text-base font-medium">{notification.title}</h3>
              <p className="text-sm text-muted-foreground">
                {notification.message}
              </p>
            </div>
            <Separator />
          </div>
        ))}
      </div>
    </div>
  );
}
