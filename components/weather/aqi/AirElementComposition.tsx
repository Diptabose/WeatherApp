export interface AirElementComposition {
  id: number;
  name: string;
  value: number;
  displayName: string;
  subscript?: string;
}

interface AirElementCompositionProps extends AirElementComposition {}

export function AirElementComposition({
  id,
  displayName,
  subscript,
  value,
}: AirElementCompositionProps) {
  const aqd = (
    <div key={id} className="flex items-center">
      <div className="font-bold w-12">
        {displayName}
        <sub>{subscript}</sub>
      </div>
      <div className="mr-2">:</div>
      <div className="">{value}</div>
    </div>
  );
  return aqd;
}
