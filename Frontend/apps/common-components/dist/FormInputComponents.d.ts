import React from 'react';
interface FormInputComponentProps {
    label: string;
    optional?: true;
    type: string;
    validationText: string;
    validationFunc: (x: string) => boolean;
    onValueChange: (x: string) => void;
}
interface FormInputComponentState {
    isValid: boolean;
}
declare class FormInputComponent extends React.Component<FormInputComponentProps, FormInputComponentState> {
    constructor(props: FormInputComponentProps);
    setIsValid(isValid: boolean): void;
    handleValueChange: (insertedValue: string) => void;
    render(): JSX.Element;
}
export default FormInputComponent;
