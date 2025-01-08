import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { DetailsList, IColumn, SelectionMode } from '@fluentui/react/lib/DetailsList';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { IconButton } from '@fluentui/react/lib/Button';
import { Metrics } from '../components/Metrics';
import { RoutingStats } from '../components/RoutingStats';

// Types
interface ITask {
  key: string;
  icon: string;
  title: string;
  date: string;
  description: string;
}

interface IOverdueTask {
  date: string;
  title: string;
  isWarning?: boolean;
}

// Data
const tasks: ITask[] = [
  {
    key: '1',
    icon: 'Upload',
    title: 'Requesting documentation',
    date: 'Tues, Jan 26, 2022',
    description: 'Review attached documentation',
  },
  {
    key: '2',
    icon: 'View',
    title: 'Requesting documentation',
    date: 'Tues, Jan 26, 2022',
    description: 'Review attached documentation',
  },
  {
    key: '3',
    icon: 'CheckMark',
    title: 'Requesting documentation',
    date: 'Tues, Jan 26, 2022',
    description: 'Review attached documentation',
  },
];

const routingData = [
  { name: 'Not Started', value: 32, color: '#0078D4' },
  { name: 'In Progress', value: 28, color: '#2D7D9A' },
  { name: 'Paused', value: 15, color: '#FDB839' },
  { name: 'Blocked', value: 18, color: '#D13438' },
  { name: 'Completed', value: 45, color: '#107C10' },
  { name: 'Cancelled', value: 12, color: '#666666' }
];

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

const metricsData = [
  { date: '01/01', value: 15 },
  { date: '01/02', value: 45 },
  { date: '01/03', value: 25 },
  { date: '01/04', value: 65 },
  { date: '01/05', value: 35 },
  { date: '01/06', value: 55 },
  { date: '01/07', value: 45 }
];

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

export const Dashboard: React.FC = () => {
  return (
    <Stack 
      horizontal 
      tokens={{ childrenGap: 20 }} 
      styles={{
        root: {
          padding: '20px 40px',
          maxWidth: '1400px',
          margin: '0 auto',
          height: '100%',
          boxSizing: 'border-box'
        }
      }}
    >
      {/* My Tasks - Increased to 45% */}
      <Stack.Item grow={4.5} styles={{ root: { width: '35%' } }}>
        <div className="card-animation">
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
        </div>
      </Stack.Item>

      {/* Routings - Decreased to 25% */}
      <Stack.Item grow={2.5} styles={{ root: { width: '35%' } }}>
        <div className="card-animation">
          <Stack tokens={{ childrenGap: 16 }}>
            <RoutingStats data={routingData} />
            <Metrics data={metricsData} />
          </Stack>
        </div>
      </Stack.Item>

      {/* Over Due Routings - Remains at 30% */}
      <Stack.Item grow={3} styles={{ root: { width: '30%' } }}>
        <div className="card-animation">
          <Stack tokens={{ childrenGap: 16 }}>
            <Text variant="xLarge">Over Due Routings</Text>
            <Toggle 
              label="My Assignments" 
              defaultChecked 
              styles={{
                root: { margin: 0 },
                label: { margin: 0 }
              }}
            />
            <Stack tokens={{ childrenGap: 6 }}>
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
        </div>
      </Stack.Item>
    </Stack>
  );
}; 