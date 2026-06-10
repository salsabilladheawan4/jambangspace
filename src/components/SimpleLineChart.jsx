import React from "react";

function clamp(num, min, max) {
  return Math.max(min, Math.min(max, num));
}

export default function SimpleLineChart({
  data = [], // [{ label, value }]
  height = 220,
  stroke = "#06B6D4",
  fill = "rgba(6,182,212,0.15)",
  yLabelPrefix = "Rp ",
}) {
  const safe = Array.isArray(data) ? data : [];
  const values = safe.map((d) => Number(d.value) || 0);

  const width = 640; // internal SVG coordinate system
  const padding = 36;
  const chartW = width - padding * 2;
  const chartH = height - padding * 2;

  const minV = values.length ? Math.min(...values) : 0;
  const maxV = values.length ? Math.max(...values) : 0;

  const range = maxV - minV || 1;

  const xForIndex = (i) => {
    if (safe.length <= 1) return padding + chartW / 2;
    return padding + (i * chartW) / (safe.length - 1);
  };

  const yForValue = (v) => {
    const t = (Number(v) - minV) / range; // 0..1
    const y = padding + (1 - t) * chartH;
    return clamp(y, padding, padding + chartH);
  };

  const points = safe.map((d, i) => {
    const x = xForIndex(i);
    const y = yForValue(d.value);
    return { x, y, label: d.label };
  });

  const pathD = points
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      return `L ${p.x} ${p.y}`;
    })
    .join(" ");

  const areaD = (() => {
    if (!points.length) return "";
    const first = points[0];
    const last = points[points.length - 1];
    return `${pathD} L ${last.x} ${padding + chartH} L ${first.x} ${padding + chartH} Z`;
  })();

  const yTicks = 4;
  const ticks = Array.from({ length: yTicks + 1 }).map((_, i) => {
    const t = i / yTicks;
    const v = minV + (1 - t) * range;
    const y = padding + t * chartH;
    return { y, v };
  });

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[${height}px]" role="img" aria-label="Grafik Penjualan">
        {/* Grid + Y labels */}
        {ticks.map((tick, idx) => (
          <g key={idx}>
            <line x1={padding} x2={width - padding} y1={tick.y} y2={tick.y} stroke="rgba(255,255,255,0.08)" />
            <text x={padding - 10} y={tick.y + 4} fill="rgba(255,255,255,0.45)" fontSize="12" textAnchor="end">
              {yLabelPrefix}
              {Math.round(tick.v).toLocaleString("id-ID")}
            </text>
          </g>
        ))}

        {/* Area */}
        {areaD ? <path d={areaD} fill={fill} /> : null}

        {/* Line */}
        {pathD ? (
          <path d={pathD} fill="none" stroke={stroke} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />
        ) : null}

        {/* Points */}
        {points.map((p, idx) => (
          <g key={idx}>
            <circle cx={p.x} cy={p.y} r={5} fill="#0EA5E9" />
            <circle cx={p.x} cy={p.y} r={10} fill="rgba(14,165,233,0.12)" />
            <title>
              {p.label} - {yLabelPrefix}
              {Number(safe[idx]?.value || 0).toLocaleString("id-ID")}
            </title>
          </g>
        ))}

        {/* X labels (sparse) */}
        {points.map((p, idx) => {
          const step = Math.ceil(points.length / 6) || 1;
          if (idx % step !== 0 && idx !== points.length - 1) return null;
          return (
            <text
              key={idx}
              x={p.x}
              y={padding + chartH + 22}
              fill="rgba(255,255,255,0.55)"
              fontSize="12"
              textAnchor="middle"
            >
              {p.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

