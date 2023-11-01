import LoadingAnimation from "./LoadingAnimation";

export default function LoadingBox() {


  return (
    <div>
      <LoadingAnimation/>
      <div style={{margin:10, fontSize:'4rem', fontWeight:'700'}}>
        Data is <span>Loading</span>
      </div>
      <div style={{margin:10, fontSize:'1.5rem', fontWeight:'700'}}>
        (Usually takes less than 10 seconds.)
      </div>
    </div>
  )
}
