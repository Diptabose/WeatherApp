import { AirElementComposition } from "./AirElementComposition";

interface AirCompositionProps {
  left: AirElementComposition[];
  right: AirElementComposition[];
}

export function AirComposition({ left, right }: AirCompositionProps) {
  return (
    <div className="rounded-2xl bg-sky-600 flex flex-col gap-3 p-4 text-white">
      <div className="flex gap-4 sm:gap-8">
        <div
          id="left-air-composition"
          className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 w-full min-w-0"
        >
          {left.map((element) => {
            return <AirElementComposition key={element.id} {...element} />;
          })}
        </div>
        <div
          id="right-air-composition"
          className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 w-full min-w-0"
        >
          {right.map((element) => {
            return <AirElementComposition key={element.id} {...element} />;
          })}
        </div>
      </div>
      <div className="text-center text-xs text-white/80 self-center">
        Values in ug/m<sup>3</sup>
      </div>
    </div>
  );
}
