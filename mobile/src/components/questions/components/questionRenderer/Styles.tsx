import styled from 'styled-components/native';

export const Container = styled.View<{showBackground?: boolean}>`
    height: 60px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    border-radius: 16px;
    background-color: ${({showBackground}) =>
        showBackground ? '#fffaf1' : 'transparent'};
`;

export const ActionsContainer = styled.View`
    flex-direction: row;
`;
