import Markdown from 'react-markdown';
import styled from 'styled-components';

type Props = {
    markdown: string;
}
export function Renderer({ markdown }: Props) {
    return (
        <MarkdownContainer>
            <Markdown
                children={markdown}
            />
        </MarkdownContainer>
    )
}

const MarkdownContainer = styled.div`
    display: block;
`;
