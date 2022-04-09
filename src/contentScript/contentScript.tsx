
import React, { useState, useEffect} from 'react'
import ReactDOM  from 'react-dom'
import WeatherCard from '../components/WeatherCard'
import { Card } from "@mui/material";
import './contentScript.css'
import { getStorageOptions, LocalStorageOptions } from '../utils/storage';
import { Message } from "../utils/message";

const App:React.FC<{}> = () =>{
    const [options, setOptions]= useState<LocalStorageOptions | null>(null)
    const [isActive, setIsActive] = useState<boolean>(true)

    useEffect(() => {
        getStorageOptions().then((options) => {
             setOptions(options)
             setIsActive(options.hasAutoOverlay)
            })
    },[])


    useEffect(() =>{
        chrome.runtime.onMessage.addListener((msg) =>{
            if(msg === Message.TOGGLE_OVERLAY){
                setIsActive(!isActive)
            }
        })
    },[isActive])

    if(!options) return null



    return (
    <>
    {isActive && (
        <Card className='overlyCard'>
        <WeatherCard  city={options.homCity} tempScale={options.tempScale} onDelete={() => setIsActive(!isActive)}/>
        </Card>
    )}
    </>
    )
}

const root =document.createElement("div")
document.body.appendChild(root)
ReactDOM.render(<App/>, root)


