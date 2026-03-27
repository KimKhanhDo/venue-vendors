import { z as zod } from 'zod';

// zod handles checking input data

// SignUp
export const signUpSchema = zod.object({
  role: zod.enum(['hirer', 'vendor'], { message: 'Please select a role' }),
  firstName: zod.string().min(1, 'First name is required'),
  lastName: zod.string().min(1, 'Last name is required'),
  username: zod.string().min(3, 'Username must have at least 3 characters'),
  email: zod.string().email('Email is not valid'),
  password: zod
    .string()
    .min(6, 'Password must have at least 6 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});

export type SignUpFormValues = zod.infer<typeof signUpSchema>;

// LogIn
export const logInSchema = zod.object({
  email: zod.string().min(1, 'Email is not valid'),
  password: zod.string().min(1, 'Password must have at least 6 characters'),
});

export type LogInFormValues = zod.infer<typeof logInSchema>;
