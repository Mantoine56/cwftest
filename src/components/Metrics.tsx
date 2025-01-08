import React, { useState, useEffect } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { Toggle } from '@fluentui/react/lib/Toggle';

interface MetricsDataPoint {
  date: string;
  value: number;
}

interface MetricsProps {
  data?: MetricsDataPoint[];
}

const defaultData: MetricsDataPoint[] = [
  { date: '01/01', value: 15 },
  { date: '01/02', value: 45 },
  { date: '01/03', value: 25 },
  { date: '01/04', value: 65 },
  { date: '01/05', value: 35 },
  { date: '01/06', value: 55 },
  { date: '01/07', value: 45 }
];

export const Metrics: React.FC<MetricsProps> = ({ data = defaultData }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (container) {
        setDimensions({
          width: container.clientWidth,
          height: 150 // Reduced height to match mockup
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [container]);

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const padding = { top: 20, right: 20, bottom: 30, left: 30 };

  // Create points for the line
  const points = data.map((d, i) => {
    const x = (i * (dimensions.width - padding.left - padding.right) / (data.length - 1)) + padding.left;
    const y = dimensions.height - (((d.value - minValue) / (maxValue - minValue)) * (dimensions.height - padding.top - padding.bottom)) - padding.bottom;
    return `${x},${y}`;
  }).join(' ');

  return (
    <Stack>
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
      
      <div ref={setContainer} style={{ width: '100%', height: '150px', position: 'relative', marginTop: '16px' }}>
        {dimensions.width > 0 && (
          <svg width={dimensions.width} height={dimensions.height} style={{ position: 'absolute' }}>
            {/* Simple horizontal grid lines */}
            {[...Array(3)].map((_, i) => {
              const y = padding.top + (i * (dimensions.height - padding.top - padding.bottom) / 2);
              return (
                <line
                  key={i}
                  x1={padding.left}
                  y1={y}
                  x2={dimensions.width - padding.right}
                  y2={y}
                  stroke="#E1E1E1"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
              );
            })}

            {/* X-axis labels - only show first, middle and last */}
            {[0, Math.floor(data.length / 2), data.length - 1].map((i) => (
              <text
                key={i}
                x={(i * (dimensions.width - padding.left - padding.right) / (data.length - 1)) + padding.left}
                y={dimensions.height - 10}
                textAnchor="middle"
                fill="#666666"
                fontSize="12"
              >
                {data[i].date}
              </text>
            ))}

            {/* Line chart */}
            <polyline
              points={points}
              fill="none"
              stroke="#0078D4"
              strokeWidth="2"
            />

            {/* Data points */}
            {data.map((d, i) => {
              const x = (i * (dimensions.width - padding.left - padding.right) / (data.length - 1)) + padding.left;
              const y = dimensions.height - (((d.value - minValue) / (maxValue - minValue)) * (dimensions.height - padding.top - padding.bottom)) - padding.bottom;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="3"
                  fill="white"
                  stroke="#0078D4"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
        )}
      </div>
    </Stack>
  );
};
