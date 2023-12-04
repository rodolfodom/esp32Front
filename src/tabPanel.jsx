import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import EncenderLuces from './encenderLuces';
import Historial from './historial';
import TiempoReal from './tiempoReal';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function socketConnect(url, setLocation){
    const socket = new WebSocket(url)
    socket.onopen = () => {
        //console.log('Conectado')
    }

    socket.onmessage = (e) => {
        const message = JSON.parse(e.data)
        if(message.type === "coordinates"){
            //console.log("nuevas coordenadas")
            setLocation({lat: message.lat, lng: message.lng})
        }
    }

    socket.onclose = () => {
        console.log('Desconectado')
    }

    return socket
}

export default function FullWidthTabs() {
    const theme = useTheme();
    const luces = React.useRef(0)
    const [value, setValue] = React.useState(0);
    const [location, setLocation] = React.useState({lat: 0, lng: 0})

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const socket = React.useRef(socketConnect('ws://ec2-54-183-90-190.us-west-1.compute.amazonaws.com:8008/ws/socket-server', setLocation))


  return (
    <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Luces" {...a11yProps(0)} />
          <Tab label= "Historial" {...a11yProps(1)} />
          <Tab label="Tiempo real"{...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <EncenderLuces luces={luces} socket={socket.current}/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Historial />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <TiempoReal coordinates={location}/>
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
