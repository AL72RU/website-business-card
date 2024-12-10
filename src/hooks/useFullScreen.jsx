const useFullScreen = () => {

  function modeOn() {
    try {
      const element = document.getElementById('fullScreen');
      let isFullScreen = document.fullscreenElement;
      if (!isFullScreen) {
        if (element.requestFullscreen) {
          element.requestFullscreen({ navigationUI: 'hide' });
        } else if (element.webkitRequestFullscreen) { /* Safari */
          element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { /* IE11 */
          element.msRequestFullscreen();
        }
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  function modeOff() {
    try {
      let isFullScreen = document.fullscreenElement;
      if (isFullScreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
          document.msExitFullscreen();
        }
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  return {
    modeOn,
    modeOff,
  };
};

export default useFullScreen;