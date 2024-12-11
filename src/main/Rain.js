import { useEffect, useState } from "react";
import '../Rain.css';

export const Rain = () => {
    const [lightning, setLightning] = useState(false);

    useEffect(() => {
        const createLightningSequence = () => {
            if (Math.random() >= 0.91) { 
                setLightning(true);
                setTimeout(() => {
                    setLightning(false);
                    // Second flash
                    setTimeout(() => {
                        setLightning(true);
                        setTimeout(() => {
                            setLightning(false);
                        }, 50);
                    }, 100);
                }, 100);
            }
        };

        const interval = setInterval(createLightningSequence, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div>
            <div className={`lightning-flash absolute top-0 left-0 w-full h-full pointer-events-none ${lightning ? 'opacity-30' : 'opacity-0'
                }`} />
            <div className="rain-container absolute top-0 left-0 w-full h-full pointer-events-none">
                {[...Array(100)].map((_, i) => (
                    <div key={i} className="rain-drop" style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${0.5 + Math.random() * 0.3}s`
                    }} />
                ))}
            </div>
        </div>
    );
};
