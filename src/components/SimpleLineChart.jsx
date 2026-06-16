import React from "react";

function clamp(num, min, max) {
  return Math.max(min, Math.min(max, num));
}

export default function SimpleLineChart({
  data = [], 
  height = 220,
  stroke = "#c97b4b",
  fill = "rgba(201,123,75,0.15)",
  yLabelPrefix = "Rp ",
}) {
  const safe = Array.isArray(data) ? data : [];
  const values = safe.map((d) => Number(d.value) || 0);

  const width = 640; 
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
    const t = (Number(v) - minV) / range;
    return padding + chartH - t * chartH;
  };

  const points = safe.map((d, i) => ({
    x: xForIndex(i),
    y: yForValue(d.value),
    label: d.label,
  }));

  const pathD = points.length
    ? `M ${points.map((p) => `${p.x},${p.y}`).join(" L ")}`
    : "";

  const areaD = points.length
    ? `${pathD} L ${points[points.length - 1].x},${padding + chartH} L ${
        points[0].x
      },${padding + chartH} Z`
    : "";

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
    v: minV + t * range,
    y: padding + chartH - t * chartH,
  }));

  return (
    <svg width="100%" height={height} viewBox={"0 0 " + width + " " + height} preserveAspectRatio="none" className="font-instrument">
      {/* Skala Y */}
      {yTicks.map((tick, idx) => (
        <g key={idx}>
          <line x1={padding} y1={tick.y} x2={width - padding} y2={tick.y} stroke="#e8dfd4" strokeDasharray="4 4" />
          <text x={padding - 10} y={tick.y + 4} fill="#6b5344" fontSize="12" textAnchor="end">
            {yLabelPrefix}
            {Math.round(tick.v).toLocaleString("id-ID")}
          </text>
        </g>
      ))}

      {/* Area Bawah Grafik */}
      {areaD ? <path d={areaD} fill={fill} /> : null}

      {/* Garis Grafik */}
      {pathD ? (
        <path d={pathD} fill="none" stroke={stroke} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />
      ) : null}

      {/* Titik-titik Data */}
      {points.map((p, idx) => (
        <g key={idx}>
          <circle cx={p.x} cy={p.y} r={5} fill="#3d2817" />
          <circle cx={p.x} cy={p.y} r={10} fill={fill} />
          <title>
            {p.label} - {yLabelPrefix}
            {Number(safe[idx]?.value || 0).toLocaleString("id-ID")}
          </title>
        </g>
      ))}

      {/* Label X */}
      {points.map((p, idx) => {
        const step = Math.ceil(points.length / 6);
        if (idx % step !== 0 && idx !== points.length - 1) return null;
        return (
          <text key={idx} x={p.x} y={height - 10} fill="#6b5344" fontSize="11" textAnchor="middle">
            {p.label}
          </text>
        );
      })}
    </svg>
  );
}