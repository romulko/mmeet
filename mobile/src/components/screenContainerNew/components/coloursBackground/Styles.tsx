import styled, {css} from 'styled-components/native';

export const ImageWrapper = styled.View<{
    left?: number;
    top?: number;
}>`
    position: absolute;

    ${({left = 0, top = 0}) => {
        return css`
            left: ${left}px;
            top: ${top}px;
        `;
    }}
`;

export const Image = styled.Image`
    width: 220px;
    height: 220px;
    opacity: 0.3;
`;
