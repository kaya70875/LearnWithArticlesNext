'use client';

import EllipseHeader from '@/components/reusables/EllipseHeader';
import TextArea from '@/components/reusables/TextArea'
import SentenceCard from '@/components/cards/SentenceCard';
import useAPIFetch from '@/hooks/useAPIFetch';
import { FastApiAIResponse } from '@/types/sentence';
import React, { useRef, useState } from 'react'
import Speaker from '@/components/svg/Speaker';
import CopyIcon from '@/components/svg/CopyIcon';
import { extractSpanContent, speakSentence } from '@/utils/helpers';
import Loading from '@/components/Loading';
import Card from '@/components/cards/Card';

export default function Page() {

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const [sentence, setSentence] = useState('');

    const { data, loading, error } = useAPIFetch<FastApiAIResponse>(sentence ? `/grammar/${encodeURIComponent(sentence)}` : null);

    const handleFixButton = () => {
        if (textAreaRef.current) {
            setSentence(textAreaRef.current.value);
        }
    }

    const rawContent = extractSpanContent(data?.response[1] ?? '');
    const icons = [
        { icon: <Speaker isSpeaking={false} />, onClick: () => speakSentence(rawContent) },
        { icon: <CopyIcon props={{ color: '#1f2937', cursor: 'pointer' }} />, onClick: () => navigator.clipboard.writeText(rawContent) },
    ]

    return (
        <div className='main-container'>
            <TextArea textAreaRef={textAreaRef}>
                <button className='p-2 flex items-center justify-center bg-orange-300 text-primaryText font-medium rounded-md w-28' onClick={handleFixButton}>Fix</button>
            </TextArea>

            {loading && <Loading />}

            {data?.response && (<div className='card-container'>
                <EllipseHeader ellipseColor='bg-orange-300' text='Sentence Fix' />

                <div className='p-4 bg-white flex flex-col gap-8 justify-between rounded-md'>
                    <p className='text-base' dangerouslySetInnerHTML={{ __html: data?.response[0] ?? '' }}></p>
                </div>

                <Card text={data.response[1]} icons={icons} />
            </div>)}
        </div>
    )
}