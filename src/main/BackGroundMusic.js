import { useEffect, useRef, useState, useContext, useCallback, useMemo } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { Context } from "./Home";
import { useSelector, useDispatch } from 'react-redux';
import { musicAllow } from './features/premium/premiumSlice';

const BackgroundMusic = ({ volume = 0.3 }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [showGenre, setShowGenre] = useState(false);
    const dropdownRef = useRef(null);
    const [playlist, setPlaylist] = useState([]);
    const { genreVal, premium } = useContext(Context);
    const allowMusicGenre = useSelector((state) => state.premium.music);
    const dispatch = useDispatch();
    const playlists = useMemo(() => [
        {
            chill: {
                1: '/music/Chill/Aylex - A Positive Direction (freetouse.com).mp3',
                2: '/music/Chill/Aylex - Office (freetouse.com).mp3',
                3: '/music/Chill/Lukrembo - Biscuit (freetouse.com).mp3',
                4: '/music/Chill/Lukrembo - Marshmallow (freetouse.com) (1).mp3',
                5: '/music/Chill/Lukrembo - Travel (freetouse.com).mp3'
            }
        },
        {
            jazz: {
                1: '/music/Jazz/Amine Maxwell & Soyb - Morning Coffee (freetouse.com).mp3',
                2: '/music/Jazz/Aylex - Italy (freetouse.com).mp3',
                3: '/music/Jazz/Aylex - Life is Beautiful (freetouse.com).mp3',
                4: '/music/Jazz/Lukrembo - Sunset (freetouse.com).mp3',
                5: '/music/Jazz/Lukrembo - Wine (freetouse.com).mp3'
            }
        },
        {
            disco: {
                1: '/music/Disco/Burgundy - Dreams of Tomorrow (freetouse.com).mp3',
                2: '/music/Disco/Burgundy - Ignition (freetouse.com).mp3',
                3: '/music/Disco/Burgundy - Mirrorball (freetouse.com).mp3',
                4: '/music/Disco/Burgundy - Tell Me (freetouse.com).mp3',
                5: '/music/Disco/tubebackr - Dream Potion (freetouse.com).mp3'
            }
        },
        {
            sad: {
                1: '/music/Sad/Pufino - Rainy (freetouse.com).mp3',
                2: '/music/Sad/Lukrembo - Boba Tea (freetouse.com).mp3',
                3: '/music/Sad/massobeats - drizzle (freetouse.com).mp3',
                4: '/music/Sad/Ocean Bloom - Mystery (freetouse.com).mp3',
                5: '/music/Sad/Epic Spectrum - Wayfarer (freetouse.com).mp3'
            }
        },
    ], []);

    useEffect(() => {
        if(premium)dispatch(musicAllow());
        else{
            setPlaylist([]);
            dispatch(musicAllow());
        }
    }, [premium, dispatch]);

    // Move getSongsForGenre definition to use useCallback
    const getSongsForGenre = useCallback((genre) => {
        const genreObj = playlists.find(item => item[genre]);
        if (!genreObj) return [];

        setPlaylist(Object.values(genreObj[genre]));
        setCurrentTrackIndex(0);
        setShowGenre(false);
    }, [playlists]);

    useEffect(() => {
        if (genreVal !== 'none') {
            getSongsForGenre(genreVal);
        }
    }, [genreVal, getSongsForGenre]);


    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const handleShowGenre = () => {
        setShowGenre(!showGenre);
    }
    const handleTrackEnd = () => {
        setCurrentTrackIndex((prevIndex) => {
            if (prevIndex >= playlist.length - 1) {
                return 0;
            }
            return prevIndex + 1;
        });
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = playlist[currentTrackIndex];
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log("Playback failed:", e));
            }
        }
    }, [currentTrackIndex, playlist, isPlaying]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowGenre(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const playNext = () => {
        setCurrentTrackIndex((prevIndex) =>
            prevIndex >= playlist.length - 1 ? 0 : prevIndex + 1
        );
    };

    const playPrevious = () => {
        setCurrentTrackIndex((prevIndex) =>
            prevIndex <= 0 ? playlist.length - 1 : prevIndex - 1
        );
    };

    return (
        <div ref={dropdownRef}>
            <div className="fixed bottom-4 right-4 flex items-center gap-2 bg-gray-200 dark:bg-gray-700 p-2 rounded-lg">
                <button
                    onClick={() => handleShowGenre()}
                    className="p-2 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 stroke-white bg-green-400 rounded-full h-7 w-7 p-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </button>
                <button
                    onClick={playPrevious}
                    className="p-2 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="flex flex-row justify-center content-center stroke-white bg-blue-400 rounded-full h-7 w-7 p-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
                    </svg>

                </button>

                <button
                    onClick={() => { if (playlist.length > 0) togglePlay() }}
                    className="p-2 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full"
                >
                    {isPlaying ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="flex flex-row justify-center justify-self-center content-center stroke-white bg-blue-400 rounded-full h-7 w-7 p-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                        </svg>
                        :
                        <div className={`${playlist.length === 0 ? 'cursor-not-allowed disabled' : ''}`}>
                            <Tooltip title={`${playlist.length === 0 ? 'Choose a track' : 'Play'}`} arrow>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                    className={`flex flex-row place-content-center stroke-white bg-blue-400 rounded-full h-7 w-7 p-1`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                                </svg>
                            </Tooltip>
                        </div>
                    }
                </button>

                <button
                    onClick={playNext}
                    className="p-2 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="flex flex-row justify-center content-center stroke-white bg-blue-400 rounded-full h-7 w-7 p-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                    </svg>

                </button>

                <audio
                    ref={audioRef}
                    onEnded={handleTrackEnd}
                    style={{ display: 'none' }}
                />
            </div>
            <Tooltip title={`${premium ? 'Choose a genre' : 'Subscribe to premium to choose a genre !'}`}>
                <div className={`${showGenre ? 'block' : 'hidden'}  bottom-16 right-8 fixed mb-1 w-48 bg-white border text-black border-gray-300 rounded-lg shadow-lg z-10`}>
                    <ul className="py-1">
                        <li onClick={() => { if (allowMusicGenre && premium) getSongsForGenre('chill') }} className={`${allowMusicGenre ? 'cursor-pointer' : 'cursor-not-allowed'} px-4 py-2 hover:bg-gray-100 `}>Chill</li>
                        <li onClick={() => { if (allowMusicGenre && premium) getSongsForGenre('jazz') }} className={`${allowMusicGenre ? 'cursor-pointer' : 'cursor-not-allowed'} px-4 py-2 hover:bg-gray-100 `}>Jazz</li>
                        <li onClick={() => { if (allowMusicGenre && premium) getSongsForGenre('disco') }} className={`${allowMusicGenre ? 'cursor-pointer' : 'cursor-not-allowed'} px-4 py-2 hover:bg-gray-100 `}>Disco</li>
                        <li onClick={() => { if (allowMusicGenre && premium) getSongsForGenre('sad') }} className={`${allowMusicGenre ? 'cursor-pointer' : 'cursor-not-allowed'} px-4 py-2 hover:bg-gray-100 `}>Sad</li>
                    </ul>
                </div>
            </Tooltip>
        </div>
    );
};

export default BackgroundMusic;
