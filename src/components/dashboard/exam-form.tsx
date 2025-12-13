"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { Exam } from "@/lib/types"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { useState } from "react"

const formSchema = z.object({
  subject: z.string().min(2, "Subject must be at least 2 characters.").max(50),
  date: z.date({
    required_error: "An exam date and time is required.",
  }),
})

type ExamFormValues = z.infer<typeof formSchema>

interface ExamFormProps {
  exam?: Exam;
  onSubmit: (data: Omit<Exam, 'id'>) => void;
  onClose: () => void;
}

export function ExamForm({ exam, onSubmit, onClose }: ExamFormProps) {
    const [time, setTime] = useState(exam ? format(new Date(exam.date), "HH:mm") : "09:00");
  
    const form = useForm<ExamFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: exam ? { ...exam, date: new Date(exam.date) } : {
      subject: "",
      date: undefined,
    },
  })

  function handleSubmit(data: ExamFormValues) {
    const [hours, minutes] = time.split(':').map(Number);
    const combinedDate = new Date(data.date);
    combinedDate.setHours(hours, minutes, 0, 0);

    onSubmit({ ...data, date: combinedDate });
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
                <Input placeholder="e.g. Calculus II Final" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Exam Date</FormLabel>
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
          <FormItem>
            <FormLabel>Time</FormLabel>
            <FormControl>
                <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </FormControl>
          </FormItem>
        </div>
        <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit">{exam ? "Save Changes" : "Add Exam"}</Button>
        </div>
      </form>
    </Form>
  )
}
