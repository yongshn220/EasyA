import {styled} from "@mui/material/styles";
import {COLOR} from "../../util/util";
import ItemColumnBox from "./ItemColumnBox";
import {useNavigate} from "react-router-dom";

const site1 = {
  title: "SBU Easy A Ranking",
  subTitle: "Check and find which class has been giving the most A grades so far."
}

export default function UsefulSitesPreview() {
  const navigate = useNavigate();

  function HandleUsefulSitesClick() {
    navigate('/sites')
  }

  return (
    <Base>
      <TitleArea onClick={HandleUsefulSitesClick}>
        <Title>Useful Sites</Title>
        <SubTitle>Share the useful websites you know.</SubTitle>
      </TitleArea>
      <Content>
        <ItemColumnBox content={site1}/>
        <ItemColumnBox content={site1}/>
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
  flexDirection: 'column',
});

