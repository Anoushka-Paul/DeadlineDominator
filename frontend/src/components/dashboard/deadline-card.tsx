"use client"

import { useState } from "react"
import { format, formatDistanceToNow } from 'date-fns'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Deadline } from "@/lib/types"
import { Calendar, Edit, MoreVertical, Tag, Trash2, Book, Clock4 } from "lucide-react"
import { DeadlineForm } from "./deadline-form"
import { cn } from "@/lib/utils"

interface DeadlineCardProps {
  deadline: Deadline;
  onUpdate: (deadline: Deadline) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export function DeadlineCard({ deadline, onUpdate, onToggleComplete, onDelete }: DeadlineCardProps) {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const isOverdue = !deadline.isCompleted && new Date(deadline.dueDate) < new Date();

  return (
    <Card className={cn("flex flex-col transition-all hover:shadow-lg hover:-translate-y-1", deadline.isCompleted && "bg-card/50", isOverdue && "border-destructive/50")}>
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="space-y-1.5">
          <CardTitle className="font-headline text-lg">{deadline.subject}</CardTitle>
          <CardDescription className="line-clamp-2">{deadline.description}</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent>
                 <DialogHeader>
                  <DialogTitle>Edit Deadline</DialogTitle>
                  <DialogDescription>
                    Update the details for your deadline.
                  </DialogDescription>
                </DialogHeader>
                <DeadlineForm 
                  deadline={deadline}
                  onSubmit={onUpdate}
                  onClose={() => setEditDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
            <DropdownMenuItem onClick={() => onDelete(deadline.id)} className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="space-y-3 flex-grow">
         <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          <span>
            {format(new Date(deadline.dueDate), "EEE, MMM d, yyyy")}
          </span>
        </div>
        <div className="flex items-center gap-4">
          {deadline.marks && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Tag className="mr-2 h-4 w-4" />
              <span>Marks: {deadline.marks}</span>
            </div>
          )}
          {deadline.credits && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Book className="mr-2 h-4 w-4" />
              <span>Credits: {deadline.credits}</span>
            </div>
          )}
        </div>
        {deadline.effort && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock4 className="mr-2 h-4 w-4" />
            <span>~{deadline.effort} days effort</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div>
          {deadline.isCompleted ? (
            <Badge variant="success">Completed</Badge>
          ) : isOverdue ? (
            <Badge variant="destructive">
              Overdue by {formatDistanceToNow(new Date(deadline.dueDate))}
            </Badge>
          ) : (
            <Badge>
              Due in {formatDistanceToNow(new Date(deadline.dueDate))}
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id={`complete-${deadline.id}`} 
            checked={deadline.isCompleted} 
            onCheckedChange={(checked) => onToggleComplete(deadline.id, !!checked)}
            aria-label="Mark as complete"
          />
          <label
            htmlFor={`complete-${deadline.id}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {deadline.isCompleted ? "Done" : "Mark as done"}
          </label>
        </div>
      </CardFooter>
    </Card>
  )
}
