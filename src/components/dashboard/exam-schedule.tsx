"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusCircle, BookOpen } from "lucide-react"
import { useState } from "react"
import type { Exam } from "@/lib/types"
import { ExamForm } from "./exam-form"
import { ExamCard } from "./exam-card"

interface ExamScheduleProps {
  exams: Exam[];
  onAddExam: (newExam: Omit<Exam, 'id'>) => void;
  onDeleteExam: (id: string) => void;
}

export function ExamSchedule({ exams, onAddExam, onDeleteExam }: ExamScheduleProps) {
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);

  return (
    <Card className="sticky top-24">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="font-headline">Exam Schedule</CardTitle>
          <CardDescription>Your upcoming exams.</CardDescription>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="icon" variant="ghost">
              <PlusCircle />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Exam</DialogTitle>
              <DialogDescription>
                Add a new exam to your schedule.
              </DialogDescription>
            </DialogHeader>
            <ExamForm
              onSubmit={onAddExam}
              onClose={() => setAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {exams.length > 0 ? (
          <div className="space-y-4">
            {exams.map(exam => (
              <ExamCard key={exam.id} exam={exam} onDelete={onDeleteExam} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 border-dashed border rounded-lg">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-center">No exams scheduled. Add one to get started.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
