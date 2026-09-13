import { ReactNode } from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weekly Weather Report - 5 days",
  description: "Gets the weekly 5 days of weather report",
};

const WeeklyLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="p-4 md:w-8/12 md:mx-auto h-full">{children}</div>
  );
};

export default WeeklyLayout;
