import type { Deadline, Exam } from './types';

export const initialDeadlines: Deadline[] = [
  {
    id: '1',
    subject: 'History Essay',
    description: 'Write a 2000-word essay on the fall of the Roman Empire.',
    marks: "25",
    credits: "3",
    effort: 5,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 3)),
    isCompleted: false,
  },
  {
    id: '2',
    subject: 'Math Assignment',
    description: 'Complete problems 1-20 from Chapter 5.',
    marks: '10%',
    credits: "4",
    effort: 2,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    isCompleted: false,
  },
  {
    id: '3',
    subject: 'Physics Lab Report',
    description: 'Submit the report for the "Optics" experiment.',
    credits: "2",
    effort: 3,
    dueDate: new Date(new Date().setDate(new Date().getDate() - 2)),
    isCompleted: false,
  },
  {
    id: '4',
    subject: 'Art Project',
    description: 'Final submission of the sculpture project.',
    credits: "5",
    effort: 10,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 10)),
    isCompleted: true,
  },
    {
    id: '5',
    subject: 'Literature Reading',
    description: 'Read chapters 1-5 of "To Kill a Mockingbird".',
    credits: "1",
    effort: 1,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    isCompleted: false,
  },
];

export const initialExams: Exam[] = [
  {
    id: 'e1',
    subject: 'Calculus II Mid-term',
    date: new Date(new Date(new Date().setDate(new Date().getDate() + 14)).setHours(10, 30, 0, 0)),
  },
  {
    id: 'e2',
    subject: 'European History Final',
    date: new Date(new Date(new Date().setDate(new Date().getDate() + 25)).setHours(14, 0, 0, 0)),
  },
  {
    id: 'e3',
    subject: 'Chemistry Final',
    date: new Date(new Date(new Date().setDate(new Date().getDate() + 45)).setHours(9, 0, 0, 0)),
  },
];
