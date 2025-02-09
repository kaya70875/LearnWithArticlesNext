'use client';

import Loading from '@/components/Loading';
import EllipseHeader from '@/components/reusables/EllipseHeader';
import TextArea from '@/components/reusables/TextArea';
import SentenceCard from '@/components/cards/SentenceCard';
import useAPIFetch from '@/hooks/useAPIFetch';
import { FastApiAIResponse } from '@/types/sentence';
import React, { useRef, useState } from 'react'
import Speaker from '@/components/svg/Speaker';
import { speakSentence } from '@/utils/helpers';
import CopyIcon from '@/components/svg/CopyIcon';
import IconMessage from '@/components/svg/IconMessage';
import IconFormal from '@/components/svg/IconFormal';
import IconShortened from '@/components/svg/IconShortened';
import IconExpanded from '@/components/svg/IconExpanded';
import IconAcademic from '@/components/svg/IconAcademic';
import InformationBubble from '@/components/reusables/InformationBubble';
import Card from '@/components/cards/Card';

type Context = 'Casual' | 'Academic' | 'Formal' | 'Sortened' | 'Extended' | 'Poetic';

export default function page() {

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const [sentence, setSentence] = useState('How can I write this sentence in different ways?');
    const [context, setContext] = useState<Context>('Casual');

    const { data, loading, error } = useAPIFetch<FastApiAIResponse>(sentence ? `/paraphrase/${encodeURIComponent(sentence)}/${context}` : null);

    const buttonTypes = [
        {
            name: 'Casual',
            icon: (<IconMessage />)
        },
        {
            name: 'Formal',
            icon: (<IconFormal />)
        },
        {
            name: 'Sortened',
            icon: (<IconShortened />)
        },
        {
            name: 'Extended',
            icon: (<IconExpanded />)
        },
        {
            name: 'Academic',
            icon: (<IconAcademic />)
        }
    ]

    const icons = [
        { icon: <Speaker isSpeaking={false} />, onClick: (sent: string) => speakSentence(sent) },
        { icon: <CopyIcon props={{ color: '#1f2937', cursor: 'pointer' }} />, onClick: (sent: string) => navigator.clipboard.writeText(sent) },
    ]

    const handleParaphraseClick = () => {
        if (textAreaRef.current) {
            setSentence(textAreaRef.current.value);
        }
    }

    return (
        <div className='w-full flex items-center justify-center'>
            <div className='main-container items-center justify-center'>
                <TextArea textAreaRef={textAreaRef} defaultValue={sentence}>
                    <div className='flex flex-row-reverse items-center gap-2'>
                        {buttonTypes.map((buttonType, index) => (
                            <InformationBubble information={buttonType.name} key={index}>
                                <button key={index} className={`relative ${context === buttonType.name ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-300'} transition-all duration-100 ease-in p-2 md:p-3 rounded-full`} onClick={() => setContext(buttonType.name as Context)}>
                                    {buttonType.icon}
                                </button>
                            </InformationBubble>
                        ))}
                    </div>
                    <button className='text-sm md:text-base p-2 md:px-4 py-2 bg-orange-400 rounded-xl text-primaryText font-medium' onClick={handleParaphraseClick}>Paraphrase</button>
                </TextArea>

                {loading && <Loading />}
                {error && <p>{error}</p>}

                {data && <div className='card-container'>
                    <EllipseHeader ellipseColor='bg-orange-400' text='Rewrites' />

                    <div className='w-full flex flex-col gap-4'>
                        {data?.paraphrase.map((sen, index) => (
                            <Card text={sen} icons={icons} key={index} />
                        ))}
                    </div>
                </div>}
            </div>
        </div>

    )
}
