import "./invite.css"

export default function CommunityInvite() {
  return (
    <section className="custom-section">
      <div className="custom-overlay">
        <h1 className="custom-title">New! We invite you to join us on <span style={{color: "black"}}>EazyA Community</span>!</h1>
        <p className="custom-description">
          Connect with each other in the Eazya Community and let's make a good college life together!
        </p>
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'10px', height:'40px', width:'100px', backgroundColor:'black'}}>
          <a href="https://www.eazya.net/" style={{color:'white', fontSize:'2rem', }}>
            START
          </a>
        </div>
      </div>
    </section>
  );
}

