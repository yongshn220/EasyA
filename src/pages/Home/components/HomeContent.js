import {styled} from "@mui/material/styles";
import UsefulSitesPreview from "../../UsefulSites/UsefulSitesPreview";
import StorePreview from "../../Store/StorePreview";
import CommunityInvite from "../../EasyA/components/CommunityInvite";


export default function HomeContent() {
  return (
    <Base>
      <UsefulSitesPreview/>
      {/*<EventsPreview/>*/}
      {/*<StorePreview/>*/}
      <CommunityInvite/>
    </Base>
  )
}

const Base = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});
