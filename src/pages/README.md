
# Dashboard Components

## New Components

### ClaimTokensCard

Displays the user's unclaimed token balance and provides a button to claim the tokens.

**Props:**
- `unclaimedTokens` (number): The amount of tokens the user can claim
- `onClaim` (function): Async function to call when the user claims their tokens

### JobsInProgress

Displays a list of jobs that the user has claimed but not yet completed.

**Props:**
- `jobs` (array): Array of job objects with the following properties:
  - `id` (string): Unique identifier for the job
  - `name` (string): Display name of the job
  - `progressPercent` (number): Current progress of the job (0-100)
  - `startedAt` (Date): When the job was started
- `onCancelJob` (function): Async function to call when cancelling a job
- `onJobComplete` (function): Function to call when a job is completed

## New Hooks

### useUnclaimedTokens

Manages the user's unclaimed token balance.

**Returns:**
- `unclaimedTokens` (number): The amount of tokens the user can claim
- `loading` (boolean): Whether the hook is currently loading data
- `error` (Error | null): Any error that occurred during loading
- `claimTokens` (function): Async function to claim tokens
- `refreshUnclaimedTokens` (function): Async function to refresh the token balance

### useInProgressJobs

Manages the jobs that the user has claimed but not yet completed.

**Returns:**
- `jobs` (array): Array of job objects
- `loading` (boolean): Whether the hook is currently loading data
- `error` (Error | null): Any error that occurred during loading
- `cancelJob` (function): Async function to cancel a job
- `completeJob` (function): Function to mark a job as complete
- `refreshJobs` (function): Async function to refresh the job list
