export interface AirElementComposition {
  id: number;
  name: string;
  value: number;
  displayName: string;
  subscript?: string;
}

interface AirElementCompositionProps extends AirElementComposition {}

export function AirElementComposition({
  displayName,
  subscript,
  value,
}: AirElementCompositionProps) {
  return (
    <>
      <div className="font-semibold whitespace-nowrap text-sm sm:text-base">
        {displayName}
        <sub>{subscript}</sub>
      </div>
      <div className="text-sm sm:text-base text-right text-white/90">
        {value}
      </div>
    </>
  );
}
