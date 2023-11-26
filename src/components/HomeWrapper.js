import BaseLayout from "../pages/Home/components/BaseLayout";
import React from "react";
import {styled} from "@mui/material/styles";
import {ContentWidthDesktop} from "../util/util";


export default function HomeWrapper({children}) {
  return (
    <BaseLayout>
      <Side/>
      <Content>
        {children}
      </Content>
      <Side/>
    </BaseLayout>
  )
}

const Content = styled('div')({
  position:'relative',
  display: 'flex',
  flexDirection: 'column',
  flex: `0 0 ${ContentWidthDesktop}`,
});

const Side = styled('div')({
  flex: 1,
  '@media (max-width: 600px)': {
    // Hide or minimize the side components on mobile
    display: 'none',
  },
});
