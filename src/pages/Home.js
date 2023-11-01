import React, {useEffect, useRef, useState} from "react";
import {Suspense} from "react";
import Box from "@mui/material/Box";
import {useRecoilState, useSetRecoilState} from "recoil";
import {
  DefaultMaxCourseLoadNumMobile, feedbackFieldRefAtom,
  HardwareType,
  maxCourseLoadNumAtom,
  selectedCourseDataAtom,
  userHardWareTypeAtom
} from "../0.Recoil/summaryState";
import MainBanner from "../components/MainBanner";
import '../App.css';
import CourseDetailPanel from "../components/CourseDetailPanel";
import CourseFilter from "../components/CourseFilter";
import MainContent from "../components/MainContent"
import {TextField} from "@mui/material";
import {COLOR} from "../util/util";
import Button from "@mui/material/Button";
import {postFeedback} from "../api/api";
import MainContentMobile from "../components/MainContentMobile";
import UpdateInfo from "../components/UpdateInfo";

export default function HomeWrapper() {
  return (
    <div>
      <PageHeader/>
      <Home/>
      <PageFooter/>
    </div>
  )
}

function Home() {
  const [selectedCourseData, setSelectedCourseData] = useRecoilState(selectedCourseDataAtom);
  const [userHardWareType, setUserHardWareType] = useRecoilState(userHardWareTypeAtom);
  const setMaxCourseLoadNum = useSetRecoilState(maxCourseLoadNumAtom);

  useEffect(() => {
    if (isMobileDevice()) {
      setUserHardWareType(HardwareType.MOBILE);
      setMaxCourseLoadNum(DefaultMaxCourseLoadNumMobile);
    }
  }, [setUserHardWareType, setMaxCourseLoadNum])

  function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|Windows Phone|BlackBerry|Mobile|webOS|Opera Mini/i.test(navigator.userAgent);
  }

  function handleClickBackground() {
    setSelectedCourseData(null)
  }

  return (
    <Box>
      <Box onClick={() => handleClickBackground()} style={{display:'flex', flexDirection:'column', position:'relative', width:'100%', backgroundImage: `url('/graybg.jpeg')`}}>
        <Box style={{display:'flex', flex:"0 0 350px", flexDirection:'column', justifyContent:'center'}}>
          <MainBanner/>
        </Box>
        <Box style={{display:'flex', flexDirection:'column', flex:0, marginTop:'20px', marginBottom:'40px', justifyContent:'center'}}>
          <UpdateInfo/>
        </Box>
        <Box style={{display:'flex', flex:'0', marginBottom:'40px', justifyContent:'center'}}>
          <Suspense fallback={(<div></div>)}>
            <CourseFilter/>
          </Suspense>
        </Box>
        <Suspense fallback={(<div>Loading</div>)}>
          {
            (userHardWareType === HardwareType.MOBILE)?
            <MainContentMobile/>
              :
            <MainContent/>
          }
        </Suspense>
      </Box>
      {
        selectedCourseData &&
        <Suspense fallback={(<div>Loading</div>)}>
          <CourseDetailPanel/>
        </Suspense>
      }
    </Box>
  )
}

function PageHeader() {
  return (
    <>
      <Box style={{display:'flex', position:'relative', height:'50px', width:'100%', backgroundImage: `url('/graybg.jpeg')` }}>
        <Box style={{display:'flex', flex: '0', width: "100vw", marginLeft:'1vw', justifyContent:'center', alignItems:'center', fontSize:'1.6rem', fontWeight:'700'}}>SBU@EasyA</Box>
      </Box>
    </>
  );
}


function PageFooter() {
  const [feedback, setFeedback] = useState("")
  const setFeedbackFieldRef = useSetRecoilState(feedbackFieldRefAtom);
  const feedbackRef = useRef(null);

  useEffect(() => {
    setFeedbackFieldRef(feedbackRef)
  }, [feedbackRef, setFeedbackFieldRef])

  const customStyles = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white', // Set your desired border color
      },
      '&.Mui-focused fieldset': {
        borderColor: COLOR.yellow, // Change this to your desired color
      },
    },
    '& .MuiFormLabel-root': {
      color: 'white', // Set the label font color
    },
    '& .MuiInputBase-input': {
      color: 'white', // Set your desired font color
    },
    '& label.Mui-focused': {
      color: 'white', // Change this to your desired label color
    },
  };

  const handleTextFieldChange = (event) => {
    setFeedback(event.target.value);
  };

  function handleSendFeedback() {
    if (feedback === "") {
      return
    }
    postFeedback(feedback).then((result) => {
      if (result) {
        setFeedback("")
        alert("Thank you for your feedback!")
      }
    });
  }

  return (
    <>
      <Box style={{display:'flex', flexDirection:'column', position:'relative', height:'20rem', padding:'5rem', backgroundImage: `url('/graybg.jpeg')` }}>
        <Box style={{fontSize:'1.6rem', fontWeight:'600', marginTop:'5rem', marginBottom:'1rem'}}>
          Give Us Feedback
        </Box>
        <Box ref={feedbackRef} style={{display: 'flex'}}>
          <TextField
            fullWidth
            multiline
            id="outlined-multiline-flexible"
            label="Feel free to share your feedback :)"
            maxRows={4}
            sx={{
              fontSize: '1.6rem',
              ...customStyles, // Apply custom border color
            }}
            inputProps={{ style: { fontSize: '1.4rem' } }}
            value={feedback}
            onChange={handleTextFieldChange}
          />
          <Button onClick={handleSendFeedback} variant="contained"
            sx={{
              fontSize:'1.2rem',
              marginLeft:'1rem',
              backgroundColor: COLOR.yellow, // Change this to your desired background color
              '&:hover': {
                backgroundColor: COLOR.lightYellow, // Change this for the hover effect
              },
            }}
          >Send</Button>
        </Box>
      </Box>
    </>
  );
}
