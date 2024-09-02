import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {getPost, incrementViews} from "../../../services/postService";
import LoadingOverlay from "../../../components/LoadingOverlay/loadingOverlay";
import frontendRoute from "../../../utils/frontendRoute";
import Breadcrumb from "../../../utils/breadcrumb";
import route from "../../../utils/route";

function FullArticle() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);



    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPost(id);
                await incrementViews(id);

                setArticle(data);
            } catch (error) {
                console.error('Failed to fetch post:', error);
            }
        };
        fetchPost();
    }, []);

    if (!article) {
        return <LoadingOverlay/>;
    }

    const breadcrumbItems = [
        {name: 'Home', href: frontendRoute('home')},
        {name: 'Articles', href: frontendRoute('articles') },
        {name: article.title, active: true}
    ];


    return (

        <div>
            <Breadcrumb items={breadcrumbItems}/>
            <div className="row">
                <div className="col-8">
                    <article>
                        <header className="mb-4">
                            <h1 className="fw-bolder mb-1">
                                {article.title}
                            </h1>
                            <div className="text-muted fst-italic mb-2">
                                {article.description ?? "Posted on January 1, 2023 by Start Bootstrap"}

                            </div>
                            {
                                article.categories.map((category, index) => (
                                    <Link to={frontendRoute('categoryArticles' , {
                                        id:category.id,name:category.name
                                    })} key={index} className="badge badge-info  text-decoration-none mr-1" >
                                        {category.name}
                                    </Link>
                                ))
                            }
                        </header>
                        <figure className="mb-4">


                            <img
                                className="img-fluid rounded"
                                src={route('streamImage' , {
                                    'image' :article.articleImage.filePath
                                })}

                                alt="Post preview"
                            />
                        </figure>
                        <section dangerouslySetInnerHTML={{__html: article.content}} className="mb-5">


                        </section>
                    </article>
                </div>
                <div className="col-4">
                    <div className="card mb-4">
                        <div className="card-header">Search</div>
                        <div className="card-body">
                            <div className="input-group">
                                <input className="form-control" type="text" placeholder="Enter search term..."
                                       aria-label="Enter search term..." aria-describedby="button-search"/>
                                <button className="btn btn-primary" id="button-search" type="button">Go!</button>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <div className="card-header">Categories</div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-6">
                                    <ul className="list-unstyled mb-0">
                                        <li><a href="#!">Web Design</a></li>
                                        <li><a href="#!">HTML</a></li>
                                        <li><a href="#!">Freebies</a></li>
                                    </ul>
                                </div>
                                <div className="col-sm-6">
                                    <ul className="list-unstyled mb-0">
                                        <li><a href="#!">JavaScript</a></li>
                                        <li><a href="#!">CSS</a></li>
                                        <li><a href="#!">Tutorials</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default FullArticle;