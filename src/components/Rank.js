import Grid from "@mui/material/Grid";
import BasicCard from "./BasicCard";
import Box from "@mui/material/Box";

export default function Rank({title, avgData}) {
  return (
    <>
      <Box style={{display:'flex', justifyContent:'center', alignItems:'center', flex: "0 0 50px", fontSize:30, fontWeight:'600'}}>
        <div>{title}</div>
      </Box>
      <Box style={{flex: 1, marginLeft: 40, marginRight: 40, padding:10, borderRadius:10, backgroundColor:'#efefef'}}>
        <Grid container spacing={1}>
          {
            avgData.map((data, index) => (
              <Grid item xs={12 / 5} key={index}>
                <BasicCard rank={index+1} name={data.name}/>
              </Grid>
            ))
          }
        </Grid>
      </Box>
    </>
  )
}
