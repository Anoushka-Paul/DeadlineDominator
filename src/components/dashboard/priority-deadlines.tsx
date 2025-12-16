"use client"
import type { Deadline } from "@/lib/types";
import { DeadlineCard } from "./deadline-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface PriorityDeadlinesProps {
  deadlines: Deadline[];
  onUpdate: (deadline: Deadline) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export function PriorityDeadlines({ deadlines, onUpdate, onToggleComplete, onDelete }: PriorityDeadlinesProps) {
  return (
    <section>
      <h2 className="text-2xl font-headline font-bold mb-4">Priority Deadlines</h2>
      {deadlines.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
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
      ) : (
        <Card className="flex flex-col items-center justify-center p-10 border-dashed">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No upcoming deadlines. Enjoy your break!</p>
        </Card>
      )}
    </section>
  )
}
