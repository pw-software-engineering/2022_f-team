import React, { ReactNode } from "react";
import SubmitButton from "../Atoms/SubmitButton";

interface DialogProps {
    title: string,
    onClose: () => any,
    onSubmit: () => any,
    style?: React.CSSProperties | undefined,
    content: ReactNode,
    backdrop?: boolean
}

const Dialog = (props: DialogProps) => {
    const backdrop = props.backdrop == undefined ? true : props.backdrop;

    return (
        <div>
            <div style={{ opacity: backdrop ? '1' : '0' }}>
                <div className='shadowPanel' style={{ position: 'fixed', zIndex: 99 }}
                    onClick={() => props.onClose()}
                />
            </div>
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
                        padding: '2vw'
                    }}>
                        {props.content}
                    </div>
                    <div style={{
                        width: '100%',
                        padding: '0 2vw',
                        paddingTop: '3vh',
                        position: 'relative',
                        bottom: 0,
                        textAlign: 'right',
                        gridTemplateColumns: 'calc(48% - 2vw) 4% calc(48% - 2vw)',
                        display: 'grid',
                    }}>
                        <SubmitButton text={"Save"}
                            style={{ marginBottom: 0, width: '100%' }}
                            validateForm={function (): boolean {
                                return true;
                            }}
                            action={() => { props.onSubmit(); }}
                        ></SubmitButton>
                        <div></div>
                        <SubmitButton text={"Cancel"}
                            style={{ marginBottom: 0, width: '100%' }}
                            validateForm={function (): boolean {
                                return true;
                            }}
                            action={() => props.onClose()}
                        ></SubmitButton>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dialog;