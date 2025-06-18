import React, { useEffect, useState } from "react";

type Region = {
  id: string;
  name: string;
  role: string;
  color: string;
  tooltip?: string;
};

type BrainMapProps = {
  activeState: string;
};

export function BrainMap({ activeState }: BrainMapProps) {
  const [regions, setRegions] = useState<Region[]>([]);

  useEffect(() => {
    fetch("/brain-map.json")
      .then((res) => res.json())
      .then((data) => setRegions(data.regions));
  }, []);

  const getBackgroundColor = (regionColor: string): string => {
    switch (activeState) {
      case "Flow":
        return regionColor;
      case "Anxious":
        return "#7f1d1d";
      case "Sad":
        return "#374151";
      case "Shutdown":
        return "#1f2937";
      default:
        return regionColor;
    }
  };

  const getRegionScale = (regionId: string): string => {
    if (activeState === "Sad" && regionId === "dmn") {
      return "scale-110";
    }
    return "scale-100";
  };

  return (
    <div className="bg-gray-800 p-6 rounded shadow-xl">
      <h2 className="text-xl font-semibold mb-4">Neural Visualization</h2>
      <p className="text-gray-400 mb-4">Current mode: <strong>{activeState}</strong></p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {regions.map((region) => (
          <div
            key={region.id}
            className={`p-4 rounded border transition-all duration-700 ease-in-out relative group transform ${getRegionScale(region.id)}`}
            style={{
              backgroundColor: getBackgroundColor(region.color),
            }}
          >
            <h3 className="text-lg font-bold">{region.name}</h3>
            <p className="text-sm">{region.role}</p>
            {region.tooltip && (
              <div className="absolute left-0 bottom-full mb-2 w-64 p-2 bg-black text-white text-xs rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {region.tooltip}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}