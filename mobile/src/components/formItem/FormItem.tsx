import React, {FC} from 'react';
import {Line} from './Styles';
import {Spacer} from '../spacer';
import {ModalComp} from './components/modalComp';
import {Label} from '../label';

export interface FormItemEditorProps {
    closeModal?: () => void;
}

interface Props {
    label: string;
    value?: string | null | undefined;
    editor: (closeModal: () => void) => JSX.Element;
    children?: any;
}

export const FormItem: FC<Props> = ({label, value, editor, children}) => {
    const getContent = () => {
        if (children) {
            return children;
        }

        if (value) {
            return <Label>{value}</Label>;
        }

        return (
            <>
                <Spacer hVariant="h2" />

                <Line />
            </>
        );
    };

    return (
        <ModalComp title={label} modalContent={editor}>
            <>
                <Label color="gray">{label}</Label>

                <Spacer hVariant="h4" />

                {getContent()}
            </>
        </ModalComp>
    );
};
