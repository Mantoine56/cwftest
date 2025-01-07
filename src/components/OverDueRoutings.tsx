import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { IconButton } from '@fluentui/react/lib/Button';

interface IOverdueTask {
  date: string;
  title: string;
  isWarning?: boolean;
}

const overdueTasks: IOverdueTask[] = [
  {
    date: 'Tues, Jan 26, 2022',
    title: 'Requesting documentation',
  },
  {
    date: 'Tues, Jan 26, 2022',
    title: 'Requesting documentation',
  },
  {
    date: 'Tues, Jan 26, 2022',
    title: 'Requesting documentation',
    isWarning: true,
  },
];

export const OverDueRoutings: React.FC = () => {
  return (
    <Stack
      styles={{
        root: {
          backgroundColor: 'white',
          padding: '20px',
          height: '100%',
          minWidth: 0,
          maxWidth: '100%',
          overflow: 'hidden',
          borderRadius: '4px',
        },
      }}
      tokens={{ childrenGap: 16 }}
    >
      <Text variant="xLarge">Over Due Routings</Text>
      <Toggle 
        label="My Assignments" 
        defaultChecked 
        styles={{
          root: { margin: 0 },
          label: { margin: 0 }
        }}
      />
      <Stack tokens={{ childrenGap: 12 }}>
        {overdueTasks.map((task, index) => (
          <Stack
            key={index}
            horizontal
            verticalAlign="center"
            tokens={{ childrenGap: 8 }}
            styles={{
              root: {
                paddingLeft: 8,
                borderLeft: `3px solid ${task.isWarning ? '#FDB839' : '#D13438'}`,
              },
            }}
          >
            <IconButton
              iconProps={{ 
                iconName: task.isWarning ? 'Warning' : 'ErrorBadge',
                styles: { 
                  root: { 
                    color: task.isWarning ? '#FDB839' : '#D13438',
                    fontSize: 16,
                  }
                }
              }}
              styles={{ root: { padding: 0 } }}
            />
            <Stack>
              <Text>{task.date}</Text>
              <Text>{task.title}</Text>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
