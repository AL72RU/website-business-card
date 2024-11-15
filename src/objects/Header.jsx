import '../css/Header.css';
import { memo } from 'react';

export const Header = memo(() => {

  return (
    <div className='layout-header'>
      <div className='container'>
        <a href='https://github.com/'>
          <img className='logo' alt={'logo'}/>
        </a>
        <a href='https://github.com/AL72RU'>
          <div className='login'>
            AL72RU
          </div>
        </a>
        <div className='slash'>{' / '}</div>
        <a href='https://github.com/AL72RU/website-business-card'>
          <div className='title'>
            Website business card
          </div>
        </a>
      </div>
    </div>
  );
});