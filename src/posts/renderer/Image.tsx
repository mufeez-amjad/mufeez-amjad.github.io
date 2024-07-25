import React, { useState, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';

const ImageWrapper = styled.div`
  cursor: pointer;
`;

const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const zoomIn = keyframes`
  from { transform: scale(0.95); }
  to { transform: scale(1); }
`;

const zoomOut = keyframes`
  from { transform: scale(1); }
  to { transform: scale(0.95); }
`;

const LightboxOverlay = styled.div<{ isClosing: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${({ isClosing }) => isClosing ? css`${fadeOut} 0.3s ease-out forwards` : css`${fadeIn} 0.3s ease-out forwards`};
`;

const LightboxImage = styled.img<{ isClosing: boolean }>`
  max-width: 90%;
  max-height: 90%;
  animation: ${({ isClosing }) => isClosing ? css`${zoomOut} 0.3s ease-out forwards` : css`${zoomIn} 0.3s ease-out forwards`};
`;

type Props = {
  src?: string;
  alt?: string;
  style?: React.CSSProperties;
}

const Image = ({ src, alt, style }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const openLightbox = useCallback(() => {
    setIsOpen(true);
    setIsClosing(false);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300); // Match this with the animation duration
  }, []);

  return (
    <>
      <ImageWrapper onClick={openLightbox}>
        <StyledImage src={src} alt={alt} style={style} />
      </ImageWrapper>
      {isOpen && (
        <LightboxOverlay onClick={closeLightbox} isClosing={isClosing}>
          <LightboxImage
            src={src}
            alt={alt}
            isClosing={isClosing}
          />
        </LightboxOverlay>
      )}
    </>
  );
};

export default Image;