import { Route, Routes } from 'react-router-dom';
import posts from './content';
import { Renderer } from './renderer';
import styled from 'styled-components';

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
    const { hero, content, title, description } = props;

    return (
        <PostContainer>
            <Heading>{title}</Heading>
            <SubHeading>{description}</SubHeading>
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

const Heading = styled.h1`
    font-size: 20px;
`;

const SubHeading = styled.h2`
    font-size: 16px;
    font-weight: 300;
`;

const Hero = styled.img`
    width: 100%;
    height: auto;
    border-radius: 12px;
    margin-top: 40px;
`;