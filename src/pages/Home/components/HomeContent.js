import {styled} from "@mui/material/styles";
import UsefulSitesPreview from "../../UsefulSites/UsefulSitesPreview";
import StorePreview from "../../Store/StorePreview";


export default function HomeContent() {

  return (
    <Base>
      <UsefulSitesPreview/>
      {/*<EventsPreview/>*/}
      <StorePreview/>
    </Base>
  )
}

const Base = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});
