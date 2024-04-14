import styled from 'styled-components';
import Image from 'next/image';

export const TelegramChannel = () => {
    return (
        <TelegramLink href="https://t.me/mmeetapp">
            <Image
                src="/telegram.png"
                width={40}
                height={40}
                alt="https://t.me/mmeetapp"
            />

            <p>Офіційний калан зв&apos;язку</p>
        </TelegramLink>
    );
};

const TelegramLink = styled.a`
    display: flex;
    align-items: center;
    gap: 6px;
`;
