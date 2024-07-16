import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

type Props = {
    heading: React.ReactElement | string;
    subheading: React.ReactElement | string;
}

export const PageHeader = ({ heading, subheading }: Props) => {
    return (
        <HeaderContainer>
            <Link to="/">
                <StyledImage src="/photo1.jpeg" />
            </Link>
            <HeaderText>
                {heading}
            </HeaderText>
            <Subheading>
                {subheading}
            </Subheading>
        </HeaderContainer>
    )
}

const StyledImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 24px;
`;

const HeaderText = styled.h1`
  font-size: 26px;
  font-family: 'Red Hat Display';
  font-weight: 600;
  opacity: 1;
`;

const HeaderContainer = styled.div`
  padding-bottom: 32px;
  width: 100%;
  border-bottom: 1px solid #eeeeee;
`;

const Subheading = styled.div``;
