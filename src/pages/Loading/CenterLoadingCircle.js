import LoadingCircle from "./LoadingCircle";
import {styled} from "@mui/material/styles";


export default function CenterLoadingCircle({state}) {
  if (!state) return <></>
  return (
    <LoadingOverlay>
      <LoadingCircle />
    </LoadingOverlay>
  )
}

const LoadingOverlay = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
  zIndex: 1000, // Ensure it's above other elements
});
