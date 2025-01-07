import React from 'react';
import {
  Stack,
  Text,
  Toggle,
  CommandBar,
  ICommandBarItemProps,
  DetailsList,
  IColumn,
  SelectionMode,
  StackItem,
  IStackStyles,
  IStackTokens,
  DefaultButton,
  IconButton,
} from '@fluentui/react';

interface ITask {
  key: string;
  type: string;
  date: string;
  description: string;
  action: string;
}

const stackTokens: IStackTokens = {
  childrenGap: 20,
  padding: 20,
};

const stackStyles: IStackStyles = {
  root: {
    backgroundColor: '#fff',
    minHeight: '100vh',
  },
};

const Dashboard: React.FC = () => {
  // Command bar items
  const commandBarItems: ICommandBarItemProps[] = [
    {
      key: 'dashboard',
      text: 'Dashboard',
      iconProps: { iconName: 'ViewDashboard' },
    },
    {
      key: 'routings',
      text: 'Routings',
      iconProps: { iconName: 'Flow' },
    },
    {
      key: 'tasks',
      text: 'Tasks',
      iconProps: { iconName: 'TaskGroup' },
    },
  ];

  // Tasks list columns
  const columns: IColumn[] = [
    {
      key: 'type',
      name: 'Type',
      fieldName: 'type',
      minWidth: 100,
      maxWidth: 200,
    },
    {
      key: 'date',
      name: 'Date',
      fieldName: 'date',
      minWidth: 100,
      maxWidth: 200,
    },
    {
      key: 'description',
      name: 'Description',
      fieldName: 'description',
      minWidth: 200,
    },
    {
      key: 'action',
      name: 'Action',
      fieldName: 'action',
      minWidth: 100,
    },
  ];

  // Sample tasks data
  const tasks: ITask[] = [
    {
      key: '1',
      type: 'Requesting documentation',
      date: 'Tues, Jan 26, 2022',
      description: 'Review attached documentation',
      action: 'Upload',
    },
    // Add more sample tasks as needed
  ];

  return (
    <Stack styles={stackStyles} tokens={stackTokens}>
      {/* Header */}
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        <Text variant="xxLarge">Workflow Application</Text>
        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <IconButton iconProps={{ iconName: 'BarChart4' }} title="Analytics" />
          <IconButton iconProps={{ iconName: 'Settings' }} title="Settings" />
          <IconButton iconProps={{ iconName: 'Contact' }} title="Profile" />
        </Stack>
      </Stack>

      {/* Navigation */}
      <CommandBar items={commandBarItems} />

      {/* Main content */}
      <Stack horizontal tokens={{ childrenGap: 20 }} styles={{ root: { flexWrap: 'wrap' } }}>
        {/* Tasks section */}
        <StackItem grow={2} styles={{ root: { minWidth: '300px' } }}>
          <Stack tokens={{ childrenGap: 10 }}>
            <Text variant="xLarge">My Tasks</Text>
            <DetailsList
              items={tasks}
              columns={columns}
              selectionMode={SelectionMode.none}
              isHeaderVisible={true}
            />
          </Stack>
        </StackItem>

        {/* Charts section */}
        <StackItem grow={1} styles={{ root: { minWidth: '300px' } }}>
          <Stack tokens={{ childrenGap: 20 }}>
            {/* Routings chart */}
            <Stack>
              <Stack horizontal horizontalAlign="space-between">
                <Text variant="xLarge">Routings</Text>
                <Toggle label="Active" defaultChecked />
              </Stack>
              <div className="chart-container">
                {/* Bar chart visualization will be added here */}
              </div>
            </Stack>

            {/* Metrics chart */}
            <Stack>
              <Stack horizontal horizontalAlign="space-between">
                <Text variant="xLarge">Metrics</Text>
                <Toggle label="Active" defaultChecked />
              </Stack>
              <div className="chart-container">
                {/* Line chart visualization will be added here */}
              </div>
            </Stack>
          </Stack>
        </StackItem>

        {/* Over Due Routings */}
        <StackItem grow={1} styles={{ root: { minWidth: '300px' } }}>
          <Stack tokens={{ childrenGap: 10 }}>
            <Text variant="xLarge">Over Due Routings</Text>
            <Toggle label="My Assignments" defaultChecked />
            {/* Add overdue items list here */}
          </Stack>
        </StackItem>
      </Stack>

      {/* FAB */}
      <DefaultButton
        text="Create new routing"
        iconProps={{ iconName: 'Add' }}
        styles={{
          root: {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            borderRadius: '50%',
            width: '56px',
            height: '56px',
            backgroundColor: '#0078D4',
            color: 'white',
          },
        }}
      />
    </Stack>
  );
};

export default Dashboard;
