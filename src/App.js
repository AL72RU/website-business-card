import { useState } from 'react';
import { Box, Container, createTheme, Stack, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './objects/Navbar';
import Sidebar from './objects/Sidebar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Projects from './pages/Projects';
import Notes from './pages/Notes';

const basename = ''; /*  '/website-business-card/' or ''  */

function App() {
  const [mode, setMode] = useState('dark');
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
  });

  return (
    <ThemeProvider theme={theme}>
      <Box bgcolor={'background.default'} color={'text.primary'}>
        <Navbar mode={mode} setMode={setMode}/>
        <Container>
          <Stack direction='row' spacing={0} justifyContent='space-between'>

            <Router
              basename={basename}
              future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true
              }}
            >
              <Sidebar theme={theme}/>
              <Routes>
                <Route path={'/home'} element={<Home/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/projects'} element={<Projects/>}/>
                <Route path={'/notes'} element={<Notes/>}/>
                <Route path='*' element={<Navigate to='/home'/>}/>
              </Routes>
            </Router>
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
