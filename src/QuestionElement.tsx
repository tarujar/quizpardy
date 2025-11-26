import React from 'react';
import type { Question } from './questions';
import { AUDIO_EXTENSIONS, VIDEO_EXTENSIONS } from './mediaTypes';

interface QuestionElementProps {
  question: Question;
}
const isAudioExtension = (e: string | undefined): boolean =>{
    return !!e && AUDIO_EXTENSIONS.includes(e as typeof AUDIO_EXTENSIONS[number]);
  }
const isVideoExtension = (e: string | undefined): boolean =>{
    return !!e && VIDEO_EXTENSIONS.includes(e as typeof VIDEO_EXTENSIONS[number]);
  }
  
export function QuestionElement({ question }: Readonly<QuestionElementProps>) {
  if (!question) return null;
  const ext = question.mediaUrl?.split('.').pop()?.toLowerCase();

  let mediaElement: React.ReactNode = null;
  if (question.mediaUrl) {
    if (isAudioExtension(ext)) {
      mediaElement = (
        <div style={{ marginBottom: '1rem' }}>
            audio url : {question.mediaUrl}
          <audio controls src={question.mediaUrl} style={{ width: '100%' }} />
        </div>
      );
    } else if (isVideoExtension(ext)) {
      mediaElement = (
        <div style={{ marginBottom: '1rem' }}>
          <video controls src={question.mediaUrl} style={{ width: '100%' }}>
            <track kind="captions" />
            Your browser does not support the video element.
          </video>
        </div>
      );
    }
  }
  const questionWithLineBreaks = question.question.split("//");

  return (
    <>
      <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{question.category} -  {question.value}</h3>
      <p>
        {questionWithLineBreaks.map((line, idx) => (
        <span key={idx} style={{ fontSize: '3rem', fontWeight: 'bold', margin: '2rem 0' }}>{line} {questionWithLineBreaks.length > 1 && <br />}</span>
        ))}
      </p>
      {mediaElement}
    </>
  );
}
