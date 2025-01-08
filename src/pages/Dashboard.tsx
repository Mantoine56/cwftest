import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { MyTasks } from '../components/MyTasks';
import { RoutingStats } from '../components/RoutingStats';
import { Metrics } from '../components/Metrics';
import OverdueRoutings from '../components/OverdueRoutings';

// Data
const tasks = [
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

const overdueTasks = [
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

export const Dashboard: React.FC = () => {
  return (
    <div style={{ padding: '20px 40px' }}>
      <Stack horizontal tokens={{ childrenGap: 20 }}>
        {/* Left Column - My Tasks (40%) */}
        <Stack.Item grow={4} styles={{ root: { width: '40%' } }}>
          <div className="card-animation">
            <MyTasks tasks={tasks} />
          </div>
        </Stack.Item>

        {/* Middle Column - Routings and Metrics (35%) */}
        <Stack.Item grow={3.5} styles={{ root: { width: '35%' } }}>
          <Stack tokens={{ childrenGap: 20 }}>
            <div className="card-animation">
              <RoutingStats data={routingData} />
            </div>
            <div className="card-animation">
              <Metrics data={metricsData} />
            </div>
          </Stack>
        </Stack.Item>

        {/* Right Column - Over Due Routings (25%) */}
        <Stack.Item grow={2.5} styles={{ root: { width: '25%' } }}>
          <div className="card-animation">
            <OverdueRoutings tasks={overdueTasks} />
          </div>
        </Stack.Item>
      </Stack>
    </div>
  );
}; 