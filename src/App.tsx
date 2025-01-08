import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Dashboard } from './pages/Dashboard';
import { Footer } from './components/Footer';
import { Routings } from './pages/Routings';
import { CreateRouting } from './pages/CreateRouting';
import { FloatingActionButton } from './components/FloatingActionButton';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import './styles.css';

// Initialize icons
initializeIcons();

export const App: React.FC = () => {
  return (
    <Router>
      <Stack className="app" styles={{ root: { backgroundColor: 'white' } }}>
        <Header />
        <Navigation />
        <Stack.Item styles={{ root: { flex: '1 1 auto' } }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/routings" element={<Routings />} />
            <Route path="/routings/create" element={<CreateRouting />} />
          </Routes>
        </Stack.Item>
        <Footer />
        <FloatingActionButton />
      </Stack>
    </Router>
  );
};
