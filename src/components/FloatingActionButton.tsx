import React from 'react';
import { ActionButton } from '@fluentui/react/lib/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { mergeStyles, keyframes } from '@fluentui/react/lib/Styling';

// Define the fade-in animation
const fadeIn = keyframes({
  from: {
    opacity: 0
  },
  to: {
    opacity: 1
  }
});

// Create animated container class
const animatedContainer = mergeStyles({
  animation: `${fadeIn} 0.3s ease-out`
});

export const FloatingActionButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === '/group-management') {
      navigate('/group-management/add');
    } else {
      navigate('/routings/create');
    }
  };

  return (
    <div className={animatedContainer}>
      <ActionButton
        iconProps={{ 
          iconName: 'Add',
          styles: {
            root: {
              color: 'white !important',
              fontSize: '24px'
            }
          }
        }}
        styles={{
          root: {
            backgroundColor: '#2E3B50',
            color: 'white',
            borderRadius: '50%',
            position: 'fixed',
            bottom: '120px',
            right: '40px',
            width: '56px',
            height: '56px',
            padding: 0,
            minWidth: 'unset',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.2s ease-out',
            ':hover': {
              backgroundColor: '#2E3B50',
              color: 'white',
              transform: 'scale(1.05)'
            },
            ':hover i': {
              color: 'white !important'
            }
          },
          icon: {
            margin: 0
          }
        }}
        onClick={handleClick}
      />
    </div>
  );
}; 