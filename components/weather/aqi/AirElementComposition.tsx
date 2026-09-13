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
    <div key={id} className="flex items-center gap-1 text-sm sm:text-base">
      <div className="font-bold whitespace-nowrap">
        {displayName}
        <sub>{subscript}</sub>
      </div>
      <div className="min-w-0 flex-1 truncate text-right">: {value}</div>
    </div>
  );
  return aqd;
}
