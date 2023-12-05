import React from "react";
import {Suspense} from "react";
import {styled} from "@mui/material/styles";
import HomeWrapper from "../../components/HomeWrapper";
import {COLOR} from "../../util/util";
import StoreItemBox from "./StoreItemBox";
import Grid from "@mui/material/Grid";
import {useNavigate} from "react-router-dom";
import {storePostIdsAtom} from "../../0.Recoil/postState";
import {useRecoilValue} from "recoil";
import {authAtom} from "../../0.Recoil/accountState";
import { ErrorBoundary } from "react-error-boundary";
import LoadingCircle from "../Loading/LoadingCircle";


export default function StoreHome() {
  const auth = useRecoilValue(authAtom)
  const storePostIds = useRecoilValue(storePostIdsAtom)
  const navigate = useNavigate()

  function handleCreatePost() {
    if (auth.loggedIn) {
      navigate('/store/create')
    }
    else {
      alert("You need to login to create a post.")
    }
  }

  function handlePostClick(id) {
    navigate(`/store/post/${id}`)
  }

  return (
    <HomeWrapper>
      <Base>
        <Button onClick={handleCreatePost}>
          Sell an Item
        </Button>
        <Content>
          <Grid container>
            {
              storePostIds.map((id) => (
              <ErrorBoundary key={id} fallback={<></>}>
                <Grid item xs={3}>
                  <Suspense fallback={(<LoadingCircle/>)}>
                    <StoreItemBox onClick={() => handlePostClick(id)} id={id}/>
                  </Suspense>
                </Grid>
              </ErrorBoundary>
              ))
            }
          </Grid>
        </Content>
      </Base>
    </HomeWrapper>
  )
}


const Base = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginTop:'3rem',
  paddingLeft:'2rem',
  paddingRight:'2rem',
  height:'100%',
});

const Content = styled('div')({
  flex: 1,
  marginTop:'1rem',
  backgroundColor:'white',
})

const Button = styled('div')({
  display:'flex',
  fontSize:'1.6rem',
  fontWeight:'600',
  width:'12rem',
  height:'3rem',
  alignItems:'center',
  justifyContent:'center',
  borderRadius:'5px',
  color: 'white',
  cursor:'pointer',
  backgroundColor: COLOR.mainYellow,
  '&:hover': {
    backgroundColor: COLOR.mainLightYellow,
  },
})
