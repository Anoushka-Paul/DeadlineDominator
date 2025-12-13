"use client"

import { format, formatDistanceToNow } from 'date-fns'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Exam } from "@/lib/types"
import { BookCopy, MoreVertical, Trash2 } from "lucide-react"

interface ExamCardProps {
  exam: Exam;
  onDelete: (id: string) => void;
}

export function ExamCard({ exam, onDelete }: ExamCardProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-card/50 hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="bg-primary/20 text-primary p-2 rounded-lg">
            <BookCopy className="w-5 h-5"/>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm">{exam.subject}</span>
          <span className="text-xs text-muted-foreground">
            {format(new Date(exam.date), 'EEE, MMM d @ h:mm a')}
          </span>
           <span className="text-xs text-primary font-medium">
            in {formatDistanceToNow(new Date(exam.date))}
          </span>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="w-8 h-8 flex-shrink-0">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onDelete(exam.id)} className="text-destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
