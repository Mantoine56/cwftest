import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { useNavigate, useLocation } from 'react-router-dom';
import { IContextualMenuItem } from '@fluentui/react/lib/ContextualMenu';

const navItems: ICommandBarItemProps[] = [
  {
    key: 'dashboard',
    text: 'Dashboard',
    iconProps: { iconName: 'ViewDashboard' },
    href: '/',
  },
  {
    key: 'routings',
    text: 'Routings',
    iconProps: { iconName: 'SwitcherStartEnd' },
    href: '/routings',
  },
  {
    key: 'tasks',
    text: 'Tasks',
    iconProps: { iconName: 'TaskGroup' },
    href: '/tasks',
  },
];

export const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items: ICommandBarItemProps[] = navItems.map(item => ({
    ...item,
    onClick: (_ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, _item?: IContextualMenuItem) => {
      navigate(item.href || '/');
      return true;
    },
    className: location.pathname === item.href ? 'selected-nav-item' : undefined,
  }));

  return (
    <Stack styles={{ root: { borderBottom: '1px solid #EDEBE9' } }}>
      <CommandBar
        items={items}
        styles={{
          root: {
            padding: '0 20px',
            height: 44,
            selectors: {
              '.selected-nav-item': {
                backgroundColor: '#f3f2f1',
              },
              '.ms-CommandBar-primaryCommand': {
                justifyContent: 'flex-end',
              },
            },
          },
        }}
      />
    </Stack>
  );
};
