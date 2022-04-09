import { OpenWeatherTemScale } from "./api"

export interface LocalStorage{
    cities?: string[],
    options?: LocalStorageOptions
}

export interface LocalStorageOptions {
    hasAutoOverlay:boolean,
    homCity:string,
    tempScale: OpenWeatherTemScale
}

export type LocalStorageKeys = keyof LocalStorage


export  function setStoredCities(cities:string[]):Promise<void>{
    const value: LocalStorage = {
        cities
    }
    return new Promise((resolve) => {
        chrome.storage.local.set(value, () => resolve())
    })
} 

export function getStorageCities(): Promise<string[]>{
    const keys:LocalStorageKeys[]=["cities"]
    return new Promise((resolve) =>{
        chrome.storage.local.get(keys,(result:LocalStorage) =>{
            resolve(result.cities ?? [])
        })
    })
}

export function setStoredOptions(options: LocalStorageOptions):Promise<void>{
    const value : LocalStorage={
        options
    }
    return new Promise((resolve) => {
        chrome.storage.local.set(value,() =>{
            resolve()
        })
    })
}


export function getStorageOptions():Promise<LocalStorageOptions>{
    const keys:LocalStorageKeys[] = ['options']
    return new Promise((resolve) =>{
        chrome.storage.local.get(keys, (result:LocalStorage) => {
            resolve(result.options)
        })
    })
}