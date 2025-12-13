export type Deadline = {
  id: string;
  subject: string;
  description: string;
  marks?: string;
  dueDate: Date;
  isCompleted: boolean;
};

export type Exam = {
  id: string;
  subject: string;
  date: Date;
};
