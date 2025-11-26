# Adding Questions with Excel/CSV

## Quick Start

1. **Edit questions in Excel**: Open `/public/questions.csv` in Excel or any spreadsheet app
2. **Save as CSV**: Make sure to save as CSV format (not Excel format)
3. **Refresh the app**: Questions will load automatically

## CSV Format

The CSV file should have these columns:
- `id`: Unique number for each question
- `category`: Must match one of the game categories exactly
- `value`: Point value (200, 400, 600, 800, 1000)
- `question`: The question text
- `answer`: The answer text
- `mediaUrl`: (Optional) Path to audio/video file

## Categories

Current categories (must match exactly):
- `Musiikkia discosta`
- `Tunnetuimmat tanssikipaleet`
- `Yleistietoa`
- `Ei liity mitenkään musiikkiin`
- `90 luku`
- `Musiikin tekniikkaa`

## Example CSV Row

```
1,Musiikkia discosta,200,Mikä artisti esitti kappaleen 'I Will Survive'?,Gloria Gaynor,
```

## Adding Media Files

1. Put audio/video files in the `/public/assets/` folder
2. Reference them in the `mediaUrl` column like: `/assets/my-song.mp3`
3. Supported formats:
   - Audio: mp3, wav, ogg
   - Video: mp4, webm, mov

## Tips

- **IDs should be unique** - use incremental numbers
- **Categories are case-sensitive** - copy exactly from the list above
- **Values must be valid** - use 200, 400, 600, 800, or 1000
- **Empty mediaUrl is OK** - just leave the cell empty for text-only questions
- **Test your changes** - switch to "Test Mode" to verify questions load correctly

## Editing in Excel

1. Open `/public/questions.csv` in Excel
2. Edit the questions as needed
3. **Important**: When saving, choose "CSV UTF-8 (Comma delimited)" format
4. Refresh your browser to see changes

## Backup

The app will fall back to hardcoded sample questions if the CSV fails to load, so your game won't break if there's a formatting issue.