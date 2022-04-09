import React, { useEffect, useState } from "react";
import {
  fetchOpenWeatherData,
  OpenWeatherData,
  OpenWeatherTemScale,
  getWeatherIconSrc
} from "../../utils/api";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import './WeatherCard.css'

const WeatherCardContainer: React.FC<{children: React.ReactNode; onDelete?: () => void;}> = ({ children, onDelete }) => {
  return (
    <Box mx={"4px"} my={"16px"}>
      <Card>
        {onDelete && (
          <IconButton sx={{ float: "right" }} onClick={onDelete}>
            <CloseIcon />
          </IconButton>
        )}
        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  );
};

type WeatherCardState = "loading" | "error" | "ready";

const WeatherCard: React.FC<{city: string; tempScale: OpenWeatherTemScale; onDelete?: () => void;}> = ({ city, onDelete, tempScale }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null);
  const [cardState, setCardState] = useState<WeatherCardState>("loading");

  useEffect(() => {
    fetchOpenWeatherData(city, tempScale)
      .then((data) => {
        setWeatherData(data);
        setCardState("ready");
      })
      .catch((err) => setCardState("error"));
  }, [city, tempScale]);

  if (cardState == "loading" || cardState == "error") {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography className="weatherCard_title">{city}</Typography>
        <Typography className="weatherCard_body">
          {cardState == "loading" ? "Loading..." : `City Not found`}
        </Typography>
      </WeatherCardContainer>
    );
  }

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Typography className="weatherCard_title">
        {weatherData.name}
      </Typography>
      {weatherData.weather.length > 0 && (
        <>
        <img style={{float:"right"}} src={getWeatherIconSrc(weatherData.weather[0].icon)} alt="" />
        <Typography className="weatherMain" sx={{float:"right", marginTop:"-1rem", contain:"size", fontSize:"16px", overflowWrap:"normal", marginRight:"-2rem" }}>{weatherData.weather[0].main}</Typography>
        </>
      )}
      <Typography className="weatherCard_body">
        {weatherData.main.temp} / {tempScale === "metric" ? "\u2103" : "\u2109"}
      </Typography>
      <Typography className="weatherCard_body">
        Fells Like: {weatherData.main.feels_like} / {tempScale === "metric" ?'\u2103' : '\u2109'}
      </Typography>
      <Typography className="weatherCard_body">
        Max Temp: {weatherData.main.temp_max} / {tempScale === "metric" ?'\u2103' : '\u2109'}
      </Typography>
      <Typography className="weatherCard_body">
        Min Temp: {weatherData.main.temp_min} / {tempScale === "metric" ?'\u2103' : '\u2109'}
      </Typography>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
