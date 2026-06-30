// File: src/components/SimpleLineChart.jsx
import React from "react";

export default function SimpleLineChart({
  data = [], 
  height = 250,
  stroke = "#c97b4b",
  fill = "rgba(201,123,75,0.15)",
  yLabelPrefix = "Rp ",
}) {
  const safe = Array.isArray(data) ? data : [];
  const values = safe.map((d) => Number(d.value) || 0);

  // Menggunakan viewbox yang lebih luas dan padding lebih besar untuk label
  const width = 800; 
  const paddingLeft = 80; // Ditingkatkan agar label harga tidak terpotong
  const paddingRight = 40;
  const paddingTop = 20;
  const paddingBottom = 40;
  
  const chartW = width - paddingLeft - paddingRight;
  const chartH = height - paddingTop - paddingBottom;

  const minV = values.length ? Math.min(...values) : 0;
  const maxV = values.length ? Math.max(...values) : 0;
  const range = maxV - minV || 1;

  const xForIndex = (i) => {
    if (safe.length <= 1) return paddingLeft + chartW / 2;
    return paddingLeft + (i * chartW) / (safe.length - 1);
  };

  const yForValue = (v) => {
    const t = (Number(v) - minV) / range;
    return paddingTop + chartH - t * chartH;
  };

  const points = safe.map((d, i) => ({
    x: xForIndex(i),
    y: yForValue(d.value),
    label: d.label,
  }));

  const pathD = points.length ? `M ${points.map((p) => `${p.x},${p.y}`).join(" L ")}` : "";
  const areaD = points.length ? `${pathD} L ${points[points.length - 1].x},${paddingTop + chartH} L ${points[0].x},${paddingTop + chartH} Z` : "";

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
    v: minV + t * range,
    y: paddingTop + chartH - t * chartH,
  }));

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="font-instrument overflow-visible">
      {/* Grid Horizontal */}
      {yTicks.map((tick, idx) => (
        <g key={idx}>
          <line x1={paddingLeft} y1={tick.y} x2={width - paddingRight} y2={tick.y} stroke="#e8dfd4" strokeDasharray="4 4" />
          <text x={paddingLeft - 10} y={tick.y + 4} fill="#6b5344" fontSize="10" textAnchor="end" fontWeight="bold">
            {yLabelPrefix}{Math.round(tick.v).toLocaleString("id-ID")}
          </text>
        </g>
      ))}

      {/* Area & Garis */}
      {areaD && <path d={areaD} fill={fill} />}
      {pathD && <path d={pathD} fill="none" stroke={stroke} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" />}

      {/* Titik Data */}
      {points.map((p, idx) => (
        <g key={idx}>
          <circle cx={p.x} cy={p.y} r={6} fill="#3d2817" stroke="white" strokeWidth={2} />
        </g>
      ))}

      {/* Label X (Tanggal) */}
      {points.map((p, idx) => (
        <text key={idx} x={p.x} y={height - 5} fill="#6b5344" fontSize="10" textAnchor="middle" fontWeight="bold">
          {p.label}
        </text>
      ))}
    </svg>
  );
}