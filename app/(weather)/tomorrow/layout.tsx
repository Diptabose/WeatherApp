import { ReactNode } from "react";

const TomorrowLayout = ({ children }: { children: ReactNode }) => {
    return <div className="p-4 md:w-8/12 md:mx-auto">{children}</div>;
};

export default TomorrowLayout;
