import styled from 'styled-components/native';

export const Container = styled.View`
    position: relative;
    width: 100%;
    height: 100%;
`;

export const BottomContainer = styled.View`
    position: absolute;
    padding: 20px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 8px;
`;

export const RecordButtonContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    align-items: center;
`;

export const IconWrapper = styled.View`
    width: 30px;
    height: 30px;
    position: absolute;

    align-items: center;
    justify-content: center;
    top: 20px;
    right: 20px;
`;

export const ActionWrapper = styled.View`
    width: 100px;
    align-items: center;
`;
