// PhotoViewer.js
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectPhotos } from './features/photos/photosSlice';

export const PhotoViewer = ({ photoId, onClose }) => {
    const photos = useSelector(selectPhotos);
    const photo = photos.find(p => p.id === photoId);
    const [isZoomed, setIsZoomed] = useState(false);

    if (!photo) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
            <div className="relative max-w-[90vw] max-h-[90vh]">
                <img 
                    src={photo.url} 
                    alt={`Viewing ${photo.id}`}
                    className={`max-w-full max-h-[90vh] object-contain cursor-pointer transition-transform duration-300 ${
                        isZoomed ? 'scale-150' : 'scale-100'
                    }`}
                    onClick={() => setIsZoomed(!isZoomed)}
                />
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-full"
                >
                    Close
                </button>
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded">
                    {photo.date}
                </div>
            </div>
        </div>
    );
};
