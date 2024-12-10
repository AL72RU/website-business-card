import { useCallback, useState } from 'react';
import { createTheme } from '@mui/material';

const useTheme = () => {
  const [mode, setMode] = useState(localStorage.getItem('theme') || 'dark');
  const theme = createTheme({
    palette: {
      mode,
      ...(mode === 'dark' ? {
        background: {
          'paper': '#010409',
          'default': '#0d1117'
        },
        text: {
          'primary': '#f0f6fc',
        }
      } : {
        primary: {
          'main': '#4485ff',
          'contrastText': '#ffffff'
        },
        background: {
          'default': '#fffbf5'
        },
        text: {
          'primary': '#000000',
        }
      })
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            width: 200,
            borderRadius: '0px 10px 10px 0px',
            borderRight: '1px solid #3d444d',
            ...(mode === 'dark' ? {
              backgroundImage: 'none',
              background: '#151b23'
            } : {})
          }
        }
      }
    }
  });

  const toggleMode = useCallback(() => {
    setMode(prevState => {
      localStorage.setItem('theme', (prevState === 'dark') ? 'light' : 'dark');
      return (prevState === 'dark') ? 'light' : 'dark';
    });
  }, []);

  return {
    theme,
    mode,
    toggleMode
  };
};

export default useTheme;