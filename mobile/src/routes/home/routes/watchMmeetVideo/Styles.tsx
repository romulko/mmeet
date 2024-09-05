import styled from 'styled-components/native';

export const Container = styled.View`
    position: relative;
    height: 100%;
    background-color: black;
`;

export const LoadingLabelWrapper = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

export const QuestionTextWrapper = styled.View`
    position: absolute;
    width: 100%;
    align-items: center;
    justify-content: center;
    bottom: 0;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 8px;
`;

export const ActionsWrapper = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
`;
