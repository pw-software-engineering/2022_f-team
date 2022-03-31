interface Props {
    text: string;
}
export declare const ExampleComponent: ({ text }: Props) => JSX.Element;
export { default as FormInputComponent } from './FormInputComponents';
export { EmailValidator, PhoneValidator, PostalCodeValidator } from './utilities';
export { default as SubmitButton } from './SubmitButton';
