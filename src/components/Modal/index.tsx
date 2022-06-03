import React, { ReactNode } from 'react';


type Props = {
    heading: ReactNode;
    body : ReactNode;
    onClose?: () => void;
}

const Modal = ({heading, body}: Props) => (
    <dialog>
        <h2>{heading}</h2>
        <div>
            {body}
        </div>
    </dialog>
)

export default Modal;