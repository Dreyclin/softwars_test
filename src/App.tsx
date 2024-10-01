import Header from './components/Header/Header';
import Aside from './components/Aside/Aside';
import Main from './components/Main/Main';

function App() {
  return (
    <div className="">
      <Header />
      <div className="aside-main-flex">
        <Aside />
        <Main />
      </div>
    </div>

  );
}

export default App;
