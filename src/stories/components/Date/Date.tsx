import React from "react";

interface TimestampDateProps {
  timestamp: string;
}

const TimestampDate = ({ timestamp }: TimestampDateProps) => {
  const formatTimestamp = (timestamp: number | string | Date): string => {
    const date = new globalThis.Date(timestamp);

    const pad = (n: number): string => n.toString().padStart(2, "0");

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // Months are 0-based
    const year = date.getFullYear().toString().slice(-2);
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  };
  return <>{formatTimestamp(timestamp)}</>;
};
export default TimestampDate;
