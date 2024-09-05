import {PageContainer} from '../components/pageContainer/PageContainer';
import {useForm} from 'react-hook-form';
import styled, {css} from 'styled-components';
import {Section} from '../components/section/Section';
import {toast} from 'react-toastify';
import {GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useTranslation} from 'next-i18next';
import {TelegramChannel} from '../components/telegramChannel/TelegramChannel';

const URL = 'https://api.mmeet.app/mail/send';

export default function Contacts() {
    const {t} = useTranslation('contacts');

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting},
    } = useForm<FormVariables>();

    const onSubmit = (data: FormVariables) =>
        fetch(URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(() => toast.success('Надіслано'))
            .finally(reset);

    return (
        <PageContainer title={t('title')}>
            <Section>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        placeholder={t('email')}
                        type="email"
                        {...register('email', {
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address',
                            },
                        })}
                    />
                    {errors.email && <ErrorLabel>Email is required</ErrorLabel>}

                    <br />

                    <TextArea
                        placeholder={t('message')}
                        {...register('message', {
                            required: true,
                            maxLength: 2000,
                        })}
                    />
                    {errors.message && (
                        <ErrorLabel>Message is required</ErrorLabel>
                    )}

                    <br />

                    <SubmitButton
                        type="submit"
                        value={t('submit')}
                        disabled={isSubmitting}
                    />
                </Form>

                <br />
                <br />

                <Centered>
                    <TelegramChannel />
                </Centered>
            </Section>
        </PageContainer>
    );
}

export const getStaticProps: GetStaticProps = async ({locale}) => ({
    props: {
        ...(await serverSideTranslations(locale!, ['contacts', 'footer'])),
    },
});

interface FormVariables {
    email: string;
    message: string;
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const inputStyles = css`
    border-radius: 6px;
    font-size: 16px;
    padding: 6px;
    border: 1px solid #d9d9d9;
`;

const Input = styled.input`
    ${inputStyles};
`;

const TextArea = styled.textarea`
    ${inputStyles};
    height: 120px;
`;

const ErrorLabel = styled.span`
    font-size: 14px;
    color: gray;
    margin-top: 2px;
`;

const SubmitButton = styled.input`
    ${inputStyles};
    color: white;
    height: 35px;
    border: none;
    background-color: #f7d550;
`;

const Centered = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
