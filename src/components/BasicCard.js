import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function BasicCard({rank, name, score}) {

  return (
    <Card sx={{ }}>
      <CardContent>
        <Typography sx={{ fontSize: '1.4rem' }} color="text.secondary" gutterBottom>
          #{rank}
        </Typography>
        <Typography sx={{ fontSize: '2.0rem' }}  component="div">
          {name}
        </Typography>
        <Typography sx={{ fontSize: '1.4rem' }} color="text.secondary" gutterBottom>
          {score}
        </Typography>
      </CardContent>
    </Card>
  );
}
