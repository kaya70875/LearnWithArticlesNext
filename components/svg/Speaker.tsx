import React from 'react'

export default function Speaker({ isSpeaking }: { isSpeaking: boolean }) {
    return (
        !isSpeaking ? (<svg width="22" height="22" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.8011 1.099L5.8005 6.75671H1V15.2433H5.8005L11.8011 20.901V1.099Z" strokeWidth="1.2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21.4862 1C23.7361 3.65244 25 7.24945 25 11C25 14.7506 23.7361 18.3476 21.4862 21M17.2498 5.99293C18.3747 7.31915 19.0067 9.11765 19.0067 10.9929C19.0067 12.8682 18.3747 14.6667 17.2498 15.9929" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>) : (<img src='/videos/speaker.gif' className='w-12 h-12' alt="video" />)
    )
}
