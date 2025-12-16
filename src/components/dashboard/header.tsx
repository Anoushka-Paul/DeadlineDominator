"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { DeadlineForm } from "./deadline-form"
import type { Deadline } from "@/lib/types"

interface DashboardHeaderProps {
  onAddDeadline: (newDeadline: Omit<Deadline, 'id' | 'isCompleted'>) => void;
}

export function DashboardHeader({ onAddDeadline }: DashboardHeaderProps) {
  const [isAddDialogOpen, setAddDialogOpen] = useState(false)

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 md:px-8 border-b bg-background/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-7 h-7 text-primary"
          >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="m16.2 7.8-8.4 8.4" />
            <path d="M12.5 12.5h-1v-1h1v1z" fill="currentColor"/>
        </svg>
        <h1 className="text-xl font-bold tracking-tight font-headline">Deadline Dominator</h1>
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
    </header>
  )
}
