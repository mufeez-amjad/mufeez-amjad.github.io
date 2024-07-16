import * as React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

import CompactionsPost from './posts/content/concurrent-compactions';

export const Highlights = () => {
    const entryContainerRef = React.useRef<HTMLDivElement>(null);
    const [activeEntry, setActiveEntry] = React.useState<number | undefined>();

    const [entryHighlightPosition, setEntryHighlightPosition] = React.useState<{ top: number | string, left: number | string }>({ top: '100vh', left: '100vw' });

    const posts = React.useMemo(() => {
        return [
            {
                title: CompactionsPost.title,
                description: CompactionsPost.description,
                link: { external: false, url: `/posts/${CompactionsPost.slug}` },
                image: CompactionsPost.hero,
            },
            {
                title: "Flushable SSTables",
                description: "Speeding up ingestion when ingested SSTables overlap with the memtable",
                link: { external: false, url: '/posts/sstables' },
                image: "./posts/ingest.png",
            },
            // {
            //     title: "Cross-thread shared futures",
            //     description: "Facilitating event propagation between concurrent Buck2 invocations",
            //     link: { external: false, url: '/futures' },
            //     image: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=300",
            // },
            // {
            //     title: "ollyLLM",
            //     description: "LLM observability platform for evals, regression testing, and execution tracing",
            //     link: { external: false, url: '/ollyllm' },
            //     image: "./posts/beam.png",
            // },
            {
                title: "Beam",
                description: "Cross-platform AirDrop with e2e encryption",
                link: { external: true, url: 'https://x.com/moofeez/status/1744119063901544530' },
                image: "./posts/beam2.png",
            },
        ];
    }, []);

    const dims: Promise<{ width: number; height: number; }[]> = React.useMemo(async () => {
        try {
            return await Promise.all(posts.map(async (post) => {
                try {
                    const dim = await getImageDimensions(post.image);

                    const maxWidth = 400;
                    const maxHeight = 250;

                    // Scale down the image to fit within the maxWidth and maxHeight
                    if (dim.width > maxWidth || dim.height > maxHeight) {
                        const ratio = Math.min(maxWidth / dim.width, maxHeight / dim.height);
                        return { width: dim.width * ratio, height: dim.height * ratio };
                    } else {
                        return dim;
                    }
                } catch (error) {
                    console.error('Error loading image:', error);
                    return { width: 0, height: 0 };
                }
            }));
        } catch (error) {
            console.error('Error loading image dimensions:', error);
            return [];
        }
    }, [posts]);

    const onHover = React.useCallback(async (e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>, idx: number) => {
        if (!entryContainerRef.current) {
            return;
        }

        const target = e.target as HTMLDivElement;
        if (target === entryContainerRef.current) {
            setActiveEntry(undefined);
            return;
        }

        const entry = target.closest('.entry');
        if (!entry) {
            return;
        }

        if (activeEntry !== idx) {
            setActiveEntry(idx);
        }

        const entries = entryContainerRef.current.querySelectorAll('.entry');
        // Align left of image with right of widest entry
        const widestEntryWidth = Math.max(...Array.from(entries).map(e => e.getBoundingClientRect().width));

        const entryRect = entry.getBoundingClientRect();
        const containerRect = entryContainerRef.current.getBoundingClientRect();

        // Calculate the intended top position to center the entryHighlight with the entry
        let topPosition = entryRect.top - containerRect.top + (entryRect.height / 2) - ((await dims)[idx].height / 2);

        setEntryHighlightPosition({
            top: topPosition,
            left: widestEntryWidth + 16,
        });
    }, [dims, activeEntry]);

    return (
        <div style={{ marginTop: 80, marginBottom: 104 }}>
            <EntriesContainer ref={entryContainerRef} onMouseLeave={(e) => {
                // Check if the mouse is not still hovering over the entry container
                if (e.relatedTarget instanceof Node && !entryContainerRef.current?.contains(e.relatedTarget)) {
                    setActiveEntry(undefined);
                }
            }}>
                <EntryHighlight images={posts.map(p => p.image)} idx={activeEntry} position={entryHighlightPosition} dims={dims} />
                {posts.map((post, idx) => (
                    <Entry key={idx} title={post.title} description={post.description} onHover={(e) => onHover(e, idx)} link={post.link} />
                ))}
            </EntriesContainer>
        </div>
    )
}

const EntriesContainer = styled.div`
  position: relative;
  margin-left: -16px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

function useResolvePromise<T>(promise: Promise<T>) {
    const [item, setItem] = React.useState<T>();

    React.useEffect(() => {
        promise.then(items => {
            setItem(items);
        }).catch(error => {
            console.error("Error resolving promise", error);
            // Optionally, set item to a default value or handle the error as needed
        });
    }, [promise]);

    return item;
}

const EntryHighlight = ({
    idx,
    position,
    images,
    dims
}: {
    idx?: number,
    images: string[],
    position: { top: number | string, left: number | string },
    dims: Promise<{ width: number, height: number }[]>
}) => {
    const isVisible = idx !== undefined;
    const src = idx !== undefined ? images[idx] : undefined;
    const dim = useResolvePromise(dims)?.at(idx ?? 0);

    return (
        <AnimatePresence mode="wait">
            {isVisible && (
                <StyledEntryHighlightImage
                    id='entry-highlight-image'
                    as={motion.img}
                    key={src} // Use src as the key to ensure unique transitions
                    src={src}
                    alt="cover"
                    initial={{
                        opacity: 0.5,
                        scale: 0.9,
                        rotate: 5,
                        filter: 'blur(10px)'
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: 0,
                        filter: 'blur(0px)'
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.9,
                        rotate: -5,
                        filter: 'blur(10px)',
                        transition: { duration: 0.2 }
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                        duration: 0.15
                    }}
                    style={{
                        ...position,
                        ...dim,
                    }}
                />
            )}
        </AnimatePresence>
    );
};

const StyledEntryHighlightImage = styled(motion.img)`
    position: absolute;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 1;
`;

type EntryProps = {
    title: string;
    description: string;
    onHover?: (e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => void;
    link?: {
        external: boolean;
        url: string;
    };
};

const Entry = ({ title, description, onHover, link }: EntryProps) => {

    const className = 'entry';

    if (!link) {
        return (
            <EntryContainer onMouseEnter={onHover} className={className}>
                <EntryHeader>{title}</EntryHeader>
                <EntryDescription>{description}</EntryDescription>
            </EntryContainer>
        );
    }

    if (link.external) {
        return (
            <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }} onMouseEnter={onHover}>
                <EntryContainer className={className}>
                    <EntryHeader>{title}</EntryHeader>
                    <EntryDescription>{description}</EntryDescription>
                </EntryContainer>
            </a>
        );
    } else {
        return (
            <Link to={link.url} style={{ textDecoration: 'none', color: 'inherit' }} onMouseEnter={onHover}>
                <EntryContainer className={className}>
                    <EntryHeader>{title}</EntryHeader>
                    <EntryDescription>{description}</EntryDescription>
                </EntryContainer>
            </Link>
        )
    }
}

const EntryContainer = styled.div`
  width: fit-content;
  padding: 12px 16px;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;

  cursor: pointer;
  &:hover {
    background-color: #d3d3d39c;
  }
`;

const EntryHeader = styled.h2`
  font-size: 16px;
  font-family: 'Red Hat Display';
  font-weight: 500;
  margin: 0;
`;

const EntryDescription = styled.p`
  font-size: 15px;
  font-family: 'Red Hat Display';
  margin: 0;
  color: #6b6b6b;
`;

const getImageDimensions = (src: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            resolve({ width: img.width, height: img.height });
        };
        img.onerror = (error) => {
            reject(error);
        };
        img.src = src;
    });
};