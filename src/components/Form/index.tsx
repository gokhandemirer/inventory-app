import type { FormHTMLAttributes } from "react";

type FormProps = FormHTMLAttributes<HTMLFormElement>;

const Form = ({ children, ...props }: FormProps) => {
    return (
        <section id="forms" className="mt-4 p-2">
            <form {...props}>{children}</form>
        </section>
    )
};

export default Form;