import { Link } from "react-router-dom";
import { Customisation } from "./Customisation";
import { useContext } from "react";
import { Context } from "./Home";

export const Navbar = ({ toggleDarkMode, darkMode, handleAboutMe, userName, setIsUserNameSet }) => {
    let username = userName;
    const { handleSetPremium } = useContext(Context);
    const handleUserName = () => {
        setIsUserNameSet(false);
    }
    let theme = 'bg-white';
    return (
        <div className={`fixed z-10 top-0 left-0 right-0 ${theme} dark:bg-gray-900`}>
            <div className="p-2 h-14 border-2 flex flex-row items-center dark:bg-gray-800 dark:border-gray-700">
                <div>
                    <button onClick={handleSetPremium} className="border-2 rounded-xl p-1 cursor-pointer flex flex-row h-9 w-32 font-montserrat font-bold text-sm
                        dark:bg-gray-700 bg-[#E0BE36] hover:bg-[#C5A31E] text-white justify-center items-center
                         hover:scale-[1.02] dark:border-gray-600 dark:text-white">
                        Go Premium
                    </button>
                </div>
                <div className="flex flex-row ml-24 font-montserrat font-medium gap-8 text-lg items-center dark:text-white">
                    <div onClick={handleAboutMe} className="cursor-pointer">About Me</div>
                    <Link to="/articles"><div className="cursor-pointer">Articles</div></Link>
                    <Link to="/photos"><div className="cursor-pointer">Photos</div></Link>
                    <Customisation />
                </div>
                <div onClick={handleUserName} className="cursor-pointer flex flex-row mx-auto font-bokor font-extralight text-[2.2rem] dark:text-white">
                    <div>{username}</div>
                </div>
                <button
                    onClick={toggleDarkMode}
                    className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    {darkMode ? (
                        // Sun icon for light mode
                        <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        // Moon icon for dark mode
                        <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
};