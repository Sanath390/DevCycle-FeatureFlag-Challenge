// Article.js
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateArticle } from './features/articles/articlesSlice';

export const Article = ({ articleData }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(articleData.title);
    const [content, setContent] = useState(articleData.content);
    const [imageUrl, setImageUrl] = useState(articleData.image);

    const handleSave = () => {
        dispatch(updateArticle({
            id: articleData.id,
            title,
            content,
            image: imageUrl
        }));
        setIsEditing(false);
    };

    return (
        <div className="article flex flex-col h-[20rem] border-2 border-gray-500 w-[20rem] rounded-xl p-4">
            {isEditing ? (
                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border p-2 rounded dark:bg-gray-700"
                        placeholder="Article Title"
                    />
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="border p-2 rounded dark:bg-gray-700"
                        placeholder="Image URL"
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="border p-2 rounded flex-grow dark:bg-gray-700"
                        placeholder="Article content..."
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={handleSave}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start mb-2">
                        <h2 className="text-xl font-bold">{articleData.title}</h2>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="font-bold text-white hover:text-black"
                        >
                            Edit
                        </button>
                    </div>
                    {articleData.image && (
                        <img 
                            src={articleData.image} 
                            alt={articleData.title}
                            className="w-full h-32 object-cover rounded mb-2"
                        />
                    )}
                    <p className="flex-grow overflow-auto">{articleData.content}</p>
                    <p className="text-sm text-gray-500 mt-2">{articleData.date}</p>
                </div>
            )}
        </div>
    );
};
