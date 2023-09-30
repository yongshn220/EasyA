import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Home from './pages/Home'
import {RecoilRoot} from "recoil";
import {Suspense} from "react";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
