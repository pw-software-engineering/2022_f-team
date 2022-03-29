interface FormInputComponentProps {
    label: string;
    optional?: true;
    type: string;
    validationText: string;
    validationFunc: (x: string) => boolean;
    onValueChange: (x: string) => void;
}
export declare const FormInputComponent: (props: FormInputComponentProps) => JSX.Element;
export {};
