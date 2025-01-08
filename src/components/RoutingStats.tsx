import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { Toggle } from '@fluentui/react/lib/Toggle';

interface RoutingStatItem {
  name: string;
  value: number;
  color: string;
}

interface RoutingStatsProps {
  data: RoutingStatItem[];
}

export const RoutingStats: React.FC<RoutingStatsProps> = ({ data }) => {
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <Stack tokens={{ childrenGap: 16 }}>
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        <Text variant="xLarge">Routings</Text>
        <Toggle 
          label="Active" 
          defaultChecked 
          styles={{
            root: { margin: 0 },
            label: { margin: 0 }
          }}
        />
      </Stack>

      <Stack 
        horizontal 
        horizontalAlign="space-between" 
        styles={{ 
          root: { 
            height: 180,
            position: 'relative',
            paddingBottom: 40
          } 
        }}
      >
        {data.map((item, index) => (
          <Stack 
            key={index} 
            horizontalAlign="center" 
            verticalAlign="end"
            styles={{ 
              root: { 
                height: '100%',
                width: `${100 / data.length}%`,
                padding: '0 4px'
              } 
            }}
          >
            <div 
              style={{
                width: '100%',
                height: `${(item.value / maxValue) * 100}%`,
                backgroundColor: item.color,
                borderRadius: '2px 2px 0 0',
                marginBottom: 8,
                minHeight: 20,
                transition: 'height 0.3s ease'
              }}
            />
            <Text 
              variant="medium"
              styles={{ 
                root: { 
                  fontWeight: 600,
                  textAlign: 'center'
                } 
              }}
            >
              {item.value}
            </Text>
            <Text 
              styles={{ 
                root: { 
                  color: '#666666',
                  fontSize: 12,
                  textAlign: 'center',
                  marginTop: 4,
                  wordWrap: 'break-word'
                } 
              }}
            >
              {item.name}
            </Text>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}; 