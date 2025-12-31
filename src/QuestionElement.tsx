import React from 'react';
import type { Question } from './questions';
import { AUDIO_EXTENSIONS, VIDEO_EXTENSIONS, IMAGE_EXTENSIONS } from './mediaTypes';

interface QuestionElementProps {
  question: Question;
}

type MediaType = 'audio' | 'video' | 'image' | null;

const getMediaType = (mediaUrl: string | undefined): MediaType => {
  if (!mediaUrl) return null;
  
  const ext = mediaUrl.split('.').pop()?.toLowerCase();
  if (!ext) return null;
  
  if (AUDIO_EXTENSIONS.includes(ext as typeof AUDIO_EXTENSIONS[number])) {
    return 'audio';
  }
  if (VIDEO_EXTENSIONS.includes(ext as typeof VIDEO_EXTENSIONS[number])) {
    return 'video';
  }
  if (IMAGE_EXTENSIONS.includes(ext as typeof IMAGE_EXTENSIONS[number])) {
    return 'image';
  }
  
  return null;
};

const getQuestionMediaElement = (mediaType: MediaType, mediaUrl: string | undefined): React.ReactNode => {
  switch (mediaType) {
    case 'audio':
      return (
        <div style={{ marginBottom: '1rem' }}>
          <audio controls src={mediaUrl} style={{ width: '100%' }} />
        </div>
      );
    case 'video':
      return (
        <div style={{ marginBottom: '1rem' }}>
          <video controls src={mediaUrl} style={{ width: '100%' }}>
            <track kind="captions" />
            Your browser does not support the video element.
          </video>
        </div>
      );
    case 'image':
      return (
        <div style={{ marginBottom: '1rem' }}>
          <img 
            src={mediaUrl} 
            alt="Question media" 
            style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain', borderRadius: '8px' }} 
          />
        </div>
      );
    case null:
      return null;
  }
};

export function QuestionElement({ question }: Readonly<QuestionElementProps>) {
  if (!question) return null;
  
  const mediaType = getMediaType(question.mediaUrl);
  const mediaElement = getQuestionMediaElement(mediaType, question.mediaUrl);
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
