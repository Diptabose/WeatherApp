"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function WeatherTabs() {
    const pathName = usePathname();
    return (
        <Tabs value={pathName.slice(1)} className="items-center">
            <TabsList variant="line" className="gap-10">
                <TabsTrigger
                    value="today"
                    nativeButton={false}
                    render={<Link href="/today">Today</Link>}
                />
                <TabsTrigger
                    value="tomorrow"
                    nativeButton={false}
                    render={<Link href="/tomorrow">Tomorrow</Link>}
                />
                <TabsTrigger
                    value="weekly"
                    nativeButton={false}
                    render={<Link href="/weekly">Weekly (5)</Link>}
                />
            </TabsList>
        </Tabs>
    )
}