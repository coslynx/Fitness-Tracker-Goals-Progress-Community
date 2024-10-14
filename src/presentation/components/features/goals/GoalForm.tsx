'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { Input } from '@/presentation/components/ui/Input'
import { Button } from '@/presentation/components/ui/Button'
import { Spinner } from '@/presentation/components/ui/Spinner'
import { Select } from '@/presentation/components/ui/Select'
import { GoalType } from '@/types/goal'
import { createGoal, updateGoal } from '@/lib/api/client'
import { Goal } from '@/core/domain/entities/goal/Goal'
import { useGoals } from '@/lib/hooks/useGoals'
import { useUser } from '@/lib/hooks/useUser'
import { Modal } from '@/presentation/components/ui/Modal'
import { fetchGoals } from '@/lib/api/client'

interface GoalFormProps {
  initialGoalData?: Partial<Goal>
  onClose: () => void
}

const GoalForm: React.FC<GoalFormProps> = ({ initialGoalData, onClose }) => {
  const router = useRouter()
  const store = useStore()
  const { goals, isLoading, fetchGoals } = useGoals()
  const { user } = useUser()
  const [isLoadingForm, setIsLoadingForm] = useState(false)
  const [formData, setFormData] = useState<Partial<Goal>>(initialGoalData || {
    type: GoalType.weight_loss,
    targetValue: 0,
    deadline: new Date(),
  })
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (initialGoalData?.id) {
      setIsEditing(true)
      setFormData(initialGoalData)
    }
  }, [initialGoalData])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'deadline' ? new Date(value) : value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoadingForm(true)
    setError(null)

    try {
      if (isEditing) {
        await updateGoal(formData.id as string, formData)
      } else {
        const newGoal = await createGoal({ ...formData, userId: user?.id as string })
        store.addGoal(newGoal)
        setShowModal(true)
        // Fetch the updated goal list
        await fetchGoals(user?.id as string)
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoadingForm(false)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    onClose()
  }

  return (
    <>
      <Modal isOpen={showModal} onClose={handleCloseModal} title={isEditing ? 'Edit Goal' : 'New Goal'}>
        {isLoadingForm ? (
          <Spinner />
        ) : (
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <Select
              label='Goal Type'
              value={formData.type as GoalType}
              onChange={(value) => handleChange({ target: { name: 'type', value } })}
              options={[GoalType.weight_loss, GoalType.muscle_gain, GoalType.running_distance, GoalType.other]}
              error={error?.includes('type') ? 'Please select a goal type' : ''}
            />
            <Input
              type='number'
              id='targetValue'
              name='targetValue'
              label='Target Value'
              placeholder='Enter your target value'
              value={formData.targetValue || ''}
              onChange={handleChange}
              required
              error={error?.includes('targetValue') ? 'Please enter a valid target value' : ''}
            />
            <Input
              type='date'
              id='deadline'
              name='deadline'
              label='Deadline'
              value={formData.deadline ? formData.deadline.toISOString().slice(0, 10) : ''}
              onChange={handleChange}
              required
              error={error?.includes('deadline') ? 'Please select a valid deadline' : ''}
            />
            <Button type='submit' disabled={isLoadingForm} fullWidth>
              {isLoadingForm ? <Spinner size='sm' /> : isEditing ? 'Save Changes' : 'Create Goal'}
            </Button>
          </form>
        )}
      </Modal>
    </>
  )
}

export default GoalForm