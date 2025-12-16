"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Deadline } from "@/lib/types"
import { DeadlineCard } from "./deadline-card"
import { Archive, CheckCircle, Clock } from "lucide-react"

interface HistoryProps {
  dueDeadlines: Deadline[];
  completedDeadlines: Deadline[];
  overdueDeadlines: Deadline[];
  onUpdate: (deadline: Deadline) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

function DeadlineList({ deadlines, onUpdate, onToggleComplete, onDelete, emptyMessage }: { deadlines: Deadline[], onUpdate: (deadline: Deadline) => void, onToggleComplete: (id: string, completed: boolean) => void, onDelete: (id: string) => void, emptyMessage: string }) {
  if (deadlines.length === 0) {
    return <p className="text-muted-foreground mt-4">{emptyMessage}</p>
  }
  return (
    <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {deadlines.map(deadline => (
        <DeadlineCard 
          key={deadline.id}
          deadline={deadline}
          onUpdate={onUpdate}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export function History({ dueDeadlines, completedDeadlines, overdueDeadlines, onUpdate, onToggleComplete, onDelete }: HistoryProps) {
  return (
    <section>
      <h2 className="text-2xl font-headline font-bold mb-4">All Deadlines</h2>
      <Tabs defaultValue="due">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="due"><Clock className="w-4 h-4 mr-2" />Due ({dueDeadlines.length})</TabsTrigger>
          <TabsTrigger value="completed"><CheckCircle className="w-4 h-4 mr-2" />Completed ({completedDeadlines.length})</TabsTrigger>
          <TabsTrigger value="overdue"><Archive className="w-4 h-4 mr-2" />Overdue ({overdueDeadlines.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="due">
          <DeadlineList deadlines={dueDeadlines} onUpdate={onUpdate} onToggleComplete={onToggleComplete} onDelete={onDelete} emptyMessage="No deadlines are currently due." />
        </TabsContent>
        <TabsContent value="completed">
          <DeadlineList deadlines={completedDeadlines} onUpdate={onUpdate} onToggleComplete={onToggleComplete} onDelete={onDelete} emptyMessage="No deadlines completed yet." />
        </TabsContent>
        <TabsContent value="overdue">
          <DeadlineList deadlines={overdueDeadlines} onUpdate={onUpdate} onToggleComplete={onToggleComplete} onDelete={onDelete} emptyMessage="No overdue deadlines." />
        </TabsContent>
      </Tabs>
    </section>
  )
}
