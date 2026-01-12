# Travel Detail Page Structure

This directory contains a refactored, component-based structure for the travel/tour detail page.

## Directory Structure

```
[id]/
├── page.tsx                    # Main page component (clean entry point)
├── components/
│   ├── index.ts               # Component exports
│   ├── HeroSection.tsx        # Hero section with cover image & title
│   ├── ContentSection.tsx     # Main content wrapper
│   ├── LeftBlock.tsx          # Destination, highlights, distance info
│   ├── RightBlock.tsx         # Tour price, included, excluded items
│   ├── TypewriterTitle.tsx    # Animated typewriter effect
│   └── pickText.ts            # Text extraction utility (deprecated, use hook instead)
├── hooks/
│   ├── index.ts               # Hooks exports
│   └── usePickText.ts         # Custom hook for text extraction
└── README.md                  # This file
```

## Component Breakdown

### `page.tsx`

The main page component that:

- Orchestrates data fetching
- Prepares text content
- Composes HeroSection and ContentSection
- **Total lines: ~50** (Previously 304)

### `HeroSection.tsx`

Displays:

- Full-width cover image
- Animated title with typewriter effect
- Black gradient overlay

### `ContentSection.tsx`

Container for:

- Description text
- Left and Right info blocks (grid layout)
- Duration display
- Gallery slider

### `LeftBlock.tsx`

Shows:

- Destination
- Highlights
- Covering distance
- Icon indicator

### `RightBlock.tsx`

Shows:

- Tour price
- Included in price
- Excluded from price
- Icon indicator

### `TypewriterTitle.tsx`

Reusable component that:

- Animates text character by character
- Uses Framer Motion
- Responsive sizing

## Hooks

### `usePickText`

Custom hook that:

- Handles locale-specific text extraction
- Normalizes different field names
- Processes nested objects and arrays
- Returns a memoized callback

Usage:

```tsx
const pickText = usePickText(locale);
const title = pickText(travelData.title);
```

## Key Improvements

✅ **Separation of Concerns**: Each component has a single responsibility
✅ **Reusability**: Components can be used independently
✅ **Maintainability**: Easier to debug and modify specific sections
✅ **Readability**: Cleaner page.tsx with clear component composition
✅ **Performance**: Memoized components prevent unnecessary re-renders
✅ **Documentation**: Each component has JSDoc comments
✅ **Scalability**: Easy to add new sections or modify existing ones

## Code Reduction

- **Original**: 304 lines in single file
- **Refactored**: ~50 lines in page.tsx + organized components
- **Result**: 80%+ reduction in main page file

## Usage Example

```tsx
import { HeroSection, ContentSection } from "./components";
import { usePickText } from "./hooks";

const TravelDetailScreen = () => {
  const locale = useLocale();
  const pickText = usePickText(locale);

  return (
    <div>
      <HeroSection travel={data} titleText={title} />
      <ContentSection travel={data} pickText={pickText} />
    </div>
  );
};
```

## Future Enhancements

- [ ] Add testimonials section component
- [ ] Add related tours carousel component
- [ ] Add review section component
- [ ] Add booking form component
- [ ] Extract layout patterns to shared components
