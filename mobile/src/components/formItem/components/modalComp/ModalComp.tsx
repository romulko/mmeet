import {Modal, Pressable} from 'react-native';
import {
    HeaderContainer,
    Container,
    ContentContainer,
    Background,
} from './Styles';
import {Spacer} from '../../../spacer';
import React, {FC, useState} from 'react';
import {CloseIcon} from './components/closeIcon';
import {CloseIconWrapper} from './Styles';
import {Label} from '../../../label';

interface Props {
    title?: string;
    modalContent: (closeModal: () => void) => JSX.Element;
    children: any;
}

export const ModalComp: FC<Props> = ({title, children, modalContent}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const closeModal = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Modal animationType="slide" transparent visible={isModalVisible}>
                <Container>
                    <Background onPress={closeModal} />

                    <ContentContainer>
                        <HeaderContainer>
                            <Label variant="h1" color="gray">
                                {title}
                            </Label>

                            <CloseIconWrapper onPress={closeModal}>
                                <CloseIcon />
                            </CloseIconWrapper>
                        </HeaderContainer>

                        <Spacer hVariant="h2" />

                        {modalContent(closeModal)}
                    </ContentContainer>
                </Container>
            </Modal>

            <Pressable onPress={() => setIsModalVisible(true)}>
                {children}
            </Pressable>
        </>
    );
};
