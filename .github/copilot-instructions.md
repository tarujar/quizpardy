## quizpardy – Developement Guide

### 1. Purpose
Jeopardy-style local party quiz. React + TypeScript (Vite). Supports text questions plus optional audio/video.

### 2. Core Components
- `App.tsx`: Owns top-level state; switches between setup (`GameInit`) and play (`GamePlay`).
- `GameInit.tsx`: Player creation (names, emojis).
- `GamePlay.tsx`: Renders the board, relays question clicks to `QuestionElement`.
- `QuestionElement.tsx`: Displays question + optional media, handles reveal/answer flow.
- `EmojiPicker.tsx`: Emoji avatar chooser.

### 3. Data & Media
- `questions.ts`:
  - `Question` = `{ id; category; value; question; answer; mediaUrl? }`
  - `sampleQuestions`: auto-generated fillers.
  - `prodQuestions`: real set, backfilled with samples if gaps.
- `mediaTypes.ts`: Allowed audio (`mp3`,`wav`,`ogg`) & video (`mp4`,`webm`,`mov`). Extend here to add formats.
Use `prodQuestions` for play; `sampleQuestions` only for demos/tests.

### 4. Architecture & State
- Players + used questions persisted in cookies.
- Reset everything via the UI “Reset Game” button.
- Flow: `App` → (no players) `GameInit` | (players ready) `GamePlay` → per question `QuestionElement`.

### 5. Styling
- Global base: `index.css`; layout/component styles: `App.css`.
- **Centralized styles**: Use `styles` object from `/src/style.ts` for all UI components.
- **Available styles**: `goldButton`, `awardButton`, `deductButton`, `playerButton(selected)`, `playerCard`, etc.
- **Best practice**: Import `{ styles } from './style'` and use `style={styles.buttonName}` instead of inline styles.
- **Adding new styles**: Add to `/src/style.ts` for reusability; avoid duplicating similar styles.
- Define theme tokens in `:root` for colors/spacing that styles reference.

### 6. Lint & Formatting
ESLint + Prettier recommended. Non-critical warnings (e.g., index keys) can be fixed iteratively.

### 7. Extending
- Add a question: append to `prodQuestions` (unique `id`, existing `category`).
- Add a category: update board category list + supply full value ladder + questions.
- Add media: set `mediaUrl` to a supported file (in `public/` or external URL).
- Support a new media format: add extension to `mediaTypes.ts` and ensure browser support.

### 8. Potential Enhancements
- Test suite (scoring logic, question selection, media type detection).
- Accessibility (keyboard navigation, aria labels for media controls).
- Theming via CSS variables.
- Cookie utilities module (encapsulate read/write/clear).

### 9. Dev Notes
- Start dev server: `npm run dev`
- If state misbehaves, clear cookies or press “Reset Game”.

End.