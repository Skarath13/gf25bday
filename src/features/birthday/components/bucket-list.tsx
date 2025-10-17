import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Command } from '@/components/ui/command'
import { Target } from 'lucide-react'

const initialPlans = [
  { id: 1, text: 'Prepare the nursery for our baby girl', completed: false },
  { id: 2, text: 'Take maternity photos together', completed: false },
  { id: 3, text: 'Plan a babymoon getaway', completed: false },
  { id: 4, text: 'Pick out the perfect name for our daughter', completed: false },
  { id: 5, text: 'Celebrate becoming parents together in January', completed: false },
  { id: 6, text: 'Create more beautiful memories as a family of three', completed: false },
]

export function BucketList() {
  const [plans, setPlans] = useState(initialPlans)

  const togglePlan = (id: number) => {
    setPlans((prev) =>
      prev.map((plan) =>
        plan.id === id ? { ...plan, completed: !plan.completed } : plan
      )
    )
  }

  const completedCount = plans.filter((p) => p.completed).length

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Our Future Plans
        </CardTitle>
        <CardDescription>
          Things we want to do together
          <span className="ml-2 text-primary font-semibold">
            {completedCount}/{plans.length} completed
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Command className="border-none p-0">
          <div className="space-y-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-accent/5 transition-colors touch-manipulation"
              >
                <Checkbox
                  id={`plan-${plan.id}`}
                  checked={plan.completed}
                  onCheckedChange={() => togglePlan(plan.id)}
                  className="mt-1 h-5 w-5 touch-manipulation"
                />
                <label
                  htmlFor={`plan-${plan.id}`}
                  className={`
                    flex-1 text-sm leading-relaxed cursor-pointer
                    ${plan.completed ? 'line-through text-muted-foreground' : 'text-foreground'}
                    transition-all
                  `}
                >
                  {plan.text}
                </label>
              </div>
            ))}
          </div>
        </Command>

        <div className="mt-4 pt-4 border-t text-center">
          <p className="text-xs text-muted-foreground">
            💡 Edit these to add your real future plans together
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
