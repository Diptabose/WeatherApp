import { AirElementComposition } from "./AirElementComposition";

interface AirCompositionProps {
  left: AirElementComposition[];
  right: AirElementComposition[];
}

export function AirComposition({ left, right }: AirCompositionProps) {
  return (
    <div className="rounded-lg py-2 bg-sky-600 flex flex-col gap-2 p-4 text-white">
      <div className="flex gap-4 sm:gap-8">
        <div id="left-air-composition" className="w-full min-w-0 flex flex-col gap-1">
          {left.map((element) => {
            return <AirElementComposition key={element.id} {...element} />;
          })}
        </div>
        <div id="right-air-composition" className="w-full min-w-0 flex flex-col gap-1">
          {right.map((element) => {
            return <AirElementComposition key={element.id} {...element} />;
          })}
        </div>
      </div>
      <div className="text-center text-sm self-center">
        Values in ug/m<sup>3</sup>
      </div>
    </div>
  );
}
