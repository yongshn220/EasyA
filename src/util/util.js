export const COLOR = {
  default: "rgb(250,248,236)",
  yellow: "#e0b548",
  blue: "#4169e1",
  transparentYellow: "rgba(224,181,72,0.3)",
  lightYellow: "#e7c675",
  lineGray: "#c5c5c5",
  lineGray30: "#e0e0e0",
  fontGray80: "rgb(51,51,51)",
  fontGray50: "rgb(136,136,136)",
  fontGray30: "rgb(204,204,204)",
  fontGray10: "rgb(241,241,241)",
  main: '#2196f3',
  mainHover: "#1769aa",
  mainLight: "#4dabf5",
  mainLight10: "#f6f9ff",
}

export const InsideWidthDesktop = '1300px'
export const ContentWidthDesktop = '1000px'

export const whiteYellowInputFieldStyle = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white', // Set your desired border color
    },
    '&.Mui-focused fieldset': {
      borderColor: COLOR.yellow, // Change this to your desired color
    },
    '&:hover fieldset': {
      borderColor: COLOR.lightYellow, // Set border color on hover
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
