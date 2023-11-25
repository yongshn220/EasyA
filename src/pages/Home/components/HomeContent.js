import UsefulSitesPreview from "../../UsefulSites/UsefulSitesPreview";
import {styled} from "@mui/material/styles";


export default function HomeContent() {
  return (
    <Base>
      <UsefulSitesPreview/>
      <UsefulSitesPreview/>
    </Base>
  )
}

const Base = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});
