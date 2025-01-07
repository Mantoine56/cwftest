import React, { useRef, useEffect, useState } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { Toggle } from '@fluentui/react/lib/Toggle';

const metricsData = [
  { date: '01/01', value: 45 },
  { date: '01/02', value: 75 },
  { date: '01/03', value: 35 },
  { date: '01/04', value: 92 },
  { date: '01/05', value: 55 },
  { date: '01/06', value: 85 },
  { date: '01/07', value: 72 },
];

export const Metrics: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const maxValue = Math.max(...metricsData.map(d => d.value));
  const minValue = Math.min(...metricsData.map(d => d.value));
  const padding = 40;

  // Create points for the line
  const points = metricsData.map((d, i) => {
    const x = (i * (dimensions.width - padding * 2) / (metricsData.length - 1)) + padding;
    const y = dimensions.height - (((d.value - minValue) / (maxValue - minValue)) * (dimensions.height - padding * 2)) - padding;
    return `${x},${y}`;
  }).join(' ');

  // Create dots for the data points
  const dots = metricsData.map((d, i) => {
    const x = (i * (dimensions.width - padding * 2) / (metricsData.length - 1)) + padding;
    const y = dimensions.height - (((d.value - minValue) / (maxValue - minValue)) * (dimensions.height - padding * 2)) - padding;
    return { x, y, value: d.value, date: d.date };
  });

  return (
    <Stack
      styles={{
        root: {
          backgroundColor: 'white',
          padding: '20px',
          minWidth: 0,
          maxWidth: '100%',
          overflow: 'hidden',
          borderRadius: '4px',
        },
      }}
      tokens={{ childrenGap: 16 }}
    >
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        <Text variant="xLarge">Metrics</Text>
        <Toggle 
          label="Active" 
          defaultChecked 
          styles={{
            root: { margin: 0 },
            label: { margin: 0 }
          }}
        />
      </Stack>
      <div ref={containerRef} className="metrics-chart" style={{ height: 200 }}>
        {dimensions.width > 0 && dimensions.height > 0 && (
          <svg width={dimensions.width} height={dimensions.height} style={{ overflow: 'visible' }}>
            {/* Y-axis */}
            <line
              x1={padding}
              y1={padding}
              x2={padding}
              y2={dimensions.height - padding}
              stroke="#E1E1E1"
              strokeWidth="1"
            />
            
            {/* X-axis */}
            <line
              x1={padding}
              y1={dimensions.height - padding}
              x2={dimensions.width - padding}
              y2={dimensions.height - padding}
              stroke="#E1E1E1"
              strokeWidth="1"
            />

            {/* Line chart */}
            <polyline
              fill="none"
              stroke="#0078D4"
              strokeWidth="2"
              points={points}
            />

            {/* Data points */}
            {dots.map((dot, i) => (
              <g key={i}>
                <circle
                  cx={dot.x}
                  cy={dot.y}
                  r="4"
                  fill="white"
                  stroke="#0078D4"
                  strokeWidth="2"
                />
                {/* Date labels */}
                <text
                  x={dot.x}
                  y={dimensions.height - padding + 20}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#666666"
                >
                  {dot.date}
                </text>
              </g>
            ))}

            {/* Y-axis labels */}
            <text
              x={padding - 10}
              y={padding}
              textAnchor="end"
              fontSize="12"
              fill="#666666"
            >
              {maxValue}
            </text>
            <text
              x={padding - 10}
              y={dimensions.height - padding}
              textAnchor="end"
              fontSize="12"
              fill="#666666"
            >
              {minValue}
            </text>
          </svg>
        )}
      </div>
    </Stack>
  );
};
