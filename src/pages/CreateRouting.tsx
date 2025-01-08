import React, { useState } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { TextField } from '@fluentui/react/lib/TextField';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { DatePicker } from '@fluentui/react/lib/DatePicker';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { Text } from '@fluentui/react/lib/Text';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { Label } from '@fluentui/react/lib/Label';
import { IconButton } from '@fluentui/react/lib/Button';

// Mock data for dropdowns
const ownerOptions: IDropdownOption[] = [
  { key: 'select', text: 'Select Owner' },
  { key: 'john', text: 'John Doe' },
  { key: 'jane', text: 'Jane Smith' },
];

const statusOptions: IDropdownOption[] = [
  { key: 'not_started', text: 'Not started' },
  { key: 'in_progress', text: 'In Progress' },
  { key: 'completed', text: 'Completed' },
];

const templateOptions: IDropdownOption[] = [
  { key: 'select', text: 'Select Template' },
  { key: 'template1', text: 'Template 1' },
  { key: 'template2', text: 'Template 2' },
];

const actionOptions: IDropdownOption[] = [
  { key: 'upload', text: 'Upload file' },
  { key: 'review', text: 'Review' },
  { key: 'approve', text: 'Approve' },
];

const userGroupOptions: IDropdownOption[] = [
  { key: 'select', text: 'Select user/group' },
  { key: 'group1', text: 'Group 1' },
  { key: 'group2', text: 'Group 2' },
];

export const CreateRouting: React.FC = () => {
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const stackTokens = { childrenGap: 15 };
  const dropdownStyles = { dropdown: { width: 300 } };
  const datePickerStyles = { root: { width: 300 } };
  const textFieldStyles = { root: { width: '100%' } };
  const uploadFieldStyles = {
    root: {
      border: '1px solid #edebe9',
      padding: '8px',
      backgroundColor: '#f8f8f8',
      cursor: 'not-allowed'
    }
  };

  return (
    <Stack 
      tokens={{ childrenGap: 20, padding: 20 }}
      styles={{
        root: {
          maxWidth: '1400px',
          margin: '0 auto',
          backgroundColor: 'white',
          padding: '20px 40px',
          height: '100%',
          boxSizing: 'border-box'
        }
      }}
    >
      {/* Header Section */}
      <Text variant="xLarge">Create Routing</Text>

      {/* Main Form */}
      <Stack tokens={{ childrenGap: 20 }}>
        {/* Documentation Request Section - Full Width */}
        <Stack styles={{ root: { width: '100%' } }}>
          <Text variant="large">Requesting documentation</Text>
          <Stack 
            styles={{ 
              root: { 
                border: '1px solid #edebe9',
                padding: '20px',
                marginTop: '10px',
                width: '100%',
                minHeight: '300px'
              } 
            }}
            tokens={{ childrenGap: 15 }}
          >
            <Stack horizontal tokens={{ childrenGap: 20 }}>
              <Stack.Item grow={1}>
                <Dropdown
                  label="Owner"
                  options={ownerOptions}
                  required
                  styles={dropdownStyles}
                />
              </Stack.Item>
              <Stack.Item grow={1}>
                <Dropdown
                  label="Status"
                  options={statusOptions}
                  defaultSelectedKey="not_started"
                  required
                  styles={dropdownStyles}
                />
              </Stack.Item>
              <Stack.Item grow={1}>
                <DatePicker
                  label="Due Date"
                  isRequired={true}
                  styles={datePickerStyles}
                />
              </Stack.Item>
            </Stack>

            <TextField
              label="Instructions"
              multiline
              rows={4}
              styles={textFieldStyles}
            />

            <Dropdown
              label="Template"
              options={templateOptions}
              styles={dropdownStyles}
            />

            <Stack horizontal tokens={{ childrenGap: 10 }}>
              <PrimaryButton text="Save" />
              <DefaultButton 
                text="Delete" 
                onClick={() => setShowDeleteDialog(true)}
              />
            </Stack>
          </Stack>
        </Stack>

        {/* Two Column Layout for Tasks and Files */}
        <Stack horizontal tokens={{ childrenGap: 20 }} styles={{ root: { width: '100%' } }}>
          {/* Tasks Section - Left Column */}
          <Stack.Item grow={1} styles={{ root: { width: '50%' } }}>
            <Text variant="large">Tasks</Text>
            <Stack 
              styles={{ 
                root: { 
                  border: '1px solid #edebe9',
                  padding: '20px',
                  marginTop: '10px',
                  height: '100%',
                  minHeight: '500px'
                } 
              }}
              tokens={{ childrenGap: 15 }}
            >
              <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
                <Text>Step:</Text>
                <Text>1</Text>
              </Stack>

              {/* Upload document field */}
              <Stack>
                <Stack 
                  horizontal 
                  verticalAlign="center" 
                  styles={uploadFieldStyles}
                  tokens={{ childrenGap: 10 }}
                >
                  <Text>Upload the document</Text>
                  <IconButton
                    iconProps={{ iconName: 'Upload' }}
                    title="Upload"
                    disabled
                  />
                </Stack>
              </Stack>

              {/* Instructions */}
              <Stack>
                <Label>Instructions</Label>
                <TextField
                  multiline
                  rows={4}
                  placeholder="Add a short description of the request"
                  styles={{ root: { width: '100%' } }}
                />
              </Stack>

              {/* Action and Assigned in one row */}
              <Stack horizontal tokens={{ childrenGap: 20 }}>
                <Stack.Item grow={1}>
                  <Dropdown
                    label="Action"
                    placeholder="Upload file"
                    options={actionOptions}
                    styles={{ root: { width: '100%' } }}
                  />
                </Stack.Item>
                <Stack.Item grow={1}>
                  <Dropdown
                    label="Assigned"
                    placeholder="Select user/group"
                    options={userGroupOptions}
                    styles={{ root: { width: '100%' } }}
                  />
                </Stack.Item>
              </Stack>

              {/* Status and Due Date in one row */}
              <Stack horizontal tokens={{ childrenGap: 20 }}>
                <Stack.Item grow={1}>
                  <Dropdown
                    label="Status"
                    placeholder="Select user/group"
                    options={statusOptions}
                    styles={{ root: { width: '100%' } }}
                  />
                </Stack.Item>
                <Stack.Item grow={1}>
                  <DatePicker
                    label="Due Date"
                    styles={{ root: { width: '100%' } }}
                  />
                </Stack.Item>
              </Stack>

              {/* Comments */}
              <Stack>
                <Label>Comments</Label>
                <TextField
                  multiline
                  rows={3}
                  placeholder="placeholder for comments"
                  styles={{ root: { width: '100%' } }}
                />
              </Stack>

              {/* Save and Delete buttons */}
              <Stack horizontal tokens={{ childrenGap: 10 }}>
                <PrimaryButton 
                  text="Save"
                  styles={{
                    root: {
                      backgroundColor: '#6B6B6B',
                      borderColor: '#6B6B6B'
                    }
                  }}
                />
                <DefaultButton 
                  text="Delete" 
                  onClick={() => setShowDeleteDialog(true)}
                />
              </Stack>
            </Stack>
          </Stack.Item>

          {/* Files Section - Right Column */}
          <Stack.Item grow={1} styles={{ root: { width: '50%' } }}>
            <Text variant="large">Files</Text>
            <Stack 
              styles={{ 
                root: { 
                  border: '1px solid #edebe9',
                  padding: '20px',
                  marginTop: '10px',
                  height: '100%',
                  minHeight: '500px'
                } 
              }}
              tokens={{ childrenGap: 15 }}
            >
              {/* Files content will go here */}
            </Stack>
          </Stack.Item>
        </Stack>
      </Stack>

      {/* Delete Confirmation Dialog */}
      <Dialog
        hidden={!showDeleteDialog}
        onDismiss={() => setShowDeleteDialog(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Are you sure?',
          subText: 'OK/Cancel'
        }}
      >
        <DialogFooter>
          <PrimaryButton text="OK" onClick={() => setShowDeleteDialog(false)} />
          <DefaultButton text="Cancel" onClick={() => setShowDeleteDialog(false)} />
        </DialogFooter>
      </Dialog>
    </Stack>
  );
}; 