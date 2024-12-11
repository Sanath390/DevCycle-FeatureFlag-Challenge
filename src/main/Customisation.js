import { useState, useRef, useEffect, useContext } from "react"
import { Context } from "./Home";
import { Tooltip } from "@mui/material";

export const Customisation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [weather, setWeather] = useState(false);
    const [music, setMusic] = useState(false);
    const { handleSetWeatherVal, handleSetGenreVal, premium } = useContext(Context);
    const dropdownRef = useRef(null);
    const handleOpen = () => {
        setIsOpen(!isOpen)
        if (weather) setWeather(!weather)
        if (music) setMusic(!music)
    }
    const handleWeather = () => {
        setWeather(!weather);
        if (music) setMusic(!music)
    }
    const handleMusic = () => {
        setMusic(!music);
        if (weather) setWeather(!weather)
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
                setWeather(false)
                setMusic(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])
    return (
        <div ref={dropdownRef}>
            <button onClick={handleOpen} className="border-2 border-green-400 bg-green-500 text-white rounded-xl p-1">
                Customise
            </button>
            <div className={`${isOpen ? 'block' : 'hidden'} absolute mt-2 w-48 bg-white border text-black border-gray-300 rounded-lg shadow-lg z-10`}>
                <ul className="py-1">
                    <li onClick={handleWeather} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Weather</li>
                    <li onClick={handleMusic} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Music Tracks</li>
                </ul>
            </div>
            <div className={`${weather ? 'block' : 'hidden'} left-[745px] absolute mt-2 w-48 bg-white border text-black border-gray-300 rounded-lg shadow-lg z-10`}>
                <ul className="py-1">
                    <li onClick={() => handleSetWeatherVal('sunny')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Sunny</li>
                    <li onClick={() => handleSetWeatherVal('rainy')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Rainy</li>
                    <li onClick={() => handleSetWeatherVal('none')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">None</li>
                </ul>
            </div>
            <Tooltip title={`${premium ? 'Choose a genre' : 'Subscribe to premium to choose a genre !!!'}`} placement="top">
                <div className={`${music ? 'block' : 'hidden'} left-[745px] top-[92px] absolute mt-2 w-48 bg-white border text-black border-gray-300 rounded-lg shadow-lg z-10`}>
                    <ul className="py-1">
                        <li onClick={() => {if(premium)handleSetGenreVal('chill');}} className={`${premium?'cursor-pointer':'cursor-not-allowed'} px-4 py-2 hover:bg-gray-100 `}>Chill</li>
                        <li onClick={() => {if(premium)handleSetGenreVal('jazz');}} className={`${premium?'cursor-pointer':'cursor-not-allowed'} px-4 py-2 hover:bg-gray-100 `}>Jazz</li>
                        <li onClick={() => {if(premium)handleSetGenreVal('disco');}} className={`${premium?'cursor-pointer':'cursor-not-allowed'} px-4 py-2 hover:bg-gray-100 `}>Disco</li>
                        <li onClick={() => {if(premium)handleSetGenreVal('sad');}} className={`${premium?'cursor-pointer':'cursor-not-allowed'} px-4 py-2 hover:bg-gray-100 `}>Sad</li>
                    </ul>
                </div>
            </Tooltip>
        </div>
    )
}