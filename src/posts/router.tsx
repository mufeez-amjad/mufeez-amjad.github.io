import { Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import posts from './content';
import { Renderer } from './renderer';
import { PageHeader } from '../components/PageHeader';

export function PostsRouter() {
    return (
        <Container>
            <Routes>
                {posts.map(p => (
                    <Route key={p.slug} path={`/${p.slug}`} element={<Post {...p} />} />
                ))}
            </Routes>
        </Container>
    )
}

type PostProps = typeof posts[number];

const Post = (props: PostProps) => {
    const { hero, content, title, description, date } = props;

    return (
        <PostContainer>
            <div>
                <Helmet>
                    <title>{title}</title>
                    <meta property="og:title" data-react-helmet="true" content={title} />
                    <meta property="og:description" data-react-helmet="true" content={description} />
                    <meta property="og:image" data-react-helmet="true" content={`https://mufeezamjad.me/${hero}`} />
                </Helmet>
                <PageHeader heading={title} subheading={
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
                        <span>{description}</span>
                        <span style={{ color: 'grey', textAlign: 'right' }}>{date}</span>
                    </div>
                } />
                <Hero src={hero} alt='hero' />
                <Renderer markdown={content} />
            </div>
        </PostContainer>
    )
}

const Container = styled.div`
    height: calc(100% - 40px);
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px 0;
    box-sizing: border-box;

    transition: all 0.3s ease-in-out;

    @media (max-width: 768px) {
        width: 100%;
        padding: 20px;
    }

    @media (max-width: 1200px) {
        width: 100%;
        padding: 60px;
    }
`;

const PostContainer = styled.div`
    font-family: 'Red Hat Display';
    width: 100%;
    max-width: 100%;

    @media (max-width: 768px) {
        max-width: 100%;
    }

    @media (max-width: 1200px) {
        width: 100%;
    }
`;

const Hero = styled.img`
    width: 100%;
    height: auto;
    border-radius: 12px;
    margin-top: 40px;
`;