import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import EasyAHomeWrapper from './pages/EasyA/EasyAHome'
import DayOffMakerHomeWrapper from './pages/DayOff/DayOffMakerHome'
import {RecoilRoot} from "recoil";
import HomePage from "./pages/Home/HomePage";
import StoreHome from "./pages/Store/StoreHome";
import StoreCreatePost from "./pages/Store/StoreCreatePost";
import StorePost from "./pages/Store/StorePost";
import React, {Suspense} from "react";
import LoginHome from "./pages/Login/LoginHome";
import SignUpHome from "./pages/SignUp/SignUpHome";
import VerificationRequestPage from "./pages/SignUp/VerificationRequestPage";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <BrowserRouter>
          <Suspense fallback={(<div>loading</div>)}>
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/login" element={<LoginHome/>}/>
              <Route path="/signup" element={<SignUpHome/>}/>
              <Route path="/verify" element={<VerificationRequestPage/>}/>
              <Route path="/store" element={<StoreHome/>}/>
              <Route path="/store/post/:id" element={<StorePost/>}/>
              <Route path="/store/create" element={<StoreCreatePost/>}/>
              <Route path="/easya" element={<EasyAHomeWrapper/>}/>
              <Route path="/dayoffmaker" element={<DayOffMakerHomeWrapper/>}/>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
