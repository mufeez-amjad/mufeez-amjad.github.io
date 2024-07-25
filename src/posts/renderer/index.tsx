import React from 'react';
import Markdown from 'react-markdown';
import styled from 'styled-components';
import gfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Image from './Image';
import rehypeRaw from 'rehype-raw';

type Props = {
    markdown: string;
}

export function Renderer({ markdown }: Props) {
    return (
        <MarkdownContainer>
            <Markdown
                components={{
                    code({ node, className, children, ref, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return match ? (
                            <SyntaxHighlighter
                                style={vscDarkPlus as any}
                                language={match[1]}
                                {...props}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                    image: ({ node, ...props }) => <Image {...props} />,
                    img: ({ node, ...props }) => <Image {...props} />,
                    table: ({ node, ...props }) => <StyledTable {...props} className="table" />,
                }}
                remarkPlugins={[gfm]}
                rehypePlugins={[rehypeRaw]}
            >
                {markdown}
            </Markdown>
        </MarkdownContainer>
    )
}

const MarkdownContainer = styled.div`
    display: block;

    padding-bottom: 80px;
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;

    th {
        background-color: #f5f5f5;
    }
    th, td {
        border: 1px solid #ddd;
        padding: 8px;
    }

    * strong {
        font-weight: 600;
    }
`;