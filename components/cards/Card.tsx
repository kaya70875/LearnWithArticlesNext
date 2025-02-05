/** @jsxImportSource @emotion/react */
import { getSourceName } from '@/utils/helpers';
import React from 'react'
import InformationBubble from '../reusables/InformationBubble';
import { css } from '@emotion/react';

type IconProps = {
    icon: React.ReactSVGElement | React.ReactElement;
    onClick?: () => void;
}

interface CardProps {
    text: string;
    icons?: IconProps[];
    source?: string;
    children?: React.ReactNode;

    padding?: string;
    borderRadius?: string;
}

export default function Card({ text, icons, source, children, padding, borderRadius }: CardProps) {

    const cardBase = css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #fff;
        gap : 1.75rem;
        padding: ${padding || '1.35rem'};
        border-radius: ${borderRadius || '0.75rem'};
    `

    const handleSourceClick = () => {
        if (typeof window !== 'undefined') {
            window.open(source, '_blank');
        }
    }

    return (
        <div className='shadow-lg' css={cardBase}>
            <p className='text-base' dangerouslySetInnerHTML={{ __html: text ?? '' }}></p>
            <div className='w-full flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    {icons?.map((icon, index) => (
                        <div key={index} className='cursor-pointer' onClick={icon.onClick}>
                            {icon.icon}
                        </div>
                    ))}
                </div>
                <InformationBubble information='View source'>
                    <p className='text-primaryBlue hover:underline cursor-pointer capitalize' onClick={handleSourceClick}>{source && getSourceName(source)}</p>
                </InformationBubble>
            </div>

            {children}
        </div>
    )
}
