import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function BasicCard({rank, name}) {

  return (
    <Card sx={{ }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          #{rank}
        </Typography>
        <Typography sx={{ fontSize: 20 }}  component="div">
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
}
