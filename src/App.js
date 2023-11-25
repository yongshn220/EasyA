import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import EasyAHomeWrapper from './pages/EasyA/EasyAHome'
import DayOffMakerHomeWrapper from './pages/DayOff/DayOffMakerHome'
import {RecoilRoot} from "recoil";
import HomePage from "./pages/Home/HomePage";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/easya" element={<EasyAHomeWrapper/>}/>
            <Route path="/dayoffmaker" element={<DayOffMakerHomeWrapper/>}/>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
