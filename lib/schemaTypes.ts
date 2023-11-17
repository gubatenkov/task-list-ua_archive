import {
  minLength,
  maxLength,
  literal,
  object,
  string,
  Output,
  union,
  email,
} from 'valibot'

export type TTaskLabel = Output<typeof TaskLabelSchema>
export const TaskLabelSchema = union([
  object({
    value: literal('bug'),
    label: literal('Bug'),
  }),
  object({
    value: literal('feature'),
    label: literal('Feature'),
  }),
  object({
    value: literal('documentation'),
    label: literal('Documentation'),
  }),
])

export type TTaskLabelValue = Output<typeof TaskLabelValueSchema>
export const TaskLabelValueSchema = union([
  literal('bug'),
  literal('feature'),
  literal('documentation'),
])

export type TTaskPriority = Output<typeof TaskPrioritySchema>
export const TaskPrioritySchema = union([
  object({
    icon: literal('ArrowDownIcon'),
    value: literal('low'),
    label: literal('Low'),
  }),
  object({
    icon: literal('ArrowRightIcon'),
    value: literal('medium'),
    label: literal('Medium'),
  }),
  object({
    icon: literal('ArrowUpIcon'),
    value: literal('high'),
    label: literal('High'),
  }),
])

export type TTaskPriorityValue = Output<typeof TaskPriorityValueSchema>
export const TaskPriorityValueSchema = union([
  literal('low'),
  literal('medium'),
  literal('high'),
])

export type TTaskStatus = Output<typeof TaskStatusSchema>
export const TaskStatusSchema = union([
  object({
    icon: literal('StopwatchIcon'),
    value: literal('in progress'),
    label: literal('In Progress'),
  }),
  object({
    icon: literal('CrossCircledIcon'),
    value: literal('canceled'),
    label: literal('Canceled'),
  }),
  object({
    icon: literal('QuestionMarkCircledIcon'),
    value: literal('backlog'),
    label: literal('Backlog'),
  }),
  object({
    icon: literal('CheckCircledIcon'),
    value: literal('done'),
    label: literal('Done'),
  }),
  object({
    icon: literal('CircleIcon'),
    value: literal('todo'),
    label: literal('Todo'),
  }),
])

export type TTaskStatusValueSchema = Output<typeof TaskStatusValueSchema>
export const TaskStatusValueSchema = union([
  literal('in progress'),
  literal('canceled'),
  literal('backlog'),
  literal('done'),
  literal('todo'),
])

export type TTask = Output<typeof TaskSchema>
export const TaskSchema = object({
  priority: TaskPriorityValueSchema,
  status: TaskStatusValueSchema,
  label: TaskLabelValueSchema,
  title: string(),
  id: string(),
})

export const UserEmailSchema = string([email('Enter a valid email')])
export const UserPasswordSchema = string([
  minLength(5, "Can't be less than 5 chars"),
  maxLength(20, "Can't be more than 20 chars"),
])
export const UserNameSchema = string([
  minLength(3, "Can't be less than 3 chars"),
  maxLength(15, "Can't be more than 15 chars"),
])
export type TLoginForm = Output<typeof LoginFormSchema>
export const LoginFormSchema = object({
  password: UserPasswordSchema,
  email: UserEmailSchema,
})
export type TRegisterForm = Output<typeof RegisterFormSchema>
export const RegisterFormSchema = object(
  {
    confirmPassword: string('Required', [minLength(1, 'Repeat the password')]),
    password: UserPasswordSchema,
    email: UserEmailSchema,
    name: UserNameSchema,
  },
  [
    (input) => {
      if (input.password !== input.confirmPassword) {
        return {
          issues: [
            {
              path: [
                {
                  value: input.confirmPassword,
                  key: 'confirmPassword',
                  schema: 'object',
                  type: 'object',
                  input,
                },
              ],
              message: "Passwords doesn't match",
              validation: 'custom',
              input,
            },
          ],
        }
      } else {
        return { output: input }
      }
    },
  ]
)
export const UserSchema = object({
  password: UserPasswordSchema,
  email: UserEmailSchema,
  name: UserNameSchema,
})
export const TaskFormSchema = object({
  title: string('Title must be a string.', [
    minLength(1, 'Please enter task title.'),
  ]),
  priority: TaskPriorityValueSchema,
  status: TaskStatusValueSchema,
})
