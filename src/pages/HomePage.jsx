import { Box, Typography } from '@mui/material';

export default function HomePage() {

  return (
    <Box flex={4} p={2} minHeight={'calc(100vh - 97px)'}>
      <Typography variant='h6'>
        {'Home Page'}
      </Typography>
    </Box>
  );
}