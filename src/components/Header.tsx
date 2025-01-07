import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { IconButton } from '@fluentui/react/lib/Button';

export const Header: React.FC = () => {
  return (
    <Stack
      horizontal
      horizontalAlign="space-between"
      verticalAlign="center"
      styles={{
        root: {
          backgroundColor: '#2B3B4C',
          padding: '8px 20px',
          color: 'white',
        },
      }}
    >
      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 12 }}>
        <IconButton
          iconProps={{ iconName: 'FavoriteList' }}
          styles={{
            root: { color: 'white' },
            icon: { fontSize: 20 },
          }}
        />
        <Text variant="large" styles={{ root: { color: 'white' } }}>
          Workflow application title
        </Text>
      </Stack>
      <Stack horizontal tokens={{ childrenGap: 8 }}>
        <IconButton
          iconProps={{ iconName: 'LineChart' }}
          styles={{ root: { color: 'white' } }}
        />
        <IconButton
          iconProps={{ iconName: 'Settings' }}
          styles={{ root: { color: 'white' } }}
        />
        <IconButton
          iconProps={{ iconName: 'Contact' }}
          styles={{ root: { color: 'white' }, icon: { fontSize: 16 } }}
        />
      </Stack>
    </Stack>
  );
};
