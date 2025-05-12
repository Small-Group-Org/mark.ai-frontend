import React from 'react';
import { EditPostProvider, useEditPostContext } from '@/context/EditPostProvider';

// This is an example component that shows how to use the EditPost component
// in different scenarios

// Example 1: Button to create a new post
export const CreatePostButton: React.FC = () => {
  const { onOpen } = useEditPostContext();
  
  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2"
      onClick={() => onOpen()} // No ID means create a new post
    >
      Create New Post
    </button>
  );
};

// Example 2: Button to edit an existing post
interface EditPostButtonProps {
  postId: number | string;
}

export const EditPostButton: React.FC<EditPostButtonProps> = ({ postId }) => {
  const { onOpen } = useEditPostContext();
  
  return (
    <button
      className="text-blue-500 hover:text-blue-700"
      onClick={() => onOpen(postId)}
    >
      Edit Post
    </button>
  );
};

// Example of how to wrap your app with the provider
export const AppWithEditPost: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <EditPostProvider>
      {children}
    </EditPostProvider>
  );
};

// Example of how to integrate with App.tsx
/*
import { EditPostProvider } from '@/context/EditPostProvider';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <EditPostProvider>
        <ThemeProvider>
          <AuthProvider>
            <Toaster />
            <AuthInitializer>
              <Router />
            </AuthInitializer>
          </AuthProvider>
        </ThemeProvider>
      </EditPostProvider>
    </QueryClientProvider>
  );
}
*/