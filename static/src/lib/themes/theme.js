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
    noHover: {
      borderRadius: '8px'
    }
  },
  cards: {
    primary: {
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
    }
  }
}

export default theme;
