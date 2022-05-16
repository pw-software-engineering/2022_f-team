import React, { ReactNode } from "react";
import SubmitButton from "../Atoms/SubmitButton";

interface DialogProps {
    title: string,
    onClose: () => any,
    onSubmit: () => any,
    style: React.CSSProperties | undefined,
    content: ReactNode,
}

const Dialog = (props: DialogProps) => {

    return (
        <div>
            <div className='shadowPanel' style={{ position: 'fixed', zIndex: 99 }}
                onClick={() => props.onClose()}
            />
            <div style={{
                position: 'fixed',
                zIndex: 100,
                backgroundColor: '#ffffff',
                border: 'solid 2px #539091',
                borderRadius: '15px',
                width: '50%',
                left: '25%',
                top: '15vh',
                padding: '3vh 1vw',
                boxSizing: 'border-box',
                ...props.style,
            }}>
                <div style={{ width: '80%', position: 'relative', left: '10%' }}>
                    <div className='meal-header-div'>
                        <span style={{ fontSize: '30px' }}>{props.title}</span>
                        <button onClick={() => props.onClose()}>X</button>
                    </div>
                    <div style={{
                        height: '40vh',
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        padding: '20px'
                    }}>
                        {props.content}
                    </div>
                    <div style={{ width: '90%', paddingTop: '3vh', position: 'relative', left: '10%', bottom: 0, textAlign: 'right' }}>
                        <SubmitButton text={"Save"}
                            style={{ marginBottom: 0 }}
                            validateForm={function (): boolean {
                                return true;
                            }}
                            action={
                                () => { }
                            }
                        ></SubmitButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dialog;