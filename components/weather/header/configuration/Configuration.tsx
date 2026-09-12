"use client";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { useTheme } from "next-themes";
import { deregisterPushSubscription } from "@/actions/subscribe-notifcation";
import { NotificationConfiguration } from "./NotificationConfiguration";

const themeItems = [
  {
    label: "Light",
    value: "light",
  },
  {
    label: "Dark",
    value: "dark",
  },
  {
    label: "System",
    value: "system",
  },
];

const allThemeItems = [
  {
    label: "Select theme",
    value: null,
  },
  ...themeItems,
];

export function Configuration() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="font-semibold">Theme</span>
        <span>
          <Select
            value={theme}
            onValueChange={(value) => {
              if (value) setTheme(value);
            }}
            items={allThemeItems}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {themeItems.map((item) => {
                return (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </span>
      </div>
      <div className="flex items-center justify-between">
        <NotificationConfiguration />
      </div>
    </div>
  );
}
