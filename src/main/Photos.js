import { useCallback, useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPhotos, removePhoto, clearPhotos, selectPhotos } from './features/photos/photosSlice';
import { PhotoViewer } from './PhotoViewer';
import { OpenFeature } from '@openfeature/react-sdk';
import { Context } from './Home';

export const Photos = () => {
    const dispatch = useDispatch();
    const photos = useSelector(selectPhotos);
    const [selectedPhotoId, setSelectedPhotoId] = useState(null);
    const client = OpenFeature.getClient();
    const [photoFlag, setPhotoFlag] = useState('');
    const { premium } = useContext(Context);

    const getPhotoFlag = useCallback(async () => {
        let result = await client.getBooleanValue("photos", "3");
        if (result === 'unlimited' || premium) setPhotoFlag(1e10);
        else setPhotoFlag(Number(result));
    }, [client, premium]);

    useEffect(() => {
        getPhotoFlag();
    }, [getPhotoFlag]);

    useEffect(() => {
        if(!premium) dispatch(clearPhotos());
    },[premium,dispatch]);


    const handleFileUpload = useCallback((event) => {
        const files = Array.from(event.target.files);
        const filePromises = files.map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsDataURL(file);
            });
        });

        Promise.all(filePromises)
            .then(photoUrls => {
                let len = photos.length;
                if (photoFlag === 3 && len < photoFlag) {
                    dispatch(addPhotos(photoUrls.slice(0, photoFlag - len)));
                }
                else if (photoFlag > 3) dispatch(addPhotos(photoUrls));
            });
    }, [dispatch, photoFlag, photos.length]);

    const handleRemovePhoto = (photoId) => {
        dispatch(removePhoto(photoId));
    };

    return (
        <div className="container mx-auto max-w-7xl p-5 mt-[3.5rem] min-h-[calc(100dvh-3.5rem)] w-[100dvw] overflow-y-auto">
            <div className="mb-5 text-center">
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="cursor-pointer border-2 border-dashed border-gray-300 rounded-md p-2.5 hover:border-gray-400 transition-colors duration-300"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
                {photos.map((photo) => (
                    <div
                        key={photo.id}
                        className="relative group pb-[100%] overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-[1.02]"
                        onClick={() => setSelectedPhotoId(photo.id)}
                    >
                        <img
                            src={photo.url}
                            alt={`Upload ${photo.id}`}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <button
                                onClick={() => handleRemovePhoto(photo.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                            >
                                Remove
                            </button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {photo.date}
                        </div>
                    </div>
                ))}
            </div>
            {selectedPhotoId && (
                <PhotoViewer
                    photoId={selectedPhotoId}
                    onClose={() => setSelectedPhotoId(null)}
                />
            )}
        </div>
    );
};
