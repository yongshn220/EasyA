import {styled} from "@mui/material/styles";
import UsefulSitesPreview from "../../UsefulSites/UsefulSitesPreview";
import EventsPreview from "../../Events/EventsPreview";


export default function HomeContent() {
  return (
    <Base>
      <UsefulSitesPreview/>
      <EventsPreview/>
    </Base>
  )
}

const Base = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});
