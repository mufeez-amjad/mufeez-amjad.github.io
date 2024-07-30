import styled from "styled-components";
import { MainHeader } from "../components/MainHeader";

export function BlogPage() {
    return (
        <Container>
            <MainHeader />
            <div>
                <Text>Work in progress...</Text>
            </div>
        </Container>
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

const Text = styled.p`
    font-family: 'Red Hat Display';
    font-size: 16px;
    line-height: 1.5;
    color: #333333;
`;