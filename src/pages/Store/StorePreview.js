import {styled} from "@mui/material/styles";
import {COLOR} from "../../util/util";
import StoreItemBox from "./StoreItemBox";
import {useNavigate} from "react-router-dom";
import {storePostIdsAtom} from "../../0.Recoil/postState";
import {useRecoilValue} from "recoil";
import React, {Suspense} from "react";
import Grid from "@mui/material/Grid";

export default function StorePreview() {
  const postIds = useRecoilValue(storePostIdsAtom)
  const navigate = useNavigate();

  function HandleStoreClick() {
    navigate('/store')
  }

  function handlePostClick(id) {
    navigate(`/store/post/${id}`)
  }

  return (
    <Base>
      <TitleArea onClick={HandleStoreClick}>
        <Title>Buy & Sell</Title>
        <SubTitle>Try buying and selling items in the campus.</SubTitle>
      </TitleArea>
      <Content>
        <Grid container>
          {
            postIds.map((id) => (
              <Suspense fallback={(<div>loading</div>)}>
                <Grid item xs={2.4}>
                  <StoreItemBox onClick={() => handlePostClick(id)} id={id}/>
                </Grid>
              </Suspense>
            ))
          }
        </Grid>
      </Content>
    </Base>
  )
}

const Base = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginTop:'1rem',
  paddingLeft:'2rem',
  paddingRight:'2rem',
});

const TitleArea = styled('div')({
  display:'flex',
  flexDirection:'column',
  height: '8rem',
  marginLeft:'1rem',
  justifyContent:'center',
  cursor:'pointer',
});

const Title = styled('div')({
  fontSize: '2.0rem',
  fontWeight:'700',
  textAlign:'left',
});

const SubTitle = styled('div')({
  fontSize: '1.6rem',
  textAlign:'left',
  color: COLOR.fontGray50,
  marginTop:'0.5rem',
})

const Content = styled('div')({
  display: 'flex',
  padding:'1rem',
  boxSizing: 'border-box',
  borderRadius:'5px',
  backgroundColor:'white',
});

