import './css/App.css';
import { Header } from './objects/Header';
import { Sidebar } from './objects/Sidebar';
import { Content } from './objects/Content';

function App() {
  return (
    <div className='grid-container'>
      <Header />
      <div className='layout-body'>
        <div className='layout-container'>
          <Sidebar />
          <Content />
        </div>
      </div>
    </div>
  );
}

export default App;
