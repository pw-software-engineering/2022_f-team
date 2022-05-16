import React, { ReactNode } from "react";

interface DialogProps {
    title: string,
    onClose: () => any,
    onSubmit: () => any,
    visibility: string,
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
                height: '50%',
                left: '25%',
                top: '20%',
                padding: '3vh 4vw',
                boxSizing: 'border-box',
            }}>
                <div style={{ width: '80%', position: 'relative', left: '10%' }}>
                    <div className='meal-header-div'>
                        <span style={{ fontSize: '30px' }}>Edit meal “{props.title}”</span>
                        <button onClick={() => props.onClose()}>X</button>
                    </div>
                    <div style={{
                        height: '50vh',
                        overflowX: 'hidden',
                        overflowY: 'auto',
                    }}>
                        {props.content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dialog;