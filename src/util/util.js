export const COLOR = {
  default: "rgb(250,248,236)",
  yellow: "#e0b548",
  blue: "#4169e1",
  transparentYellow: "rgba(224,181,72,0.3)",
  lightYellow: "#e7c675",
}

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
