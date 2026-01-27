'use client';

import { useState, useMemo } from 'react';
import type { Deadline, Exam } from '@/lib/types';
import { initialDeadlines, initialExams } from '@/lib/data';
import { DashboardHeader } from '@/components/dashboard/header';
import { PriorityDeadlines } from '@/components/dashboard/priority-deadlines';
import { History } from '@/components/dashboard/history';
import { ExamSchedule } from '@/components/dashboard/exam-schedule';
import { useToast } from "@/hooks/use-toast"

export default function Home() {
  const [deadlines, setDeadlines] = useState<Deadline[]>(initialDeadlines);
  const [exams, setExams] = useState<Exam[]>(initialExams);
  const { toast } = useToast();

  const handleUpdateDeadline = (updatedDeadline: Deadline) => {
    setDeadlines(deadlines.map(d => d.id === updatedDeadline.id ? updatedDeadline : d));
    toast({
      title: "Deadline Updated",
      description: `"${updatedDeadline.subject}" has been updated.`,
    });
  };

  const handleAddDeadline = (newDeadline: Omit<Deadline, 'id' | 'isCompleted'>) => {
    const deadlineToAdd: Deadline = {
      ...newDeadline,
      id: crypto.randomUUID(),
      effort: Math.floor(Math.random() * 7) + 1, // Random effort from 1 to 7 days
      isCompleted: false,
    };
    setDeadlines([deadlineToAdd, ...deadlines]);
    toast({
      title: "Deadline Added",
      description: `"${deadlineToAdd.subject}" has been added.`,
    });
  };
  
  const handleToggleComplete = (deadlineId: string, isCompleted: boolean) => {
    setDeadlines(deadlines.map(d => d.id === deadlineId ? { ...d, isCompleted } : d));
    const deadline = deadlines.find(d => d.id === deadlineId);
    if(deadline) {
      toast({
        title: isCompleted ? "Congratulations!" : "Task Incomplete",
        description: `You've marked "${deadline.subject}" as ${isCompleted ? 'completed' : 'not completed'}.`,
        variant: isCompleted ? "success" : "default",
      });
    }
  };
  
  const handleDeleteDeadline = (deadlineId: string) => {
    const deadline = deadlines.find(d => d.id === deadlineId);
    setDeadlines(deadlines.filter(d => d.id !== deadlineId));
    if (deadline) {
      toast({
        title: "Deadline Deleted",
        description: `"${deadline.subject}" has been removed.`,
        variant: "destructive",
      });
    }
  };

  const handleAddExam = (newExam: Omit<Exam, 'id'>) => {
    const examToAdd: Exam = {
      ...newExam,
      id: crypto.randomUUID(),
    };
    setExams([examToAdd, ...exams]);
     toast({
      title: "Exam Scheduled",
      description: `"${examToAdd.subject}" has been added to your schedule.`,
    });
  };
  
  const handleDeleteExam = (examId: string) => {
    const exam = exams.find(e => e.id === examId);
    setExams(exams.filter(e => e.id !== examId));
    if(exam) {
      toast({
        title: "Exam Deleted",
        description: `"${exam.subject}" has been removed.`,
        variant: "destructive",
      });
    }
  };

  const { upcomingDeadlines, overdueDeadlines, completedDeadlines, dueDeadlines } = useMemo(() => {
    const now = new Date();
    const upcoming: Deadline[] = [];
    const overdue: Deadline[] = [];
    const completed: Deadline[] = [];
    const due: Deadline[] = [];

    [...deadlines].sort((a,b) => a.dueDate.getTime() - b.dueDate.getTime()).forEach(d => {
      if (d.isCompleted) {
        completed.push(d);
      } else if (d.dueDate < now) {
        overdue.push(d);
      } else {
        upcoming.push(d);
      }
    });
    
    // The `due` array for the "Due" tab in history should only contain non-overdue items
    const dueItems = deadlines.filter(d => !d.isCompleted && d.dueDate >= now).sort((a,b) => a.dueDate.getTime() - b.dueDate.getTime());
    due.push(...dueItems);

    return {
      upcomingDeadlines: upcoming,
      overdueDeadlines: overdue,
      completedDeadlines: completed.sort((a,b) => b.dueDate.getTime() - a.dueDate.getTime()),
      dueDeadlines: due,
    };
  }, [deadlines]);
  
  const sortedExams = useMemo(() => {
    return [...exams].sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [exams]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <DashboardHeader onAddDeadline={handleAddDeadline} />
      <main className="flex-1 p-4 md:p-8 lg:p-10">
        <div className="grid gap-10 lg:grid-cols-3 xl:grid-cols-4">
          <div className="lg:col-span-2 xl:col-span-3 space-y-10">
            <PriorityDeadlines 
              deadlines={upcomingDeadlines}
              onUpdate={handleUpdateDeadline}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteDeadline}
            />
            <History
              dueDeadlines={dueDeadlines}
              completedDeadlines={completedDeadlines}
              overdueDeadlines={overdueDeadlines}
              onUpdate={handleUpdateDeadline}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteDeadline}
            />
          </div>
          <div className="lg:col-span-1 xl:col-span-1">
            <ExamSchedule 
              exams={sortedExams} 
              onAddExam={handleAddExam}
              onDeleteExam={handleDeleteExam}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
