import React, {useEffect, useState} from "react";
import {getLatestPosts, getMostViewedArticles} from "../../services/postService";
import NoPostsFound from "../../components/BlogList/NoPostsFound";
import BlogList from "../../components/BlogList/BlogList";
import CollapsiblePanel from "../../components/CollapsiblePanel/collapsiblePanel";
import "react-loading-skeleton/dist/skeleton.css";
import FeaturedBlog from "../../components/FeaturedBlog/FeaturedBlog";
import CategoriesList from "../../components/categoriesList/categoriesList";
import SearchCard from "../../components/Articles/searchCard/SearchCard";

function Home() {
    const [latestArticles, setLatestArticles] = useState([]);
    const [mostViewedArticles, setMostViewedArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [latest, mostViewed] = await Promise.all([
                    getLatestPosts(),
                    getMostViewedArticles(),
                ]);
                setLatestArticles(latest);
                setMostViewedArticles(mostViewed);

            } catch (err) {
                setError("Failed to fetch articles. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (

        <div className=" p-3">
            <FeaturedBlog/>
            <div className="row">
                <div className="col-12 col-md-9" >
                    <CollapsiblePanel title="Latest Articles">
                        {latestArticles.length === 0 ? <NoPostsFound/> :
                            <BlogList showSeeAll={true} posts={latestArticles}/>}

                    </CollapsiblePanel>

                    <CollapsiblePanel title="Most Viewed Articles">
                        {mostViewedArticles.length === 0 ? <NoPostsFound/> :
                            <BlogList showSeeAll={true} posts={mostViewedArticles}/>}

                    </CollapsiblePanel>

                </div>
                <div className="col-12 col-md-3">
                    <SearchCard/>
                    <CategoriesList/>
                </div>
            </div>
        </div>

    );
}

export default Home;
