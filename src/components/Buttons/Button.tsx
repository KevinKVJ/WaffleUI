/* eslint-disable prettier/prettier */
import classnames from 'classnames';
import {
    ButtonHTMLAttributes,
    CSSProperties,
    FC,
    // FocusEventHandler,
    // HTMLProps,
    // MouseEventHandler,
    PropsWithChildren,
    ReactNode,
    useMemo,
} from 'react';

import typography from '../typography';
import styles from './button.module.scss';
/* 
    1. background color
    2. size
    3. Any type of Button styles
*/
export interface IButtonBaseProps extends PropsWithChildren {
    size?: 'small' | 'default' | 'large' | 'x-large';
    type?: 'primary' | 'secondary' | 'tertiary';
    shape?: 'default' | 'pill';
    // fontSize?: number;
    className?: string;
    prefixElement?: ReactNode;
    suffixElement?: ReactNode;
    // onClick?: MouseEventHandler;
    // onFocus?: FocusEventHandler;
    // onBlur?: FocusEventHandler;
}

type ButtonType = IButtonBaseProps &
    ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonType> = ({
    size,
    type,
    // fontSize,
    shape,
    children,
    className,
    ...props
}) => {
    const { btnType, btnSize, btnShape, btnChildren } =
        useMemo(() => {
            return {
                btnSize: size || 'default',
                btnType: type || 'primary',
                btnChildren: children || 'Button',
                btnShape: shape || 'default',
            };
        }, [size, type, children, shape]);

    const { sizeMap, typeMap, radiumMap } = useMemo(() => {
        const getSizeObj = (
            paddingVert: number,
            paddingHori: number,
            fontSize: number,
            lineHeight: number
        ) => ({
            paddingVert,
            paddingHori,
            fontSize,
            lineHeight,
        });

        const {
            sFontSize,
            mFontSize,
            lFontSize,
            xlFontSize,
            sLineHeight,
            mLineHeight,
            lLineHeight,
            xlLineHeight
        } = typography;

        return {
            sizeMap: {
                small: getSizeObj(4, 8, sFontSize, sLineHeight),
                default: getSizeObj(8, 12, mFontSize, mLineHeight),
                large: getSizeObj(8, 16, lFontSize, lLineHeight),
                'x-large': getSizeObj(12, 22, xlFontSize, xlLineHeight),
            },

            typeMap: {
                /* type?: 'primary' | 'secondary' | 'tertiary'; */
                primary: '#FD5E53',
                secondary: '#3C8FFD',
                tertiary: '#FFDE1E',
            } as { [key: string]: string },

            radiumMap: {
                default: 4,
                pill: 1000,
            },
        };
    }, []);

    const buttonStyles = {
        '--button_bkg-color': typeMap[btnType],
        '--button_padding_vert': `${sizeMap[btnSize].paddingVert}px`,
        '--button_padding_hori': `${sizeMap[btnSize].paddingHori}px`,
        '--button_font_size': `${sizeMap[btnSize].fontSize}px`,
        '--button_line_height': `${sizeMap[btnSize].lineHeight}px`,
        '--button_radium':`${radiumMap[btnShape]}px`,
    } as CSSProperties;

    const baseButtonClasses = classnames(
        'button-wrapper',
        className,
        styles['base-button']
    );

    return (
        <button
            style={buttonStyles}
            className={baseButtonClasses}
            {...props}
        >
            {btnChildren}
        </button>
    );
};

export default Button;
