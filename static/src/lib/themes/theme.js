const theme = {
  fonts: {
    body: 'system-ui, sans-serif',
    heading: '"Avenir Next", sans-serif',
    monospace: 'Menlo, monospace',
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    text: '#fff',
    background: '#212121',
    primary: '#F05454',
    secondary: '#181818'
  },
  breakpoints: [
    '600px', // mobile
    '1200px', // desktop
    '1600px', // x-large
  ],
  buttons: {
    primary: {
      borderRadius: '8px',
      '&:hover': {
        bg: '#ed2c2c'
      }
    },
    outlined: {
      color: 'text',
      bg: 'transparent',
      border: '2px solid',
      borderColor: 'primary',
      borderRadius: '8px',
      transition: '0.2s',
      py: '6px',
      '&:hover': {
        bg: 'primary',
        color: '#fff'
      }
    },
    disabled: {
      color: 'text',
      bg: 'transparent',
      border: '2px solid',
      borderColor: 'text',
      borderRadius: '8px',
      opacity: '60%',
      py: '6px'
    },
    noHover: {
      borderRadius: '8px'
    },
    hint: {
      opacity: '60%',
      fontSize: 'small',
      bg: 'transparent',
      p: 1,
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  },
  cards: {
    pageCard: {
      bg: 'rgba(255, 255, 255, 14%)',
      borderRadius: '10px',
      p: 3,
      width: ['90%', '80%', '60%'],
      boxShadow: '0px 1px 4px #121212'
    }
  },
  text: {
    monospace: {
      fontFamily: 'monospace'
    },
    hint: {
      opacity: '60%',
      fontSize: 'small'
    }
  },
  forms: {
    input: {
      borderRadius: '10px',
      border: '1px solid rgba(255, 255, 255, 50%)',
      '&:focus': {
        outline: '0'
      }
    },
    select: {
      bg: 'transparent',
      borderRadius: '10px',
      border: '1px solid rgba(255, 255, 255, 50%)',
      '&:focus': {
        outline: '0'
      }
    }
  },
  links: {
    hint: {
      opacity: '60%',
      fontSize: 'small',
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    withImage: {
      display: 'flex',
      alignItems: 'center',
      columnGap: '5px',
    },
    hintWithImage: {
      opacity: '60%',
      fontSize: 'small',
      display: 'flex',
      alignItems: 'center',
      columnGap: '5px',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  },
  badges: {
    primary: {
      color: 'primary',
      bg: 'transparent',
      boxShadow: 'inset 0 0 0 1px'
    }
  }
}

const skeletonTheme = {
  baseColor: "#b0b0b0",
  highlightColor: "#e6e6e6",
  inline: true
}

export default theme;
export { skeletonTheme }
