import { Timestamp } from "firebase/firestore";

export const formatDate = (timestamp: Timestamp): string => {
    const date = timestamp.toDate();
    return `${date.toLocaleDateString()} `;
  };
