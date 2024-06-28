import React, { useState, useRef, ReactNode } from 'react';
import styled from 'styled-components';
import { usePopper } from 'react-popper';

interface TooltipProps {
    text: string;
    children: ReactNode;
}

const TooltipContent = styled.div<{ isVisible: boolean }>`
  background-color: #36454F;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  z-index: 1000;
  opacity: ${props => props.isVisible ? 1 : 0};
  visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
  transition: opacity 0.2s, visibility 0.2s;
`;

const TooltipArrow = styled.div`
  display: none; // Hide for now.
  position: absolute;
  width: 8px;
  height: 8px;
  background: #333;
  transform: rotate(45deg);
`;

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const referenceRef = useRef<HTMLSpanElement>(null);
    const popperRef = useRef<HTMLDivElement>(null);
    const arrowRef = useRef<HTMLDivElement>(null);

    const { styles, attributes, update } = usePopper(referenceRef.current, popperRef.current, {
        modifiers: [
            { name: 'arrow', options: { element: arrowRef.current } },
            { name: 'offset', options: { offset: [0, 4] } },
            {
                name: 'computeStyles',
                options: {
                    gpuAcceleration: false,
                },
            },
            {
                name: 'preventOverflow',
                options: {
                    boundary: 'clippingParents',
                },
            },
        ],
        placement: 'top',
    });

    const handleMouseEnter = () => {
        setIsVisible(true);
        update?.();
    };

    const handleMouseLeave = () => {
        setIsVisible(false);
    };

    return (
        <>
            <span
                ref={referenceRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {children}
            </span>
            <div
                ref={popperRef}
                style={styles.popper}
                {...attributes.popper}
            >
                <TooltipContent isVisible={isVisible}>
                    {text}
                    <TooltipArrow ref={arrowRef} style={styles.arrow} />
                </TooltipContent>
            </div>
        </>
    );
};

export default Tooltip;