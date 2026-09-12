import { AirElementComposition } from "./AirElementComposition";

interface AirCompositionProps {
  left: AirElementComposition[];
  right: AirElementComposition[];
}

export function AirComposition({ left, right }: AirCompositionProps) {
  return (
    <div className="rounded-lg py-2 bg-sky-700 flex flex-col gap-2 p-4 text-white">
      <div className="flex gap-2">
        <div
          id="left-air-composition"
          className="w-full flex flex-col"
        >
          {left.map((element) => {
            return <AirElementComposition key={element.id} {...element} />;
          })}
        </div>
        <div
          id="right-air-composition"
          className="w-full flex flex-col"
        >
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
