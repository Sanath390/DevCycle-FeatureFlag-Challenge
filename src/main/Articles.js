import { Article } from "./Article";
import { useDispatch, useSelector } from "react-redux";
import { addArticle, removeLastArticle, selectArticles,clearArticles } from "./features/articles/articlesSlice";
import { articlesAdd, articlesRemove } from "./features/premium/premiumSlice";
import { useEffect, useState, useCallback, useContext } from "react";
import { OpenFeature } from "@openfeature/react-sdk";
import { Context } from "./Home";

export const Articles = () => {
    const dispatch = useDispatch();
    const articles = useSelector(selectArticles);
    const articlesPremium = useSelector((state) => state.premium.articles);
    const client = OpenFeature.getClient();
    const [comparison, setComparison] = useState(true);
    const [flag, setFlag] = useState('');
    const { userName, premium } = useContext(Context);

    const getArticleFlag = useCallback(async () => {
        let result = await client.getBooleanValue("articles", "3");
        if (result === 'unlimited' || premium) setFlag(1e10);
        else setFlag(Number(result));
        setComparison(Number(flag) > articlesPremium);
    }, [client, flag, articlesPremium, premium]);

    useEffect(() => {
        getArticleFlag();
    }, [getArticleFlag, userName]);

    useEffect(() => {
        if(!premium)dispatch(clearArticles());
    }, [premium,dispatch]);

    const handleAdd = () => {
        dispatch(addArticle());
    };

    const handleRemove = () => {
        dispatch(removeLastArticle());
    };

    return (
        <div className="min-h-[calc(100dvh-3.5rem)] w-[100dvw] mt-[3.5rem] p-2 
            dark:bg-gray-800 dark:text-white font-montserrat overflow-y-auto">
            <div>
                <button
                    onClick={() => { handleAdd(); dispatch(articlesAdd()) }}
                    className={`${comparison ? '' : 'pointer-events-none cursor-not-allowed'} border-2 border-green-400 bg-green-500 text-white 
                        rounded-xl p-1 font-bold h-9 w-[4rem] ml-2`}
                >
                    +Add
                </button>
                <button
                    onClick={() => { handleRemove(); dispatch(articlesRemove()) }}
                    className="border-2 border-green-400 bg-green-500 text-white 
                        rounded-xl p-1 font-bold h-9 w-[6rem] ml-2"
                >
                    +Remove
                </button>
            </div>
            <div id="articles" className="grid grid-cols-4 gap-4 mt-4">
                {articles.map((articleData) => (
                    <Article
                        key={articleData.id}
                        articleData={articleData}
                    />
                ))}
            </div>
        </div>
    );
};
