import DayOffBanner from "./components/DayOffBanner";
import FixedCourses from "./components/FixedCourses";
import DayOffMainContent from "./components/DayOffMainContent";


export default function DayOffMakerHomeWrapper() {
  return (
    <DayOffMakerHome/>
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
