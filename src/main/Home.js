import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { SunnyDay } from "./SunnyDay";
import { Rain } from "./Rain";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { UserNamePrompt } from "./UserNameInput";
import { createContext } from "react";
import BackgroundMusic from "./BackGroundMusic";


export const Context = createContext();
export const Home = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [userName, setUserName] = useState('UserName');
    const [isUserNameSet, setIsUserNameSet] = useState(false);
    const [weatherVal, setWeatherVal] = useState('none');
    const [genreVal, setGenreVal] = useState('none');
    const [theme, setTheme] = useState('none');
    const [premium, setPremium] = useState(false);
    const aboutRef = useRef(null);
    const location = useLocation();
    const navigation = useNavigate();
    const themes = {
        sunset: 'bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500',
        ocean: 'bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-500',
        forest: 'bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600',
        midnight: 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500',
        golden: 'bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400'
    };

    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setDarkMode(true);
        }
    }, []);

    useEffect(() => {
        if (userName !== 'Premium user1') {
            setPremium(false);
        }
    }, [userName]);

    const handleSetPremium = () => {
        setPremium(!premium);
        setUserName('Premium user1');
    }

    const handleSetWeatherVal = (val) => {
        setWeatherVal(val);
    }
    const handleSetGenreVal = (val) => {
        setGenreVal(val);
    }
    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    let handleAboutMe = () => {
        if (location.pathname !== "/") {
            navigation("/");
            setTimeout(() => {
                aboutRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 500)
        }
        else {
            aboutRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    return (
        <div className={`${themes[theme.toLowerCase()]}`}>
            <Context.Provider value={{
                aboutRef, userName, handleSetWeatherVal, handleSetGenreVal,
                genreVal, setTheme, themes, handleSetPremium, premium, toggleDarkMode
            }}>
                <div className={`${darkMode ? 'dark' : ''} overflow-hidden `}>
                    {weatherVal.toLowerCase() === 'sunny' && <SunnyDay />}
                    {weatherVal.toLowerCase() === 'rainy' && <Rain />}
                    {isUserNameSet === false && <UserNamePrompt userName={userName} setUserName={setUserName} setIsUserNameSet={setIsUserNameSet} />}
                    <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} handleAboutMe={handleAboutMe}
                        userName={userName} setIsUserNameSet={setIsUserNameSet} />
                    <div className="bg-black/10 dark:bg-gray-800">
                        <Outlet context={{ aboutRef, userName }} />
                    </div>
                    <BackgroundMusic />
                </div>
            </Context.Provider>
        </div>
    );
}