import React from 'react';
import { Stack, IStackProps } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { Metrics } from './Metrics';

const routingData = [
  { name: 'Not Started', value: 32, color: '#0078D4' },
  { name: 'In Progress', value: 28, color: '#2D7D9A' },
  { name: 'Paused', value: 15, color: '#FDB839' },
  { name: 'Blocked', value: 18, color: '#D13438' },
  { name: 'Completed', value: 45, color: '#107C10' },
  { name: 'Cancelled', value: 12, color: '#666666' },
];

const maxValue = Math.max(...routingData.map(item => item.value));

export const RoutingsSection: React.FC = () => {
  return (
    <Stack
      styles={{
        root: {
          height: '100%',
          minWidth: 0,
          maxWidth: '100%',
          gap: '20px',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Stack
        styles={{
          root: {
            backgroundColor: 'white',
            padding: '20px',
            minWidth: 0,
            maxWidth: '100%',
            overflow: 'hidden',
            borderRadius: '4px',
            flex: '0 0 auto',
          },
        }}
        tokens={{ childrenGap: 20 }}
      >
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
        <div style={{ height: 300, position: 'relative', overflow: 'hidden' }}>
          <Stack 
            horizontal 
            verticalAlign="end"
            styles={{ 
              root: { 
                height: '100%',
                minWidth: 0,
                maxWidth: '100%',
              } 
            }}
            tokens={{ childrenGap: 8 }}
          >
            {routingData.map((item, index) => (
              <Stack.Item 
                key={index} 
                grow={1}
                styles={{ 
                  root: { 
                    minWidth: 0,
                    padding: '0 4px',
                  } 
                }}
              >
                <Stack verticalAlign="end" styles={{ root: { height: '100%' } }}>
                  <div
                    style={{
                      backgroundColor: item.color,
                      width: '100%',
                      height: `${(item.value / maxValue) * 100}%`,
                      minHeight: 20,
                      borderRadius: '4px 4px 0 0',
                    }}
                  />
                  <Stack tokens={{ childrenGap: 4 }}>
                    <Text
                      styles={{
                        root: {
                          fontSize: 12,
                          textAlign: 'center',
                          marginTop: 8,
                          wordBreak: 'break-word',
                          whiteSpace: 'normal',
                          fontWeight: 600,
                        },
                      }}
                    >
                      {item.value}
                    </Text>
                    <Text
                      styles={{
                        root: {
                          fontSize: 12,
                          textAlign: 'center',
                          wordBreak: 'break-word',
                          whiteSpace: 'normal',
                          color: '#666666',
                        },
                      }}
                    >
                      {item.name}
                    </Text>
                  </Stack>
                </Stack>
              </Stack.Item>
            ))}
          </Stack>
        </div>
      </Stack>
      <Stack.Item grow styles={{ root: { minHeight: 0 } }}>
        <Metrics />
      </Stack.Item>
    </Stack>
  );
};
