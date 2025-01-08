import React, { useState, useCallback } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { DetailsList, SelectionMode, IColumn } from '@fluentui/react/lib/DetailsList';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { IconButton, DefaultButton } from '@fluentui/react/lib/Button';
import { Text } from '@fluentui/react/lib/Text';
import { ContextualMenu } from '@fluentui/react/lib/ContextualMenu';
import { useNavigate } from 'react-router-dom';

// Status options for the dropdown
const statusOptions: IDropdownOption[] = [
  { key: 'all', text: 'All' },
  { key: 'Active', text: 'Active' },
  { key: 'Inactive', text: 'Inactive' }
];

// Generate random tracking number
const getRandomTracking = () => {
  return `OFF-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
};

// Sample data
const mockData = Array(30).fill(null).map((_, index) => ({
  key: index,
  status: String(statusOptions[Math.floor(Math.random() * (statusOptions.length - 1) + 1)].key),
  officeName: `Office ${Math.floor(Math.random() * 1000)}`,
  primaryOwner: [
    'Paul Graham',
    'Tim Cook',
    'Sarah Johnson',
    'Michael Chen',
    'Emma Wilson'
  ][Math.floor(Math.random() * 5)],
  coordinators: [
    'Bob Dylan, Tim Cook',
    'Mick Jagger, David Miller',
    'John Lennon, Paul McCartney',
    'Emma Wilson, Michael Chen',
    'Lisa Anderson, James Taylor'
  ][Math.floor(Math.random() * 5)],
  modified: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000)
    .toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
  trackingNumber: getRandomTracking()
}));

interface IOfficeItem {
  key: number;
  status: string;
  officeName: string;
  primaryOwner: string;
  coordinators: string;
  modified: string;
  trackingNumber: string;
}

export const GroupManagement: React.FC = () => {
  const navigate = useNavigate();
  const [items] = useState(mockData);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchText, setSearchText] = useState('');
  const [sortedColumn, setSortedColumn] = useState<IColumn | undefined>();
  const [isSortedDescending, setIsSortedDescending] = useState(false);
  const [filterMenuProps, setFilterMenuProps] = useState<{ column: IColumn; target: HTMLElement } | null>(null);
  const [columnFilters, setColumnFilters] = useState<Record<string, Set<string>>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const onColumnClick = useCallback(
    (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
      if (ev.ctrlKey) {
        setFilterMenuProps({ column, target: ev.target as HTMLElement });
        return;
      }

      const newIsSortedDescending = column === sortedColumn ? !isSortedDescending : false;
      setSortedColumn(column);
      setIsSortedDescending(newIsSortedDescending);
    },
    [sortedColumn, isSortedDescending]
  );

  const onFilterMenuDismiss = useCallback(() => {
    setFilterMenuProps(null);
  }, []);

  const getFilterMenuItems = useCallback((column: IColumn) => {
    const uniqueValues = new Set(
      items
        .map(item => String(item[column.key as keyof IOfficeItem]))
        .filter(Boolean)
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

  const renderColumnHeader = (props: any, columnKey: string) => (
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
      onRender: (item: IOfficeItem) => (
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
          <IconButton
            iconProps={{ 
              iconName: item.status === 'Active' ? 'CheckMark' : 'StatusCircleRing',
              styles: { 
                root: { 
                  color: item.status === 'Active' ? '#107C10' : '#666666',
                  fontSize: 16
                }
              }
            }}
            styles={{ root: { padding: 0 } }}
          />
          <Text>{item.status}</Text>
        </Stack>
      )
    },
    {
      key: 'officeName',
      name: 'Office name',
      minWidth: 150,
      maxWidth: 200,
      isSorted: sortedColumn?.key === 'officeName',
      isSortedDescending: sortedColumn?.key === 'officeName' && isSortedDescending,
      onColumnClick,
      onRenderHeader: (props) => renderColumnHeader(props, 'officeName'),
      onRender: (item: IOfficeItem) => item.officeName
    },
    {
      key: 'primaryOwner',
      name: 'Primary owner',
      minWidth: 150,
      maxWidth: 200,
      isSorted: sortedColumn?.key === 'primaryOwner',
      isSortedDescending: sortedColumn?.key === 'primaryOwner' && isSortedDescending,
      onColumnClick,
      onRenderHeader: (props) => renderColumnHeader(props, 'primaryOwner'),
      onRender: (item: IOfficeItem) => item.primaryOwner
    },
    {
      key: 'coordinators',
      name: 'Coordinators',
      minWidth: 200,
      maxWidth: 300,
      isSorted: sortedColumn?.key === 'coordinators',
      isSortedDescending: sortedColumn?.key === 'coordinators' && isSortedDescending,
      onColumnClick,
      onRenderHeader: (props) => renderColumnHeader(props, 'coordinators'),
      onRender: (item: IOfficeItem) => item.coordinators
    },
    {
      key: 'modified',
      name: 'Modified',
      minWidth: 100,
      maxWidth: 150,
      isSorted: sortedColumn?.key === 'modified',
      isSortedDescending: sortedColumn?.key === 'modified' && isSortedDescending,
      onColumnClick,
      onRenderHeader: (props) => renderColumnHeader(props, 'modified'),
      onRender: (item: IOfficeItem) => item.modified
    }
  ];

  const getSortedItems = (items: IOfficeItem[]): IOfficeItem[] => {
    if (!sortedColumn) return items;

    const key = sortedColumn.key as keyof IOfficeItem;
    return [...items].sort((a, b) => {
      const aValue = String(a[key]).toLowerCase();
      const bValue = String(b[key]).toLowerCase();
      return (isSortedDescending ? -1 : 1) * aValue.localeCompare(bValue);
    });
  };

  const getFilteredItems = (items: IOfficeItem[]): IOfficeItem[] => {
    return items.filter(item => {
      // Check if item passes all column filters
      return Object.entries(columnFilters).every(([key, values]) => {
        if (!values?.size) return true;
        return values.has(String(item[key as keyof IOfficeItem]));
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

  // Add pagination calculation
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Stack 
      styles={{
        root: {
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '20px 40px',
          height: '100%',
          boxSizing: 'border-box',
          paddingBottom: '100px',
          position: 'relative'
        }
      }}
    >
      <Stack tokens={{ childrenGap: 20 }}>
        <Text variant="xLarge">Office Manager</Text>
        <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
          <Stack horizontal tokens={{ childrenGap: 10 }}>
            <Dropdown
              placeholder="Status"
              options={statusOptions}
              selectedKey={selectedStatus}
              styles={{ root: { width: 200 } }}
              onChange={(_, option) => setSelectedStatus(option?.key as string)}
            />
          </Stack>
          <Stack horizontal tokens={{ childrenGap: 10 }}>
            <SearchBox
              placeholder="Find: Name, Owner (type ahead)"
              styles={{ root: { width: 300 } }}
              onChange={(_, newValue) => setSearchText(newValue || '')}
            />
          </Stack>
        </Stack>

        <DetailsList
          items={paginatedItems}
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
                }
              }
            },
          }}
        />

        {/* Pagination Controls */}
        <Stack 
          horizontal 
          horizontalAlign="center" 
          tokens={{ childrenGap: 10 }}
          styles={{
            root: {
              marginTop: '20px'
            }
          }}
        >
          <DefaultButton
            text="Previous"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          <Stack 
            horizontal 
            verticalAlign="center" 
            tokens={{ childrenGap: 10 }}
            styles={{
              root: {
                padding: '0 20px'
              }
            }}
          >
            <Text>Page {currentPage} of {totalPages}</Text>
          </Stack>
          <DefaultButton
            text="Next"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Stack>

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