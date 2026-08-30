import { ReactNode } from "react";


import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: "Today's Weather Report",
  description: 'Gets the weather report for today',
}

const TodayLayout = ({ children }: { children: ReactNode }) => {
  return <div className="p-4 md:w-8/12 md:mx-auto h-full">{children}</div>;
};

export default TodayLayout;
