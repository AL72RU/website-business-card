import {
  AppBar,
  Avatar,
  Box,
  Container,
  styled,
  Toolbar,
  Typography
} from '@mui/material';
import { DarkMode, LightMode, Menu } from '@mui/icons-material';

const StyledToolbar = styled(Toolbar) ({
  display: 'flex',
  justifyContent: 'space-between'
});

/*
const Search = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  padding: '0 10px',
  borderRadius: theme.shape.borderRadius,
  width: '40%'
}));
*/
const Icons = styled(Box)(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  gap: '20px',
  [theme.breakpoints.up('sm')]:{
    display: 'flex'
  }
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}));

const Navbar = ({ mode, setMode }) => {
  return (
    <AppBar
      position='sticky'
      sx={{
        borderBottom: '1px solid #3d444d',
        backgroundImage: 'none'
      }}
    >
      <Container sx={{
        '--Paper-overlay': undefined
      }}>
        <StyledToolbar>
          <Typography variant='h6' sx={{ display: { xs: 'none', sm: 'block' }}}>
            Website business card
          </Typography>
          <Menu sx={{ display: { xs: 'block', sm: 'none' }}}/>
          {/*<Search>*/}
          {/*  <InputBase placeholder='Search...' sx={{ color: '#000000' }}/>*/}
          {/*</Search>*/}

          <UserBox>
            <Icons>
              {/*<Badge badgeContent={0} color='error'>*/}
              {/*  <Mail />*/}
              {/*</Badge>*/}
            </Icons>
            {mode === 'dark' ? (
              <DarkMode onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}/>
            ) : (
              <LightMode onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}/>
            )}
            <Avatar sx={{ width: 30, height: 30 }} src=''/>
          </UserBox>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;