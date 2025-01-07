import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Text } from '@fluentui/react/lib/Text';

export const Navigation: React.FC = () => {
  return (
    <Stack
      styles={{
        root: {
          backgroundColor: 'white',
          borderBottom: '1px solid #E1E1E1',
          padding: '0 20px',
        },
      }}
    >
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        <Text variant="xLarge" styles={{ root: { padding: '16px 0' } }}>
          Workflow Application
        </Text>
        <Stack horizontal tokens={{ childrenGap: 8 }}>
          <DefaultButton
            iconProps={{ iconName: 'ViewDashboard' }}
            text="Dashboard"
            styles={{
              root: { border: 'none' },
              icon: { color: '#0078D4' },
            }}
          />
          <DefaultButton
            iconProps={{ iconName: 'SwitcherStartEnd' }}
            text="Routings"
            styles={{
              root: { border: 'none' },
              icon: { color: '#0078D4' },
            }}
          />
          <DefaultButton
            iconProps={{ iconName: 'TaskGroup' }}
            text="Tasks"
            styles={{
              root: { border: 'none' },
              icon: { color: '#0078D4' },
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
