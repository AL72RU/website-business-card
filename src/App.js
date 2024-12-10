import { Box, Container, Stack, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './objects/Navbar';
import Sidebar from './objects/Sidebar';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import Projects from './pages/Projects';
import Notes from './pages/Notes';
import AppDrawer from './objects/AppDrawer';
import { UIProvider } from './context/UIContext';
import Snake from './pages/projecs/Snake';
import ToDoList from './pages/projecs/ToDoList';
import useTheme from './hooks/useTheme';

const basename = ''; /*  '/website-business-card/' or ''  */

function App() {
  const { theme, mode, toggleMode } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Box bgcolor={'background.default'} color={'text.primary'}>
        <UIProvider>
          <Navbar
            mode={mode}
            toggleMode={toggleMode}/>
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
                  <Route path={'/home'} element={<HomePage/>}/>
                  <Route path={'/profile'} element={<Profile/>}/>
                  <Route path={'/projects'} element={<Projects theme={theme}/>}/>
                  <Route path={'/projects/snake'} element={<Snake/>}/>
                  <Route path={'/projects/todolist'} element={<ToDoList/>}/>
                  <Route path={'/notes'} element={<Notes theme={theme}/>}/>
                  <Route path='*' element={<Navigate to='/home'/>}/>
                </Routes>
                <AppDrawer theme={theme}/>
              </Router>
            </Stack>
          </Container>
        </UIProvider>
      </Box>
    </ThemeProvider>
  );
}

export default App;
