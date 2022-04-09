import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./popup.css";
import WeatherCard from "../components/WeatherCard/WeatherCard";
import {
  InputBase,
  Paper,
  IconButton,
  Box,
  Grid,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PictureInPictureIcon from '@mui/icons-material/PictureInPicture';

//Utils storage
import {
  setStoredCities,
  getStorageCities,
  setStoredOptions,
  getStorageOptions,
  LocalStorageOptions,
} from "../utils/storage";
import { Message } from "../utils/message";

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState<string>("");
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);

  useEffect(() => {
    getStorageCities().then((cities) => setCities(cities));
    getStorageOptions().then((options) => setOptions(options));
  }, []);

  const handleCityClick = () => {
    if (cityInput === "") {
      return;
    }
    const updatedCities = [...cities, cityInput];
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
      setCityInput("");
    });
  };

  const handelDeleteCity = (id: number) => {
    cities.splice(id, 1);
    const updatedCities = [...cities];
    setStoredCities(updatedCities).then(() => setCities(updatedCities));
  };

  const handleTempScaleClick = () => {
    const updateOptions: LocalStorageOptions = {
      ...options,
      tempScale: options.tempScale === "metric" ? "imperial" : "metric",
    };
    setStoredOptions(updateOptions).then(() => setOptions(updateOptions));
  };


  
  const handleAutoOverlay = () =>{
   chrome.tabs.query({
     active:true
   },(tabs) =>{
     if(tabs.length > 0){
       chrome.tabs.sendMessage(tabs[0].id, Message.TOGGLE_OVERLAY)
     }
   })
  }

  if (!options) return null;

  return (
    <Box mx="8px" my="16px">
      <div style={{ display: "flex" }}>
        <Grid container justifyContent="space-evenly" margin="3px">
          <Paper sx={{ p: "3px 0", display: "flex", width: "100%" }}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Add a city name"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
            />
            <IconButton
              onClick={handleCityClick}
              sx={{ p: "10px" }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item margin="3px">
          <Paper sx={{ p: "3px 0" }}>
            <IconButton onClick={handleTempScaleClick}>
              {options.tempScale === "metric" ? "\u2103" : "\u2109"}
            </IconButton>
          </Paper>
        </Grid>
        <Grid item margin="3px">
          <Paper sx={{ p: "5px 0" }}>
            <IconButton onClick={ handleAutoOverlay}>
              <PictureInPictureIcon />
            </IconButton>
          </Paper>
        </Grid>
      </div>
      <Grid sx={{ overflowY: "auto" }}>
        {options.homCity != "" && <WeatherCard city={options.homCity} tempScale={options.tempScale}/> }
        {cities
          .map((city, i) => (
            <WeatherCard
              tempScale={options.tempScale}
              onDelete={() => handelDeleteCity(i)}
              key={i}
              city={city}
            />
          ))
          .reverse()}
      </Grid>
    </Box>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
