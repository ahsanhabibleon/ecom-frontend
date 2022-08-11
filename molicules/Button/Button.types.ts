import { ReactNode } from "react";

export interface BtnProps {
    children: ReactNode
    type?: string
    href?: string
    targetBlank?: boolean
    small?: boolean
    disabled?: boolean
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}