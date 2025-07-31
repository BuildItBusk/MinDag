# Skoleskema - School Schedule App

A simple static web app that displays the current day's school schedule with visual indicators for completed, current, and upcoming classes.

## Features

- **Current Day Detection**: Automatically detects and displays today's schedule
- **Visual Status Indicators**: 
  - 🟢 Completed classes (grayed out)
  - 🟡 Current class (highlighted in yellow)
  - 🔵 Upcoming classes (normal display)
- **After-School Activities**: Includes activities like Boy Scouts
- **Responsive Design**: Works on desktop and mobile devices
- **Danish Language**: Interface in Danish

## Files

- `index.html` - Main HTML structure
- `styles.css` - Styling and visual design
- `script.js` - JavaScript logic for schedule display
- `schedule.json` - Schedule data (modify this to update the schedule)

## Local Development

1. Clone or download the files
2. Open `index.html` in a web browser
3. The app will automatically load today's schedule

## Deployment to Vercel

1. Create a GitHub repository and push these files
2. Go to [Vercel](https://vercel.com) and sign up/login
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect it as a static site
6. Deploy - your app will be live at a Vercel URL

## Customizing the Schedule

Edit `schedule.json` to update the schedule:

```json
{
  "schedule": {
    "monday": [
      {
        "time": "08:00-08:45",
        "name": "Matematik",
        "type": "class"
      }
    ]
  }
}
```

### Schedule Item Properties:
- `time`: Time slot (format: "HH:MM-HH:MM")
- `name`: Class or activity name
- `type`: "class", "break", or "activity"

## Browser Compatibility

Works in all modern browsers that support:
- ES6+ JavaScript
- CSS Grid/Flexbox
- Fetch API

## License

MIT License - feel free to modify and use as needed. 