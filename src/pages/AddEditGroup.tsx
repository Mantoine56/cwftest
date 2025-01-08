import React, { useState } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { TextField } from '@fluentui/react/lib/TextField';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { PrimaryButton, DefaultButton, IconButton } from '@fluentui/react/lib/Button';
import { Text } from '@fluentui/react/lib/Text';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { Label } from '@fluentui/react/lib/Label';
import { DetailsList, SelectionMode, IColumn } from '@fluentui/react/lib/DetailsList';

// Mock data for dropdowns
const ownerOptions: IDropdownOption[] = [
  { key: 'select', text: 'Select Owner' },
  { key: 'john', text: 'John Doe' },
  { key: 'jane', text: 'Jane Smith' },
];

const statusOptions: IDropdownOption[] = [
  { key: 'active', text: 'Active' },
  { key: 'inactive', text: 'Inactive' },
];

const roleOptions: IDropdownOption[] = [
  { key: 'coordinator', text: 'Coordinator' },
  { key: 'proxy', text: 'Proxy' },
  { key: 'delegate', text: 'Delegate' },
  { key: 'member', text: 'Member' },
];

interface IMember {
  key: number;
  status: string;
  name: string;
  role: string;
  modified: string;
}

const mockMembers: IMember[] = [
  {
    key: 1,
    status: 'Active',
    name: 'Paul G.',
    role: 'Coordinator',
    modified: 'Tues, Jan 26, 2022'
  },
  {
    key: 2,
    status: 'Active',
    name: 'Mick Jagger',
    role: 'Proxy',
    modified: 'Tues, Jan 26, 2022'
  },
  {
    key: 3,
    status: 'Active',
    name: 'Keith Richards',
    role: 'Delegate',
    modified: 'Tues, Jan 26, 2022'
  },
  {
    key: 4,
    status: 'Active',
    name: 'Tom Petty',
    role: 'Member',
    modified: 'Tues, Jan 26, 2022'
  }
];

export const AddEditGroup: React.FC = () => {
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [members] = useState<IMember[]>(mockMembers);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterOptions: IDropdownOption[] = [
    { key: 'all', text: 'All' },
    { key: 'coordinator', text: 'Coordinator' },
    { key: 'proxy', text: 'Proxy' },
    { key: 'delegate', text: 'Delegate' },
    { key: 'member', text: 'Member' },
  ];

  const columns: IColumn[] = [
    {
      key: 'status',
      name: 'Status',
      minWidth: 100,
      maxWidth: 100,
      onRender: (item: IMember) => (
        <Text styles={{ root: { color: '#0078D4' } }}>{item.status}</Text>
      )
    },
    {
      key: 'name',
      name: 'Member name',
      minWidth: 200,
      maxWidth: 300,
      onRender: (item: IMember) => item.name
    },
    {
      key: 'role',
      name: 'Role',
      minWidth: 150,
      maxWidth: 200,
      onRender: (item: IMember) => item.role
    },
    {
      key: 'modified',
      name: 'Modified',
      minWidth: 150,
      maxWidth: 200,
      onRender: (item: IMember) => item.modified
    },
    {
      key: 'delete',
      name: '',
      minWidth: 50,
      maxWidth: 50,
      onRender: (item: IMember) => (
        <IconButton
          iconProps={{ iconName: 'Cancel' }}
          styles={{
            root: {
              color: '#666666',
              ':hover': { color: '#0078D4' }
            }
          }}
          onClick={() => {/* Handle delete */}}
        />
      )
    }
  ];

  return (
    <Stack 
      tokens={{ childrenGap: 20 }}
      styles={{
        root: {
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '20px 40px',
          height: '100%',
          boxSizing: 'border-box'
        }
      }}
    >
      {/* Header Section */}
      <Text variant="xLarge">Create Office</Text>

      {/* Main Form */}
      <Stack tokens={{ childrenGap: 20 }}>
        <Stack 
          styles={{ 
            root: { 
              border: '1px solid #edebe9',
              padding: '20px',
              marginTop: '10px'
            } 
          }}
          tokens={{ childrenGap: 15 }}
        >
          <TextField
            label="Office Name (editable)"
            required
            styles={{ root: { width: '100%' } }}
          />

          <Stack horizontal tokens={{ childrenGap: 20 }}>
            <Stack.Item grow={1}>
              <Dropdown
                label="Owner"
                options={ownerOptions}
                required
                styles={{ root: { width: '100%' } }}
              />
            </Stack.Item>
            <Stack.Item grow={1}>
              <Dropdown
                label="Status"
                options={statusOptions}
                defaultSelectedKey="active"
                required
                styles={{ root: { width: '100%' } }}
              />
            </Stack.Item>
            <Stack.Item grow={1}>
              <TextField
                label="Modified Date"
                value="21/06/2022"
                disabled
                styles={{ root: { width: '100%' } }}
              />
            </Stack.Item>
          </Stack>

          <TextField
            label="Description"
            multiline
            rows={4}
            placeholder="Add a short description of the request"
            styles={{ root: { width: '100%' } }}
          />

          <Stack horizontal tokens={{ childrenGap: 10 }}>
            <PrimaryButton text="Save" />
            <DefaultButton 
              text="Delete" 
              onClick={() => setShowDeleteDialog(true)}
            />
            <DefaultButton 
              text="Done"
              onClick={() => navigate('/group-management')}
            />
          </Stack>
        </Stack>

        {/* Members Section */}
        <Stack tokens={{ childrenGap: 15 }}>
          <Text variant="large">Members</Text>
          
          {/* Add Member Form and Filter Section */}
          <Stack 
            horizontal 
            tokens={{ childrenGap: 40 }} 
            styles={{ 
              root: { 
                padding: '20px',
                backgroundColor: '#f8f8f8'
              } 
            }}
          >
            {/* Add Member Form */}
            <Stack horizontal tokens={{ childrenGap: 20 }} styles={{ root: { flex: '1 1 auto' } }}>
              <Stack.Item grow={1}>
                <Dropdown
                  placeholder="Select User"
                  options={ownerOptions}
                  styles={{ root: { width: '100%' } }}
                />
              </Stack.Item>
              <Stack.Item grow={1}>
                <Dropdown
                  placeholder="Select Role"
                  options={roleOptions}
                  styles={{ root: { width: '100%' } }}
                />
              </Stack.Item>
              <PrimaryButton text="Add member" />
            </Stack>

            {/* Filter Section */}
            <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center">
              <Text>Filter:</Text>
              <Dropdown
                selectedKey={selectedFilter}
                options={filterOptions}
                styles={{ 
                  root: { width: 120 },
                  title: { borderColor: '#edebe9' }
                }}
                onChange={(_, option) => setSelectedFilter(option?.key as string)}
              />
            </Stack>
          </Stack>

          {/* Members List */}
          <DetailsList
            items={members.filter(member => 
              selectedFilter === 'all' || member.role.toLowerCase() === selectedFilter
            )}
            columns={columns}
            selectionMode={SelectionMode.none}
            styles={{
              root: {
                height: '300px',
                '.ms-DetailsRow': {
                  borderBottom: '1px solid #edebe9',
                  height: '42px',
                },
                '.ms-DetailsHeader': {
                  paddingTop: 0,
                  '.ms-DetailsHeader-cell': {
                    paddingTop: 8,
                    paddingBottom: 8,
                  }
                }
              }
            }}
          />
        </Stack>
      </Stack>

      {/* Delete Confirmation Dialog */}
      <Dialog
        hidden={!showDeleteDialog}
        onDismiss={() => setShowDeleteDialog(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Are you sure?',
          subText: 'This action cannot be undone.'
        }}
      >
        <DialogFooter>
          <PrimaryButton text="Delete" onClick={() => setShowDeleteDialog(false)} />
          <DefaultButton text="Cancel" onClick={() => setShowDeleteDialog(false)} />
        </DialogFooter>
      </Dialog>
    </Stack>
  );
}; 