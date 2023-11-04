import DayOffBanner from "./components/DayOffBanner";
import FixedCourses from "./components/FixedCourses";
import DayOffMainContent from "./components/DayOffMainContent";
import DayOffFooter from "./components/DayOffFooter";


export default function DayOffMakerHomeWrapper() {
  return (
    <div>
      <DayOffMakerHome/>
      <DayOffFooter/>
    </div>
  )
}



function DayOffMakerHome() {
  return (
    <div style={{position:'relative', width:'100%', minHeight:'100vh', backgroundImage: `url('/graybg.jpeg')`}}>
      <DayOffBanner/>
      <FixedCourses/>
      <DayOffMainContent/>
    </div>
  )
}
