# EditPost Component

A flexible, reusable component for creating and editing social media posts across the application.

## Overview

The EditPost component is designed as a modal that appears when users want to create or edit a post. It works in various contexts:

- **Calendar Integration**: Opens when users click on a post in the calendar
- **Post List Integration**: Opens when users click on a post in a list view
- **Create New Post**: Opens from a "Create Post" button anywhere in the application

## Architecture

The component is built with a modern React architecture using:

1. **Component**: `EditPost.tsx` - The main component with the UI
2. **Hook**: `use-edit-post.tsx` - Custom hook for state management
3. **Context**: `EditPostProvider.tsx` - React context for global access
4. **Integration Components**: Example integrations with Calendar and other components

## Usage

### 1. Wrap your app with the provider

Add the `EditPostProvider` to your application, typically in `App.tsx`:

```tsx
import { EditPostProvider } from '@/context/EditPostProvider';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <EditPostProvider>
        {/* rest of your app */}
      </EditPostProvider>
    </QueryClientProvider>
  );
}
```

### 2. Use the component in different scenarios

#### Creating a new post

```tsx
import { useEditPostContext } from '@/context/EditPostProvider';

const CreateButton = () => {
  const { onOpen } = useEditPostContext();
  
  return (
    <button onClick={() => onOpen()}>
      Create New Post
    </button>
  );
};
```

#### Editing an existing post

```tsx
import { useEditPostContext } from '@/context/EditPostProvider';

const EditButton = ({ postId }) => {
  const { onOpen } = useEditPostContext();
  
  return (
    <button onClick={() => onOpen(postId)}>
      Edit Post
    </button>
  );
};
```

#### Calendar Integration

To integrate with the Calendar component, use the EventRenderer component:

```tsx
import { Calendar } from '@/components/Calendar';
import EventRenderer from '@/components/calendar/EventRenderer';

const CalendarPage = () => {
  // Your calendar setup code
  
  return (
    <Calendar 
      events={events}
      onEventsChange={handleEventsChange}
      // Pass a custom renderer function that uses EventRenderer
      renderEvent={(event, view) => (
        <EventRenderer event={event} view={view} />
      )}
    />
  );
};
```

## Props

The `EditPost` component accepts the following props:

```typescript
interface EditPostProps {
  isOpen: boolean;              // Whether the modal is currently open
  onClose: () => void;          // Function to call when closing the modal
  post: PostData;               // The post data to edit
  onSave: (post: PostData) => void;    // Function to call when saving
  onDelete?: () => void;        // Optional function to call when deleting
  onGenerate?: (prompt: string) => void; // Optional function for AI generation
}
```

## Data Structure

The component uses the following data structure for posts:

```typescript
interface PostData {
  id?: number | string;         // Optional for new posts
  title: string;                // Post title
  content: string;              // Post content/caption
  hashtags: string[];           // Array of hashtags
  mediaUrl: string[];           // Array of media URLs
  socialPlatforms: Record<PlatformName, boolean>; // Enabled platforms
  postType: {                   // Type of post
    post: boolean;
    story: boolean;
    reel: boolean;
  };
  scheduledDate: string;        // Scheduled date in ISO format
}
```

## Customization

The component is designed to be flexible and customizable. You can:

1. Modify the UI in `EditPost.tsx`
2. Extend the data structure for additional fields
3. Customize the behavior in `use-edit-post.tsx`
4. Add new integration components for specific use cases

## Future Enhancements

- Add image upload capability
- Integrate with a rich text editor
- Add preview functionality for different platforms
- Support for additional post types
- Analytics and performance tracking