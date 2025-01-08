import React from 'react';
import { IconButton } from '@fluentui/react/lib/Button';
import { useNavigate } from 'react-router-dom';

export const FloatingActionButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="fab-container"
      style={{
        position: 'fixed',
        bottom: '5rem',
        right: '2rem',
        zIndex: 1000
      }}
    >
      <IconButton
        className="fab-button"
        iconProps={{ 
          iconName: 'Add',
          styles: { 
            root: { 
              fontSize: '20px',
              color: 'white',
              fontWeight: 'bold'
            } 
          }
        }}
        styles={{
          root: {
            backgroundColor: '#2b3137',
            borderRadius: '50%',
            width: '56px',
            height: '56px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            selectors: {
              '&:hover': {
                backgroundColor: '#2b3137 !important',
              },
              '&:hover .ms-Icon': {
                color: 'white !important',
              }
            }
          },
          rootHovered: {
            backgroundColor: '#2b3137 !important',
            color: 'white !important'
          },
          icon: {
            color: 'white !important'
          }
        }}
        onClick={() => navigate('/routings/create')}
        title="Create New Routing"
      />
    </div>
  );
}; 