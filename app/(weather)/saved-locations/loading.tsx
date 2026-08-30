import { Skeleton } from "@/components/ui/skeleton";

const SavedLocationsLoading = () => {
    return (
        <div className="flex flex-col h-full gap-2">

            <div className="flex flex-col gap-4">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="rounded-md flex-1" />
        </div>
    );
}

export default SavedLocationsLoading;