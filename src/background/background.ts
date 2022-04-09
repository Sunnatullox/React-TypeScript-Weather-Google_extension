import { setStoredCities, setStoredOptions, getStorageCities, getStorageOptions } from '../utils/storage'
import { fetchOpenWeatherData } from '../utils/api'


// TODO: background script
chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([])
  setStoredOptions({
    hasAutoOverlay:false,
    homCity:"",
    tempScale:'metric'
  })

  chrome.contextMenus.create({
    contexts:['selection'],
    title:"Add city to weather extension",
    id:"weatherExtension"
  })

  chrome.alarms.create({
    periodInMinutes: 0.1 / 6 
  })
})

chrome.contextMenus.onClicked.addListener((event) =>{
  getStorageCities().then(city => {
    setStoredCities([...city, event.selectionText])
  })
})


chrome.alarms.onAlarm.addListener(() =>{
  getStorageOptions().then((options) =>{
    if(options.homCity === ''){
      return
    }
    fetchOpenWeatherData(options.homCity, options.tempScale).then(data =>{
      const temp = Math.round(data.main.temp)
      const simbol = options.tempScale === "metric" ? "\u2103" : "\u2109"
      chrome.action.setBadgeText({
        text:`${temp}${simbol}`
      })
    })
  })
})
