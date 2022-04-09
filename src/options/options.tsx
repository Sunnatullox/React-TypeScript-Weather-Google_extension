import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./options.css";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Box,
  Button,
  Switch 
} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';

import {
  setStoredOptions,
  getStorageOptions,
  LocalStorageOptions,
} from "../utils/storage";

type fromStateType = 'ready' | 'saving'

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [fromState, setFromState] = useState<fromStateType>("ready")

  useEffect(() => {
    getStorageOptions().then((options) => setOptions(options));
  }, []);

  const handleHomCity = (homCity:string) =>{
    setOptions({
      ...options,
      homCity:homCity
    })
  
  }

  const handleSaveHome =() =>{
    setFromState("saving")
      setStoredOptions(options).then(() =>{
        setTimeout(() =>{
          setFromState("ready")
        }, 1000)
      })
  }


  const handleAutoOverlayChange = (hasAutoOverlay:boolean) =>{
    setOptions({
      ...options,
      hasAutoOverlay
    })
  }

  if(!options){
    return null
  }

  return (
    <Box mx="10%" my="2%">
      <Card>
        <CardContent>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h4">Weather Extension Options</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Home city name</Typography>
              <TextField
                fullWidth
                label="Enter a home city"
                variant="standard"
                value={options.homCity}
                onChange={(e) => handleHomCity(e.target.value)}
              />
            </Grid>
            <Grid item display="flex">
              <Button onClick={handleSaveHome} variant="contained" color="primary">
                {fromState === "ready" ? "Save" : "Seving..."}
              </Button>
              <Grid item sx={{marginLeft:"auto"}} >
              <Typography variant="body1">Auto taggle overlay</Typography>
              <Switch 
                sx={{position:'absolute'}}
               checked={options.hasAutoOverlay}
               color="primary"
               onChange={(e, checked) => handleAutoOverlayChange(checked)}
               />
               </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
