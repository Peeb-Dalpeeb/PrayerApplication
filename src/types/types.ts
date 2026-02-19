export type ActivityRecord = {
  id: string;
  student: string;
  action: 'spinner' | 'prayer';
  timestamp: Date;
};