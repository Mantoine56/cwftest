import React from 'react';
import { Stack, IStackTokens } from '@fluentui/react/lib/Stack';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { MyTasks } from './components/MyTasks';
import { RoutingsSection } from './components/RoutingsSection';
import { OverDueRoutings } from './components/OverDueRoutings';
import { CommandButton } from '@fluentui/react/lib/Button';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Footer } from './components/Footer';
import './styles.css';

// Initialize icons
initializeIcons();

const stackTokens: IStackTokens = {
  childrenGap: 20,
  padding: 20,
};

export default function App() {
  return (
    <Stack styles={{ root: { height: '100vh', overflow: 'hidden', backgroundColor: 'white' } }}>
      <Header />
      <Navigation />
      <Stack.Item grow styles={{ root: { overflow: 'auto', paddingBottom: '60px', minHeight: 0 } }}>
        <Stack
          horizontal
          tokens={stackTokens}
          styles={{
            root: {
              margin: '20px',
              minWidth: 0,
              maxWidth: '100%',
              height: '100%',
            },
          }}
        >
          <Stack.Item grow={1} styles={{ root: { minWidth: 0, width: '100%' } }} className="card-animation">
            <MyTasks />
          </Stack.Item>
          <Stack.Item grow={2} styles={{ root: { minWidth: 0, width: '100%' } }} className="card-animation">
            <RoutingsSection />
          </Stack.Item>
          <Stack.Item grow={1} styles={{ root: { minWidth: 0, width: '100%' } }} className="card-animation">
            <OverDueRoutings />
          </Stack.Item>
        </Stack>
      </Stack.Item>
      <Footer />
      <CommandButton
        iconProps={{ 
          iconName: 'Add',
          styles: {
            root: {
              color: 'white !important',
              fontSize: 20,
            }
          }
        }}
        text="create new routing"
        className="fab-button"
        styles={{
          root: {
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            backgroundColor: '#0078D4',
            color: 'white',
            borderRadius: '50%',
            width: '56px',
            height: '56px',
            padding: 0,
            minWidth: 'unset',
            zIndex: 1000,
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out',
            selectors: {
              '&:hover': {
                backgroundColor: '#106EBE',
                transform: 'scale(1.05)',
              },
              '&:hover i': {
                color: 'white !important',
              }
            }
          },
          icon: {
            margin: 0,
          },
          textContainer: {
            display: 'none',
          },
        }}
      />
    </Stack>
  );
}
