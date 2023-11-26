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


export default function StoreHome() {
  const storePostIds = useRecoilValue(storePostIdsAtom)
  const navigate = useNavigate()

  function handleCreatePost() {
    navigate('/store/create')
  }

  function handlePostClick(id) {
    navigate(`/store/post/${id}`)
  }

  return (
    <HomeWrapper>
      <Base>
        <Button onClick={handleCreatePost}>
          Post
        </Button>
        <Content>
          <Grid container>
            {
              storePostIds.map((id) => (
                <Suspense fallback={(<div>loading</div>)}>
                  <Grid item xs={3}>
                    <StoreItemBox onClick={() => handlePostClick(id)} id={id}/>
                  </Grid>
                </Suspense>
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
});

const Button = styled('div')({
  display:'flex',
  fontSize:'1.6rem',
  fontWeight:'600',
  width:'8rem',
  height:'3rem',
  alignItems:'center',
  justifyContent:'center',
  backgroundColor: COLOR.mainYellow,
  '&:hover': {
    backgroundColor: COLOR.mainLightYellow,
  },
  color: 'white',
  borderRadius:'2px',
  cursor:'pointer',
})
