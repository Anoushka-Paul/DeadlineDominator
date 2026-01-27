"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { GraduationCap, PlusCircle, CalendarDays } from "lucide-react"
import { useState } from "react"
import { DeadlineForm } from "./deadline-form"
import type { Deadline } from "@/lib/types"
import { format } from "date-fns"

interface DashboardHeaderProps {
  onAddDeadline: (newDeadline: Omit<Deadline, 'id' | 'isCompleted'>) => void;
}

export function DashboardHeader({ onAddDeadline }: DashboardHeaderProps) {
  const [isAddDialogOpen, setAddDialogOpen] = useState(false)

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 md:px-8 border-b bg-background/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <GraduationCap className="w-7 h-7 text-primary" />
        <h1 className="text-xl font-bold tracking-tight font-headline">Internal Marks Bachao</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>{`Date: ${format(new Date(), "dd/MM/yyyy")}`}</span>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Deadline
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Deadline</DialogTitle>
              <DialogDescription>
                Fill in the details for your new deadline.
              </DialogDescription>
            </DialogHeader>
            <DeadlineForm 
              onSubmit={onAddDeadline} 
              onClose={() => setAddDialogOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      </div>
    </header>
  )
}
