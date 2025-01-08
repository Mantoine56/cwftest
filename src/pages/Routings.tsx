import React, { useState, useCallback } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { DetailsList, SelectionMode, IColumn, IDetailsColumnProps } from '@fluentui/react/lib/DetailsList';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { DefaultButton, PrimaryButton, IconButton } from '@fluentui/react/lib/Button';
import { Text } from '@fluentui/react/lib/Text';
import { ContextualMenu } from '@fluentui/react/lib/ContextualMenu';
import { useNavigate } from 'react-router-dom';

// Status options for the dropdown
const statusOptions: IDropdownOption[] = [
  { key: 'all', text: 'All' },
  { key: 'New', text: 'New' },
  { key: 'In Progress', text: 'In Progress' },
  { key: 'Complete', text: 'Complete' },
  { key: 'On Hold', text: 'On Hold' }
];

// Generate random date within the last 30 days
const getRandomDate = () => {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 30);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
};

// Generate random tracking number
const getRandomTracking = () => {
  return `TRK-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
};

// Sample data
const mockData = Array(30).fill(null).map((_, index) => ({
  key: index,
  status: String(statusOptions[Math.floor(Math.random() * (statusOptions.length - 1) + 1)].key),
  dueDate: getRandomDate(),
  title: `Routing Request ${Math.floor(Math.random() * 1000)}`,
  currentStep: [
    'Documentation Review',
    'Approval Pending',
    'Quality Check',
    'Final Review',
    'Client Feedback'
  ][Math.floor(Math.random() * 5)],
  createdBy: [
    'Bob Dylan',
    'John Lennon',
    'Paul McCartney',
    'George Harrison',
    'Ringo Starr'
  ][Math.floor(Math.random() * 5)],
  trackingNumber: getRandomTracking()
})) as IRoutingItem[];

interface IRoutingItem {
  key: number;
  status: string;
  dueDate: string;
  title: string;
  currentStep: string;
  createdBy: string;
  trackingNumber: string;
}

export const Routings: React.FC = () => {
  const [items] = useState(mockData);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchText, setSearchText] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [sortedColumn, setSortedColumn] = useState<IColumn | undefined>();
  const [isSortedDescending, setIsSortedDescending] = useState(false);
  const [filterMenuProps, setFilterMenuProps] = useState<{ column: IColumn; target: HTMLElement } | null>(null);
  const [columnFilters, setColumnFilters] = useState<Record<string, Set<string>>>({});
  const navigate = useNavigate();

  const onColumnClick = useCallback(
    (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
      if (ev.ctrlKey) {
        // Show filter menu on Ctrl+Click
        setFilterMenuProps({ column, target: ev.target as HTMLElement });
        return;
      }

      const newIsSortedDescending = column === sortedColumn ? !isSortedDescending : false;
      setIsSortedDescending(newIsSortedDescending);
      setSortedColumn(column);
    },
    [sortedColumn, isSortedDescending]
  );

  const onFilterMenuDismiss = useCallback(() => {
    setFilterMenuProps(null);
  }, []);

  const getFilterMenuItems = useCallback((column: IColumn) => {
    // Get unique values for the column
    const uniqueValues = new Set(
      items
        .map(item => String(item[column.key as keyof IRoutingItem]))
        .filter(Boolean) // Remove any undefined/null values
    );
    
    const sortedValues = Array.from(uniqueValues).sort((a, b) => a.localeCompare(b));
    
    return [
      {
        key: 'selectAll',
        text: 'Select All',
        canCheck: true,
        isChecked: !columnFilters[column.key]?.size,
        onClick: () => {
          setColumnFilters(prev => ({
            ...prev,
            [column.key]: new Set()
          }));
        }
      },
      ...sortedValues.map(value => ({
        key: value,
        text: value,
        canCheck: true,
        isChecked: !columnFilters[column.key]?.size || columnFilters[column.key]?.has(value),
        onClick: () => {
          const filters = new Set(columnFilters[column.key] || []);
          if (filters.has(value)) {
            filters.delete(value);
          } else {
            filters.add(value);
          }
          setColumnFilters(prev => ({
            ...prev,
            [column.key]: filters
          }));
        }
      }))
    ];
  }, [items, columnFilters]);

  const renderColumnHeader = (props: IDetailsColumnProps | undefined, columnKey: string) => (
    <Stack 
      horizontal 
      verticalAlign="center" 
      horizontalAlign="space-between" 
      styles={{ 
        root: { 
          width: '100%',
          padding: '0 8px',
          display: 'flex',
          alignItems: 'center'
        } 
      }}
    >
      <Text styles={{ root: { fontWeight: 600 } }}>{props?.column?.name}</Text>
      <IconButton
        iconProps={{ 
          iconName: columnFilters[columnKey]?.size ? 'FilterSolid' : 'Filter',
          styles: { root: { fontSize: 12 } }
        }}
        onClick={(ev) => {
          ev.stopPropagation();
          if (props?.column) {
            setFilterMenuProps({ 
              column: props.column, 
              target: ev.currentTarget as HTMLElement 
            });
          }
        }}
        styles={{
          root: {
            height: 22,
            width: 22,
            ':hover': { backgroundColor: 'transparent' }
          }
        }}
      />
    </Stack>
  );

  const columns: IColumn[] = [
    {
      key: 'status',
      name: 'Status',
      minWidth: 100,
      maxWidth: 100,
      isSorted: sortedColumn?.key === 'status',
      isSortedDescending: sortedColumn?.key === 'status' && isSortedDescending,
      onColumnClick,
      onRenderHeader: (props) => renderColumnHeader(props, 'status'),
      onRender: (item) => (
        <Text>{statusOptions.find(option => option.key === item.status)?.text || item.status}</Text>
      )
    },
    {
      key: 'dueDate',
      name: 'Due Date',
      minWidth: 100,
      maxWidth: 100,
      isSorted: sortedColumn?.key === 'dueDate',
      isSortedDescending: sortedColumn?.key === 'dueDate' && isSortedDescending,
      onColumnClick,
      onRenderHeader: (props) => renderColumnHeader(props, 'dueDate'),
      onRender: (item) => item.dueDate
    },
    {
      key: 'title',
      name: 'Title',
      minWidth: 200,
      maxWidth: 300,
      isSorted: sortedColumn?.key === 'title',
      isSortedDescending: sortedColumn?.key === 'title' && isSortedDescending,
      onColumnClick,
      onRenderHeader: (props) => renderColumnHeader(props, 'title'),
      onRender: (item) => item.title
    },
    {
      key: 'currentStep',
      name: 'Current step',
      minWidth: 150,
      maxWidth: 200,
      isSorted: sortedColumn?.key === 'currentStep',
      isSortedDescending: sortedColumn?.key === 'currentStep' && isSortedDescending,
      onColumnClick,
      onRenderHeader: (props) => renderColumnHeader(props, 'currentStep'),
      onRender: (item) => item.currentStep
    },
    {
      key: 'createdBy',
      name: 'Created by',
      minWidth: 150,
      maxWidth: 200,
      isSorted: sortedColumn?.key === 'createdBy',
      isSortedDescending: sortedColumn?.key === 'createdBy' && isSortedDescending,
      onColumnClick,
      onRenderHeader: (props) => renderColumnHeader(props, 'createdBy'),
      onRender: (item) => item.createdBy
    },
    {
      key: 'trackingNumber',
      name: 'Tracking #',
      minWidth: 100,
      maxWidth: 100,
      isSorted: sortedColumn?.key === 'trackingNumber',
      isSortedDescending: sortedColumn?.key === 'trackingNumber' && isSortedDescending,
      onColumnClick,
      onRenderHeader: (props) => renderColumnHeader(props, 'trackingNumber'),
      onRender: (item) => item.trackingNumber
    }
  ];

  const getSortedItems = (items: IRoutingItem[]): IRoutingItem[] => {
    if (!sortedColumn) return items;

    const key = sortedColumn.key as keyof IRoutingItem;
    return [...items].sort((a, b) => {
      const aValue = String(a[key]);
      const bValue = String(b[key]);
      return (isSortedDescending ? -1 : 1) * aValue.localeCompare(bValue);
    });
  };

  const getFilteredItems = (items: IRoutingItem[]): IRoutingItem[] => {
    return items.filter(item => {
      // Check if item passes all column filters
      return Object.entries(columnFilters).every(([key, values]) => {
        if (!values?.size) return true;
        return values.has(String(item[key as keyof IRoutingItem]));
      });
    });
  };

  const filteredItems = getSortedItems(
    getFilteredItems(
      items.filter(item => {
        const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
        const matchesSearch = !searchText || 
          Object.values(item).some(value => 
            String(value).toLowerCase().includes(searchText.toLowerCase())
          );
        return matchesStatus && matchesSearch;
      })
    )
  );

  return (
    <Stack 
      styles={{
        root: {
          maxWidth: '1400px', // Set a max-width for larger screens
          margin: '0 auto',   // Center the content
          padding: '20px 40px', // Add consistent padding
          height: '100%',
          boxSizing: 'border-box'
        }
      }}
    >
      <Stack tokens={{ childrenGap: 20 }}>
        <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
          <Stack horizontal tokens={{ childrenGap: 10 }}>
            <Dropdown
              placeholder="Status"
              options={statusOptions}
              selectedKey={selectedStatus}
              styles={{ root: { width: 200 } }}
              onChange={(_, option) => setSelectedStatus(option?.key as string)}
            />
            <DefaultButton
              iconProps={{ iconName: 'Filter' }}
              text="Filter"
              onClick={() => setIsFilterVisible(!isFilterVisible)}
            />
          </Stack>
          <Stack horizontal tokens={{ childrenGap: 10 }}>
            <SearchBox
              placeholder="Find: Tracking, Title..."
              styles={{ root: { width: 300 } }}
              onChange={(_, newValue) => setSearchText(newValue || '')}
            />
            <PrimaryButton
              iconProps={{ iconName: 'Add' }}
              text="New"
              onClick={() => navigate('/routings/create')}
            />
          </Stack>
        </Stack>

        <DetailsList
          items={filteredItems}
          columns={columns}
          selectionMode={SelectionMode.none}
          isHeaderVisible={true}
          styles={{
            root: {
              '.ms-DetailsRow': {
                borderBottom: '1px solid #edebe9',
              },
              '.ms-DetailsHeader': {
                paddingTop: 0,
                '.ms-DetailsHeader-cell': {
                  paddingTop: 8,
                  paddingBottom: 8,
                },
                '.ms-DetailsHeader-cellName': {
                  fontWeight: 600,
                  fontSize: '14px',
                  color: '#323130'
                },
                '.ms-DetailsHeader-cellTitle': {
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }
              }
            },
          }}
        />

        {filterMenuProps && (
          <ContextualMenu
            items={getFilterMenuItems(filterMenuProps.column)}
            target={filterMenuProps.target}
            onDismiss={onFilterMenuDismiss}
            title={`Filter by ${filterMenuProps.column.name}`}
          />
        )}
      </Stack>
    </Stack>
  );
};
