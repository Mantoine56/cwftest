import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { DetailsList, IColumn, SelectionMode } from '@fluentui/react/lib/DetailsList';
import { IconButton } from '@fluentui/react/lib/Button';

// Types
interface ITask {
  key: string;
  icon: string;
  title: string;
  date: string;
  description: string;
}

interface MyTasksProps {
  tasks: ITask[];
}

export const MyTasks: React.FC<MyTasksProps> = ({ tasks }) => {
  // Column definition for tasks list
  const columns: IColumn[] = [
    {
      key: 'icon',
      name: '',
      minWidth: 32,
      maxWidth: 32,
      onRender: (item: ITask) => (
        <IconButton
          iconProps={{ iconName: item.icon }}
          styles={{ root: { padding: 0 } }}
        />
      ),
    },
    {
      key: 'title',
      name: 'Title',
      minWidth: 100,
      maxWidth: 200,
      onRender: (item: ITask) => <Text>{item.title}</Text>,
    },
    {
      key: 'description',
      name: 'Description',
      minWidth: 200,
      maxWidth: 300,
      onRender: (item: ITask) => <Text>{item.description}</Text>,
    },
  ];

  return (
    <Stack tokens={{ childrenGap: 16 }}>
      <Text variant="xLarge">My Tasks</Text>
      <DetailsList
        items={tasks}
        columns={columns}
        selectionMode={SelectionMode.none}
        isHeaderVisible={true}
        styles={{
          root: {
            overflowX: 'auto',
            '.ms-DetailsRow': {
              borderLeft: '3px solid transparent',
              minWidth: 0,
              ':hover': {
                borderLeftColor: '#0078D4',
                backgroundColor: '#f3f3f3',
              },
            },
            '.ms-DetailsHeader': {
              paddingTop: 0,
            },
          },
        }}
      />
    </Stack>
  );
}; 