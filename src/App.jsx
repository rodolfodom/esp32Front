import { useState } from 'react'
import { Box, Container, createTheme, ThemeProvider, Typography } from '@mui/material'
import Back from './assets/back.jpg'
import FullWidthTabs from './tabPanel'

function App() {
  const backGoriund = Back

  const theme = createTheme({
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  })


  return (
      <Box sx={{backgroundImage: `url(${Back})`, display: 'flex', alignItems: 'center', justifyContent: 'center', m:0, p:2, backgroundRepeat: 'repeat', minHeight: '100vh'}}>
        <Container sx={{py: 10, m: 0, backgroundColor: 'RGBA(355,355,355,0.9)'}}>
          <FullWidthTabs/>
        </Container>
      </Box>
    )
}

export default App
