"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { Deadline } from "@/lib/types"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

const formSchema = z.object({
  subject: z.string().min(2, "Subject must be at least 2 characters.").max(50),
  description: z.string().min(3, "Description is required.").max(280),
  marks: z.string().optional(),
  dueDate: z.date({
    required_error: "A due date is required.",
  }),
})

type DeadlineFormValues = z.infer<typeof formSchema>

interface DeadlineFormProps {
  deadline?: Deadline;
  onSubmit: (data: Omit<Deadline, 'id' | 'isCompleted'> | Deadline) => void;
  onClose: () => void;
}

export function DeadlineForm({ deadline, onSubmit, onClose }: DeadlineFormProps) {
  const form = useForm<DeadlineFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: deadline ? { ...deadline, dueDate: new Date(deadline.dueDate) } : {
      subject: "",
      description: "",
      marks: "",
      dueDate: undefined,
    },
  })

  function handleSubmit(data: DeadlineFormValues) {
    if (deadline) {
      onSubmit({ ...deadline, ...data });
    } else {
      onSubmit(data);
    }
    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="e.g. History Essay" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g. Essay on the American Revolution" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="marks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marks (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 25 or 10%" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit">{deadline ? "Save Changes" : "Add Deadline"}</Button>
        </div>
      </form>
    </Form>
  )
}
