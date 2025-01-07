import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { DetailsList, IColumn, SelectionMode } from '@fluentui/react/lib/DetailsList';
import { IconButton } from '@fluentui/react/lib/Button';

interface ITask {
  key: string;
  icon: string;
  title: string;
  date: string;
  description: string;
  action: string;
}

const tasks: ITask[] = [
  {
    key: '1',
    icon: 'Upload',
    title: 'Requesting documentation',
    date: 'Tues, Jan 26, 2022',
    description: 'Review attached documentation',
    action: 'upload',
  },
  {
    key: '2',
    icon: 'View',
    title: 'Requesting documentation',
    date: 'Tues, Jan 26, 2022',
    description: 'Review attached documentation',
    action: 'review',
  },
  {
    key: '3',
    icon: 'CheckMark',
    title: 'Requesting documentation',
    date: 'Tues, Jan 26, 2022',
    description: 'Review attached documentation',
    action: 'approve',
  },
];

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
    minWidth: 150,
    maxWidth: 150,
    onRender: (item: ITask) => (
      <Stack>
        <Text>{item.title}</Text>
        <Text variant="small" styles={{ root: { color: '#666' } }}>
          {item.date}
        </Text>
      </Stack>
    ),
  },
  {
    key: 'description',
    name: 'Description',
    minWidth: 200,
    maxWidth: 300,
    onRender: (item: ITask) => <Text>{item.description}</Text>,
  },
];

export const MyTasks: React.FC = () => {
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
      <Text variant="xLarge">My Tasks</Text>
      <Stack.Item grow styles={{ root: { minWidth: 0 } }}>
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
          layoutMode={1} // DetailsListLayoutMode.justified
          constrainMode={1} // DetailsListConstrainMode.horizontalConstrained
        />
      </Stack.Item>
    </Stack>
  );
};
