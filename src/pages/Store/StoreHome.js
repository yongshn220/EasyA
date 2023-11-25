import React from "react";
import {styled} from "@mui/material/styles";
import HomeWrapper from "../../components/HomeWrapper";
import {COLOR} from "../../util/util";
import StoreItemBox from "./StoreItemBox";
import Grid from "@mui/material/Grid";
export default function StoreHome() {

  function handlePost() {

  }

  return (
    <HomeWrapper>
      <Base>
        <Button onClick={handlePost}>
          Post
        </Button>
        <Content>
          <Grid container>
            <Grid item xs={3}>
              <StoreItemBox/>
            </Grid>
            <Grid item xs={3}>
              <StoreItemBox/>
            </Grid>
            <Grid item xs={3}>
              <StoreItemBox/>
            </Grid>
            <Grid item xs={3}>
              <StoreItemBox/>
            </Grid>
            <Grid item xs={3}>
              <StoreItemBox/>
            </Grid>
            <Grid item xs={3}>
              <StoreItemBox/>
            </Grid>
            <Grid item xs={3}>
              <StoreItemBox/>
            </Grid>
            <Grid item xs={3}>
              <StoreItemBox/>
            </Grid>
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
