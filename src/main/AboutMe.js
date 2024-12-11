import { CoverPhoto } from "./CoverPhoto";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { selectTextInput } from "./features/userData/userDataSlice";

export const AboutMe = () => {
    let {aboutRef} = useOutletContext();
    const [isEditing, setIsEditing] = useState(false);
    const [aboutMe, setAboutMe] = useState("Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, eaque. Quod, quibusdam?");
    const textInput = useSelector(selectTextInput);

    return (
        <div>
            <CoverPhoto isEditing={isEditing} setIsEditing={setIsEditing} aboutMe={aboutMe} setAboutMe={setAboutMe} />
            <div ref={aboutRef} id="about-me" className="flex flex-col items-center h-[calc(100dvh-3.5rem)] w-[100dvw] mt-[3.5rem] p-2
        dark:bg-gray-800 dark:text-white font-montserrat font-medium ">
                <div className="uppercase font-bold text-[4rem] ">
                    About Me
                </div>
                <div className=" text-[1rem] p-10 mt-[3rem]">
                    <div className="flex flex-col place-items-center gap-4 text-center ">
                        <div className="text-balance">
                            {textInput}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}