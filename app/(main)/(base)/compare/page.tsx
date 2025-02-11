'use client'

import Card from '@/components/cards/Card'
import Loading from '@/components/Loading'
import BaseInformation from '@/components/reusables/BaseInformation'
import useAPIFetch from '@/hooks/useAPIFetch'
import { useEffect, useRef, useState } from 'react'
import compareSvg from '@/public/illustrations/search.svg'
import { FastApiAIResponse, FastApiCompareResponse } from '@/types/aiResponse'

export default function Page() {
    const [word_1, setWord_1] = useState('')
    const [word_2, setWord_2] = useState('')

    const [similarityScore, setSimilarityScore] = useState('0');

    const inputRef1 = useRef<HTMLInputElement>(null)
    const inputRef2 = useRef<HTMLInputElement>(null)

    const { data, loading, error } = useAPIFetch<FastApiCompareResponse>(
        word_1 && word_2 ? `/compare/${word_1}/${word_2}` : null
    )

    console.log('data', data);

    const { data: similarityData, loading: similarityLoading, error: similarityError } = useAPIFetch<FastApiAIResponse>(word_1 && word_2 ? `/wordSimilarity/${word_1}/${word_2}` : null)

    const handleClick = () => {
        if (inputRef1.current && inputRef2.current) {
            setWord_1(inputRef1.current.value)
            setWord_2(inputRef2.current.value)
        }
    }

    useEffect(() => {
        if (similarityData) {
            setSimilarityScore(similarityData.score.toString());
        }
    }, [similarityData])


    return (
        <div className='main-container'>
            <div className='flex flex-col gap-4 bg-white rounded-md p-4'>
                <div className='flex items-center gap-4 w-full justify-between p-6'>
                    <div className='compare-card'>
                        <p>Word 1</p>
                        <input type="text" className='outline-none border border-primaryText rounded-lg w-56 text-primaryText py-2 px-3' ref={inputRef1} placeholder="Enter First Word" />
                    </div>

                    <h4 className='font-bold'>AND</h4>

                    <div className='compare-card'>
                        <p>Word 2</p>
                        <input type="text" className='outline-none border border-primaryText rounded-lg w-56 text-primaryText py-2 px-3' ref={inputRef2} placeholder="Enter Second Word" />
                    </div>
                </div>

                <div className="button-wrapper w-full flex flex-col items-center justify-center gap-12">
                    <button className="primary-button w-1/4" onClick={handleClick}>Compare</button>
                    <p className='font-medium'>Similarity Score : <span className='!text-primaryText font-semibold'>{similarityScore}%</span></p>
                </div>
            </div>


            {loading && <Loading />}
            {error && <div>Error: {error}</div>}
            {data && data ? (
                <Card>
                    <div className="text-base whitespace-pre-wrap">
                        <p className='font-bold'>Similarities:</p>
                        <p>{data.similarities}</p>
                        <br />
                        <p className='font-bold'>Differences:</p>
                        <p>{data.differences}</p>
                        <br />
                        <p className='font-bold'>Examples of {word_1}:</p>
                        <ul>
                            {data.examples_word1?.map((example: string, index: number) => (
                                <li key={index}>✅ {example}</li>
                            ))}
                        </ul>
                        <br />
                        <p className='font-bold'>Examples of {word_2}:</p>
                        <ul>
                            {data.examples_word2?.map((example: string, index: number) => (
                                <li key={index}>✅ {example}</li>
                            ))}
                        </ul>
                    </div>
                </Card>
            ) : (
                !loading && <BaseInformation svgFile={compareSvg} svgWidth={350} svgHeight={350} title='Compare Words' description='Compare two words and get insights about their similarities and differences.' />
            )}
        </div>
    )
}
