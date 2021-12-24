const theme = {
  fonts: {
    body: 'system-ui, sans-serif',
    heading: '"Avenir Next", sans-serif',
    monospace: 'Menlo, monospace',
  },
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#33e',
  },
  breakpoints: [
    '600px', // mobile
    '1200px', // desktop
  ],
  buttons: {
    primary: {
      borderRadius: '8px'
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
    }
  }
}

export default theme;
