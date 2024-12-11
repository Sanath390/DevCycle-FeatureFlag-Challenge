import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setCoverPhoto, setTextInput, selectCoverPhoto, selectTextInput } from './features/userData/userDataSlice';

export const CoverPhoto = ({ isEditing, setIsEditing, aboutMe, setAboutMe }) => {
    let { userName } = useOutletContext();
    const [selectedImage, setSelectedImage] = useState(null);
    const [imgUrl, setImgUrl] = useState('');
    const [showUrlInput, setShowUrlInput] = useState(false);
    const dispatch = useDispatch();
    const coverPhoto = useSelector(selectCoverPhoto);
    const textInput = useSelector(selectTextInput);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
                dispatch(setCoverPhoto(e.target.result));
            };
            reader.readAsDataURL(file);
        }
    };
    const handleUrlChange = (e) => {
        setImgUrl(e.target.value);
        dispatch(setCoverPhoto(e.target.value));
        setSelectedImage(null);
    };

    return (
        <div className="flex flex-row h-[calc(100dvh-3.5rem)] w-[100dvw] mt-[3.5rem] dark:bg-gray-800 dark:text-white">
            <div className="flex flex-col  w-[50dvw] ml-10 mt-10">
                <div className="self-center">
                    <div className="font-montserrat font-medium uppercase text-5xl">The Personal blog of</div>
                    <div className="font-bokor font-bold text-[8rem] w-[100dvh] truncate">{userName}</div>
                </div>
                <div className="self-center mt-10 w-[60dvh] h-[10dvh]">
                    {isEditing ? (
                        <textarea
                            value={textInput}
                            onChange={(e) => {setAboutMe(e.target.value); dispatch(setTextInput(e.target.value));}}
                            onBlur={() => setIsEditing(false)}
                            autoFocus
                            className="w-full p-2 text-sm font-montserrat font-medium text-center 
                       border rounded-lg focus:outline-none focus:ring-2 
                       focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600
                       min-h-[100px] resize-none"
                            placeholder="Write something about yourself..."
                        />
                    ) : (
                        <div
                            onClick={() => setIsEditing(true)}
                            className="text-ellipsis truncate cursor-pointer font-montserrat 
                     font-medium text-sm text-center hover:bg-gray-100 
                     dark:hover:bg-gray-700 rounded-lg p-2 transition-colors
                     h-full w-full"
                        >
                            {textInput? textInput : "Write something about yourself..."}
                        </div>
                    )}
                </div>
            </div>
            <div className="bg-cover bg-no-repeat bg-center rounded-full h-[calc(100dvh-3.5rem)] w-[50dvw]" style={{ backgroundImage: `url(${coverPhoto})` }}>
                <div className="h-full w-full p-2">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="imageUpload"
                        onClick={(e) => e.stopPropagation()}
                    />
                    {(selectedImage || imgUrl || coverPhoto) && <button
                        onClick={() => { setSelectedImage(null); setImgUrl(''); dispatch(setCoverPhoto('')); }}
                        className="font-bold text-xl bg-red-500 hover:bg-red-600 text-white 
                        h-7 w-7 rounded-xl transition-colors flex flex-col items-center justify-center
                        transform ease-in-out hover:scale-110 hover:-translate-y-[1px] place-self-end mr-6">
                        X
                    </button>}
                    {!(selectedImage || imgUrl || coverPhoto) && (
                        <div className="transform flex flex-col items-center justify-center gap-4 h-full w-full">
                            <label
                                htmlFor="imageUpload"
                                className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                Choose Photo
                            </label>

                            <button
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                                onClick={() => setShowUrlInput(!showUrlInput)}
                            >
                                Enter Image URL
                            </button>

                            {showUrlInput && (
                                <input
                                    type="url"
                                    value={imgUrl}
                                    onChange={handleUrlChange}
                                    placeholder="Enter image URL"
                                    className="mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}