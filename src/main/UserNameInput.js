import { useContext, useEffect, useState, useCallback } from "react";
import { Context } from "./Home";
import { OpenFeature } from "@openfeature/react-sdk";
import { useDispatch, useSelector } from "react-redux";
import { themesCount } from "./features/premium/premiumSlice";
import { Tooltip } from "@mui/material";

export const UserNamePrompt = ({ userName, setUserName, setIsUserNameSet }) => {
    const { setTheme, themes, handleSetWeatherVal, handleSetGenreVal } = useContext(Context);
    const openFeatureClient = OpenFeature.getClient();
    const dispatch = useDispatch();
    const themesCountVal = useSelector((state) => state.premium.themes);
    const [comparison, setComparison] = useState(false);
    const [mood, setMood] = useState('');
    const getFeatures = useCallback(async () => {
        await OpenFeature.setContext({
            user_id: `${userName}` || 'Username',
            customData: {
                [`mood-${mood}`]: 'true',
            }
        })
        let themesFlag = await openFeatureClient.getStringValue('themes', '1');
        let theme = await openFeatureClient.getStringValue('theme', 'none');
        let music = await openFeatureClient.getBooleanValue('music', 'none');
        let weather = await openFeatureClient.getStringValue('weather', 'none');
        handleSetWeatherVal(weather);
        handleSetGenreVal(music);
        if(themesCountVal === 0)setTheme(theme);  
        if (themesFlag === '1') themesFlag = Number(themesFlag);
        else themesFlag = 1e10;
        setComparison(themesFlag <= themesCountVal);
    }, [userName, themesCountVal, openFeatureClient, handleSetWeatherVal, handleSetGenreVal, setTheme, mood]);

    useEffect(() => {
        getFeatures();
    }, [getFeatures]);

    const handleSubmit = () => {
        setIsUserNameSet(true);
    }

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            setIsUserNameSet(true);
        }
    }

    return (
        <div className="z-50 min-h-screen fixed top-0 left-0 right-0 backdrop-blur-sm flex items-center justify-center"
            onClick={handleBackdropClick}>
            <div className="bg-white p-8 rounded-lg shadow-xl w-96">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome!</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        What's your name?
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your name"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        How are you feeling today?
                    </label>
                    <div className={`grid grid-cols-2 gap-2`}>
                        <button onClick={() => { setMood('happy'); }} className={`border text-white border-gray-300 bg-green-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-200 hover:opacity-80`}>Happy 😀</button>
                        <button onClick={() => { setMood('sad'); }} className={`border text-white border-gray-300 bg-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-200 hover:opacity-80`}>Sad 😔</button>
                    </div>
                </div>
                <div className={`mb-4 font-bold text-center`}>
                    OR
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Choose your favorite theme and customize:
                    </label>

                    {/* <div onClick={dispatch(themesCount())}> */}
                    <Tooltip title={`${(comparison) ? 'Subscribe to premium for other themes' : 'You can choose only one theme!'}`} placement="top">
                        <div className={`grid grid-cols-2 gap-2 `}>

                            <button
                                className={`${themes.sunset} ${comparison ? 'pointer-events-none' : ''} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-200 hover:opacity-80`}
                                onClick={() => { setTheme('Sunset'); dispatch(themesCount()) }}
                            >
                                Sunset
                            </button>

                            <button
                                className={`${themes.ocean} ${comparison ? 'pointer-events-none' : ''} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-200 hover:opacity-80`}
                                onClick={() => { setTheme('Ocean'); dispatch(themesCount()) }}
                            >
                                Ocean
                            </button>
                            <button
                                className={`${themes.forest} ${comparison ? 'pointer-events-none' : ''} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-200 hover:opacity-80`}
                                onClick={() => { setTheme('Forest'); dispatch(themesCount()) }}
                            >
                                Forest
                            </button>
                            <button
                                className={`${themes.midnight} ${comparison ? 'pointer-events-none' : ''} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-200 hover:opacity-80`}
                                onClick={() => { setTheme('Midnight'); dispatch(themesCount()) }}
                            >
                                Midnight
                            </button>
                            <button
                                className={`${themes.golden} ${comparison ? 'pointer-events-none' : ''} text-white font-bold py-2 col-span-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-200 hover:opacity-80`}
                                onClick={() => { setTheme('Golden'); dispatch(themesCount()) }}
                            >
                                Golden
                            </button>

                        </div>
                    </Tooltip>

                    {/* </div> */}
                </div>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-colors duration-200"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
