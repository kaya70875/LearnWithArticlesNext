'use client';

import InputField from '@/components/inputs/InputField';
import { signOut, useSession } from 'next-auth/react'
import React, { useState } from 'react'

export default function page() {
  const auth = useSession();
  const currentUser = auth.data?.user;

  const [word , setWord] = useState<string | null>(null);
  const [categories , setCategories] = useState<string[]>(['Science' , 'News']);

  const [loading , setLoading] = useState(false);
  const [submitted , setSubmitted] = useState(false);

  return (
    <div className='flex flex-col gap-8 w-full'>
      <header className="top flex flex-col gap-4">
        <h3>Welcome Again , {currentUser?.name}</h3>
        <p>Choose a word to get started!</p>

        <input type="text" className='hero-input' onChange={(e) => setWord(e.target.value)} />
      </header>

      <div className="top-info flex flex-col gap-4">
        <p>* Search Some Words That You Want To İnclude In Any Sentence.</p>
        <p>* Use Filter To See Different Subjects or Sources</p>
      </div>

      <div className="buttons flex items-center gap-4 w-full justify-center">
        <button className="primary-button !py-4 w*48">
          Generate Sentences
        </button>

        <button className="secondary-button !py-4 w-48">
          Filter
        </button>
      </div>

      <article className='flex flex-col gap-8 p-8 bg-lightBlue w-full'>
        <header className='flex w-full items-center justify-between'>
          <div className='flex flex-col gap-4'>
            <h4>Sentences About <span>{word}</span></h4>
            <p className='text-primaryBlue text-base flex items-center gap-2'>Active Categories : {categories.map(cat => (
              <span className=''>{cat}</span>
            ))}</p>
          </div>

          <span>Change Content</span>
        </header>
      </article>
    </div>
  )
}
