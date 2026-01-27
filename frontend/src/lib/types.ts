export type Deadline = {
  id: string;
  subject: string;
  description: string;
  marks?: string;
  credits?: string;
  effort?: number;
  dueDate: Date;
  isCompleted: boolean;
};

export type Exam = {
  id: string;
  subject: string;
  date: Date;
};
