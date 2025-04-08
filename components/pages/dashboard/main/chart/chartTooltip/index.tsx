"use client";

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { color: string; name: string; value: number; unit: string }[];
  label?: string;
}) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded-sm bg-[#131A25] p-5 pt-4">
      <p style={{ marginBottom: 6, fontWeight: "bold" }}>{label}</p>{" "}
      {/* ✅ label과 value 사이 마진 */}
      <div className="flex flex-col gap-2">
        {payload.map(
          (
            entry: { color: string; name: string; value: number },
            index: number,
          ) => (
            <div key={index} className="flex items-center gap-2">
              <p className="min-w-20" style={{ color: entry.color }}>
                {entry.name}
              </p>
              <p>{entry.value.toLocaleString()}</p>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default CustomTooltip;
