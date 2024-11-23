import { Box, Typography } from '@mui/material';

export default function Profile() {

  return (
    <Box flex={4} p={2} height={'calc(100vh - 97px)'}>
      <Typography variant='h6'>
        {'Here will be my profile.'}
      </Typography>
    </Box>
  );
}