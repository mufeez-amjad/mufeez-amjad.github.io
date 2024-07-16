import { Route, Routes } from 'react-router-dom';
import posts from './content';
import { Renderer } from './renderer';
import styled from 'styled-components';
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
            <PageHeader heading={title} subheading={
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{description}</span>
                    <span style={{ color: 'grey' }}>{date}</span>
                </div>
            } />
            <Hero src={hero} alt='hero' />
            <Renderer markdown={content} />
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
`;

const PostContainer = styled.div`
    font-family: 'Red Hat Display';
`;

const Hero = styled.img`
    width: 100%;
    height: auto;
    border-radius: 12px;
    margin-top: 40px;
`;