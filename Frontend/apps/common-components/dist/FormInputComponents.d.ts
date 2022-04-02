interface FormInputComponentProps {
    label: string;
    optional?: true;
    type: string;
    validationText: string;
    validationFunc: (x: string) => boolean;
    onValueChange: (label: string, value: string) => void;
}
declare const FormInputComponent: (props: FormInputComponentProps) => JSX.Element;
export default FormInputComponent;
