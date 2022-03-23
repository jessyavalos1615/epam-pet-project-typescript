import { MouseEventHandler, ReactNode } from 'react';

export interface ModalTypes {
    show: boolean;
    onClose: any;
    onSubmit: Function;
    title: string;
    children: ReactNode
}