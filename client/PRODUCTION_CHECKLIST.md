# Production Deployment Checklist

## Testing Code Removal

Before deploying to production, ensure all testing code is removed:

### Files to Delete Completely
- [ ] `client/src/utils/testingUtils.ts` - Delete entire file

### Code to Remove from Components

#### ChatPanel.tsx (`client/src/components/dashboard/ChatPanel.tsx`)
- [ ] Remove import: `import { exposeTestingFunctions, cleanupTestingFunctions } from "@/utils/testingUtils";`
- [ ] Remove comment: `// TESTING IMPORT - REMOVE BEFORE PRODUCTION`
- [ ] Remove entire testing section:
```typescript
/* ========================================
 * TESTING CODE - REMOVE BEFORE PRODUCTION
 * ======================================== */

// Expose testing functions globally (TESTING ONLY - REMOVE IN PRODUCTION)
React.useEffect(() => {
  exposeTestingFunctions();
  return cleanupTestingFunctions;
}, []);

/* ========================================
 * END OF TESTING CODE
 * ======================================== */
```

### Functions to Keep (Production Code)
- ✅ `createPostScheduledInfoMessage` - This is production code for other components to use
- ✅ All utility functions in `client/src/utils/infoMessageUtils.ts`
- ✅ All utility functions in `client/src/utils/calendarUtils.ts`
- ✅ All utility functions in `client/src/utils/postUtils.ts`

### Testing Functions Available in Development
When testing is needed during development, these functions are available in browser console:
- `window.testInfoMessages()` - Tests info message navigation
- `window.createPostScheduledInfoMessage(postId, scheduleDate, action)` - Creates test info messages

### Verification Steps
1. [ ] Search codebase for "TESTING" comments
2. [ ] Search codebase for "REMOVE BEFORE PRODUCTION" comments
3. [ ] Verify `testingUtils.ts` is deleted
4. [ ] Verify no imports from `testingUtils.ts` remain
5. [ ] Test that application works normally without testing code
6. [ ] Verify console shows no errors related to missing testing functions

## Additional Production Checks
- [ ] Remove any console.log statements used for debugging
- [ ] Verify all environment variables are set correctly
- [ ] Test info message functionality works in production environment
- [ ] Verify calendar navigation works correctly
- [ ] Test hashtag utilities work as expected 