import {FC} from 'react';
import styled from 'styled-components';
import Image from 'next/image';

interface TeamMemberProps {
    imageUrl: string;
    name: string;
    description: string;
    linkedin?: string;
}

export const TeamMember: FC<TeamMemberProps> = ({
    imageUrl,
    name,
    description,
    linkedin,
}) => {
    return (
        <Container>
            <Avatar
                src={`/team/${imageUrl}.png`}
                width={120}
                height={120}
                alt={name}
            />

            <LabelsContainer>
                <Name>{name}</Name>

                <Description>{description}</Description>

                <SocialContainer>
                    {linkedin && (
                        <a href={linkedin} target="_blank" rel="noreferrer">
                            <Image
                                src="/linkedin.png"
                                width={20}
                                height={20}
                                alt={`${name} LinkedIn`}
                            />
                        </a>
                    )}
                </SocialContainer>
            </LabelsContainer>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    gap: 12px;
`;

const LabelsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
`;

const Name = styled.p`
    font-size: 20px;
    font-weight: bolder;
`;

const Description = styled.p``;

const Avatar = styled(Image)`
    border-radius: 70px;
`;

const SocialContainer = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 6px;
`;
