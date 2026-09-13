import { ReactNode } from "react";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Saved Locations",
  description: "Visit your saved locations",
};

const SavedLocationLayout = ({ children }: { children: ReactNode }) => {
  return <div className="p-4 md:mx-auto h-full">{children}</div>;
};

export default SavedLocationLayout;
