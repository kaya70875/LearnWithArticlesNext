import useAPIFetch from '@/hooks/useAPIFetch';
import { FastApiAIResponse } from '@/types/sentence';
import React from 'react'
import Loading from './Loading';
import { highlighWord, prettyAIResponse } from '@/utils/helpers';
import { useParseJson } from '@/hooks/useParseJson';
import CorrectIcon from './svg/CorrectIcon';
import IconWrong from './svg/IconWrong';
import Card from './cards/Card';

interface AIWordAnalysisProps {
    currentWord: string;
}

export default function AIWordAnalysis({ currentWord }: AIWordAnalysisProps) {

    const { data: ai, loading: aiLoading, error: aiError } = useAPIFetch<FastApiAIResponse>(currentWord ? `/generate/${currentWord}` : null);

    const jsonResponse = useParseJson(ai?.response || '');

    const prettierResponse = prettyAIResponse(jsonResponse?.analysis);
    const highligedResponse = highlighWord(prettierResponse, currentWord, 'text-primaryText');


    return (
        <Card gap='1rem' >
            {aiLoading && <Loading />}
            {ai && <div className="check flex items-center gap-2">
                {jsonResponse?.check.includes('is a correct') ? (<CorrectIcon props={{ color: '#AEC976' }} />) : (<IconWrong props={{ color: 'red' }} />)}
                <p className='text-lg' dangerouslySetInnerHTML={{ __html: highlighWord(jsonResponse?.check, currentWord, 'text-primaryText') }}></p>
            </div>}

            {ai && <p className='text-base' dangerouslySetInnerHTML={{ __html: highligedResponse }} />}
        </Card>
    )
}
