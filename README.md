# quizpardy

Locally run React application to host a Jeopardy style trivia quiz event

## Running the Project

1. **Install dependencies**:
   ```sh
   npm install
   ```

2. **Start the development server:**
   ```sh
   npm run dev
   ```
   The app will open at [http://localhost:5173](http://localhost:5173) (or another port if 5173 is busy).

3. **Troubleshooting:**
   - If you see a Node.js version error, upgrade Node to v20.19+ or v22.12+.
   - If the game state misbehaves, use the "Reset Game" button or clear browser cookies.
   - For question editing, see `/public/questions.csv` and the in-app settings panel.

4. **Stop the server:**
   Press `Ctrl+C` in the terminal.

## Editing Questions (questions.csv)

To add or edit quiz questions, open `/public/questions.csv` in a spreadsheet editor (Excel, Google Sheets) or a text editor. Each row represents one question and must have the following columns:

- `id`: Unique number for each question (must not repeat)
- `category`: The category name (e.g. "AI", "Web", "DevOps")
- `value`: The point value (e.g. 100, 200, 300...)
- `question`: The question text
- `answer`: The correct answer text
- `mediaUrl` (optional): URL or filename for audio/video (must be in `public/` or a direct link)

**Example row:**
```
id;category;value;question;answer;mediaUrl
1;AI;100;Mikä on tunnettu koneoppimisen kirjasto Pythonille?;TensorFlow;mediafile.png
2;Web;200;Mikä HTML-elementti käytetään linkin luomiseen?;Some Answer // Next Row;
```

- Categories and values must match across all questions for the board to render correctly.
- If you add a new category, supply a full set of values for it.
- For media, use supported formats listed in `src/mediaTypes.ts` add more if needed
- Save the file as UTF-8 CSV 
- You can define a CSV parser character in `/src/constants.ts`
- After editing, restart the app or use the in-app settings panel to reload questions.

## Configuration via constants

You can edit `/src/constants.ts` to change game settings such as:
- Maximum player count
- Default player count
- Questions CSV file path (`QUESTIONS_CSV_PATH`)
- CSV parser character

This makes it easy to switch question files, adjust player limits, or add new configuration options.
