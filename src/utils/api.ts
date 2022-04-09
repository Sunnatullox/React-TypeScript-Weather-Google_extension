const OPEN_WEATHER_API_KEY= '05b9fab091a8c3649cb86aa21968da56';

export interface OpenWeatherData {
    name:string
    main:{
        feels_like:number
        humidity:number
        pressure:number
        temp:number
        temp_max:number
        temp_min:number
    }
    weather:{
        description:string
        icon:string
        id:number
        main:string
    }[]
    wind:{
        deg:number
        speed:number
    }
}

export type OpenWeatherTemScale = 'metric' | 'imperial'

export async function fetchOpenWeatherData(sity:string, tempScale:OpenWeatherTemScale):Promise<OpenWeatherData> {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${sity}&units=${tempScale}&appid=${OPEN_WEATHER_API_KEY}`)
    if(!res.ok) throw new Error("City not found")

    const data = await res.json()
    return data 
}


export function getWeatherIconSrc(iconCode:string){
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`
}
