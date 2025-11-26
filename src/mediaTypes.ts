// Supported media file extensions for audio and video
export const AUDIO_EXTENSIONS = ['mp3', 'wav', 'ogg'] as const;
export const VIDEO_EXTENSIONS = ['mp4', 'webm', 'mov'] as const;

export type AudioExtension = typeof AUDIO_EXTENSIONS[number];
export type VideoExtension = typeof VIDEO_EXTENSIONS[number];
