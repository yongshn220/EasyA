import SignUpContent from "./SignUpContent";
import HomeWrapper from "../../components/HomeWrapper";
import VerificationSendConfirm from "./VerificationSendConfirm";
import {useState} from "react";

export default function SignUpHome() {
  const [isSignedUp, setIsSignedUp] = useState(false)
  const [finalEmail, setFinalEmail] = useState("")
  return (
    <HomeWrapper>
      {(isSignedUp === false)? <SignUpContent setIsSignedUp={setIsSignedUp} setFinalEmail={setFinalEmail}/> : <VerificationSendConfirm email={finalEmail} setIsSignedUp={setIsSignedUp}/>}
    </HomeWrapper>
  )
}
