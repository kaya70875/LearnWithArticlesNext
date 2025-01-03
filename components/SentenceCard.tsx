import { getSourceName } from '@/utils/helpers';
import { useRouter } from 'next/navigation';
import React from 'react'

interface SentenceCardProps {
  sentence: string;
  word: string;
  source : string;
}

export default function SentenceCard({ sentence, word , source }: SentenceCardProps) {

  const sentenceCardIcons = [
    {
      name: 'Sentences',
      icon: (<svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.2913 3.50813C19.7805 2.99713 19.1741 2.59177 18.5066 2.31521C17.8392 2.03865 17.1238 1.8963 16.4013 1.8963C15.6788 1.8963 14.9634 2.03865 14.2959 2.31521C13.6285 2.59177 13.022 2.99713 12.5113 3.50813L11.4513 4.56813L10.3913 3.50813C9.3596 2.47643 7.96032 1.89684 6.50129 1.89684C5.04226 1.89684 3.64298 2.47643 2.61129 3.50813C1.5796 4.53982 1 5.93909 1 7.39813C1 8.85716 1.5796 10.2564 2.61129 11.2881L3.67129 12.3481L11.4513 20.1281L19.2313 12.3481L20.2913 11.2881C20.8023 10.7774 21.2076 10.1709 21.4842 9.50348C21.7608 8.83602 21.9031 8.12061 21.9031 7.39813C21.9031 6.67564 21.7608 5.96023 21.4842 5.29277C21.2076 4.62531 20.8023 4.01888 20.2913 3.50813Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>)
    },

    {
      name: 'Favorites',
      icon: (<svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 19.6889L8 14.6889L1 19.6889V3.6889C1 3.15847 1.21071 2.64976 1.58579 2.27469C1.96086 1.89962 2.46957 1.6889 3 1.6889H13C13.5304 1.6889 14.0391 1.89962 14.4142 2.27469C14.7893 2.64976 15 3.15847 15 3.6889V19.6889Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>)
    },
    {
      name: 'Expand',
      icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.13 1L6 16C6 16.5304 6.21071 17.0391 6.58579 17.4142C6.96086 17.7893 7.46957 18 8 18H23" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M1 6.13L16 6C16.5304 6 17.0391 6.21071 17.4142 6.58579C17.7893 6.96086 18 7.46957 18 8V23" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      )
    },
    {
      name: 'Speaker',
      icon: (<svg width="26" height="22" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.8011 1.099L5.8005 6.75671H1V15.2433H5.8005L11.8011 20.901V1.099Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21.4862 1C23.7361 3.65244 25 7.24945 25 11C25 14.7506 23.7361 18.3476 21.4862 21M17.2498 5.99293C18.3747 7.31915 19.0067 9.11765 19.0067 10.9929C19.0067 12.8682 18.3747 14.6667 17.2498 15.9929" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      )
    }
  ]

  const handleSourceClick = () => {
    if(typeof window !== 'undefined') {
      window.open(source , '_blank');
    }
  }

  const highlightedSentence = sentence.replace(
    new RegExp(`(${word})`, 'gi'),
    (match) => `<span class="font-bold underline">${match}</span>`
  )

  return (
    <div className='flex flex-col gap-4 p-8 bg-white'>
      <p className='text-lg' dangerouslySetInnerHTML={{ __html: highlightedSentence }}></p>
      <div className='flex items-center gap-4'>
        {sentenceCardIcons.map((icon, index) => (
          <div key={index} className='icon cursor-pointer text-primaryText'>{icon.icon}</div>
        ))}
      </div>
      <p className='text-base text-primaryBlue hover:underline w-full text-right cursor-pointer capitalize' onClick={handleSourceClick}>{getSourceName(source)}</p>
    </div>
  )
}
