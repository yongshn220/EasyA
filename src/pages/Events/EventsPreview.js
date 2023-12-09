import {styled} from "@mui/material/styles";
import {COLOR} from "../../util/util";
import ItemSquareBox from "./ItemSquareBox";

export default function EventsPreview() {
  return (
    <Base>
      <TitleArea>
        <Title>Events</Title>
        <SubTitle>Share the upcoming events on campus.</SubTitle>
      </TitleArea>
      <Content>
        <ItemSquareBox/>
        <ItemSquareBox/>
        <ItemSquareBox/>
        <ItemSquareBox/>
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
  height:'25rem',
});

