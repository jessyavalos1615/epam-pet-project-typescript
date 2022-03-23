import { ReactNode } from 'react';

export interface ButtonTypes {
    type: any;
    classText: string;
    text?: string;
    click?: any;
    style?: {};
    children?: ReactNode;
}