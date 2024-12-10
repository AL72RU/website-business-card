import { Box, Typography } from '@mui/material';
import { useCallback } from 'react';

export default function HomePage() {

  const toggleFullScreen = useCallback(async () => {
    const element = document.getElementById('container-01');
    const isFullScreen = document.fullscreenElement;
    if (!isFullScreen) {
      /* Open fullscreen */
      if (element.requestFullscreen) {
        await element.requestFullscreen({ navigationUI: 'hide' });
      } else if (element.webkitRequestFullscreen) { /* Safari */
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) { /* IE11 */
        element.msRequestFullscreen();
      }
    } else {
      /* Close fullscreen */
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
      }
    }
  }, []);

  return (
    <Box flex={4} p={2} minHeight={'calc(100vh - 97px)'}>
      <Typography variant='h6'>
        {'Home Page'}
      </Typography>

      <br/>
      <Typography >
        {'Testing full screen mode for mobile devices.'}
      </Typography>
      <Typography >
        {'The blue box should go full screen and hide the navigation bar.'}
      </Typography>

      <div className={'container-01'}>
        <div className={'inner-container-01'} id={'container-01'}>
          <div className={'button-container-01'}>
            <button onClick={toggleFullScreen} className={'button-01'}>Toggle full screen mode</button>
          </div>
        </div>
      </div>
    </Box>
  );
}