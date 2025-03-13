
export const checkUpdateTime = (firestoreTimestamp: any) => {
  const timestampMillis = firestoreTimestamp.toMillis(); // Convert Firestore Timestamp to milliseconds
  return isOlderThan15Minutes(timestampMillis);
};
const isOlderThan15Minutes = (timestamp: any) => {
    const fifteenMinutesAgo = Date.now() - 3 * 60 * 1000; // Current time - 15 minutes
    return timestamp < fifteenMinutesAgo;
  };
  

  