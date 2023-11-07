import DayOffBanner from "./components/DayOffBanner";
import FixedCourses from "./components/FixedCourses";
import DayOffMainContent from "./components/DayOffMainContent";
import DayOffFooter from "./components/DayOffFooter";
import PopupMessage from "../../components/PopupMessage";
import React from "react";
import {useRecoilState} from "recoil";
import {dayOffPopupMessageAtom} from "./components/DayOffState";
import DayOffHeader from "./components/DayOffHeader";

export default function DayOffMakerHomeWrapper() {
  return (
    <div>
      <DayOffHeader/>
      <DayOffMakerHome/>
      <DayOffFooter/>
    </div>
  )
}

function DayOffMakerHome() {
  const [popupMessage, setPopupMessage] = useRecoilState(dayOffPopupMessageAtom)

  return (
    <div style={{position:'relative', width:'100%', minHeight:'100vh', backgroundImage: `url('/graybg.jpeg')`}}>
      <PopupMessage severity={popupMessage.severity} state={popupMessage.state} setState={(state) => setPopupMessage({...popupMessage, state: state})} message={popupMessage.message}/>
      <DayOffBanner/>
      <FixedCourses/>
      <DayOffMainContent/>
    </div>
  )
}
