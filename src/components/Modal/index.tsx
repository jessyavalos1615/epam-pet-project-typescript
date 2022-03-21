import './index.css';

import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Button from '../UI/Button';

const Modal = ({ show, onClose, onSubmit, title, children }: any) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const closeOnEscapeKeyDown = (e: KeyboardEvent) => {
        if ((e.charCode || e.keyCode) === 27)
            onClose();
    }

    useEffect((): any => {
        document.body.addEventListener('keydown', closeOnEscapeKeyDown)
        return () => (document.body.removeEventListener('keydown', closeOnEscapeKeyDown));
    }, [closeOnEscapeKeyDown]);

    return ReactDOM.createPortal(
        <CSSTransition
            in={show}
            unmountOnExit
            timeout={{ enter: 0, exit: 300 }}>

            <div className='modal' onClick={onClose}>
                <div className='modal-content' onClick={e => e.stopPropagation()}>
                    <div className='modal-header'>
                        <h4 className='modal-title'>{title}</h4>
                    </div>
                    <div className='modal-body'>
                        {children}
                    </div>
                    <div className='modal-footer'>
                        <Button text='Close Modal'
                            type='button'
                            classText='secondary'
                            click={onClose}
                            style={{ width: '100px', }} />
                        <Button classText='primary'
                            type='button'
                            text='Submit'
                            click={onSubmit}
                            style={{width: '100px', marginLeft: '10px'}} />
                    </div>
                </div>
            </div>
        </CSSTransition>,
        document.getElementById("root")!
    );
}

export default Modal;