export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string | null
          email: string | null
          role: 'student' | 'admin'
          created_at: string
        }
        Insert: {
          id?: string
          name?: string | null
          email?: string | null
          role?: 'student' | 'admin'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          email?: string | null
          role?: 'student' | 'admin'
          created_at?: string
        }
      }
      programs: {
        Row: {
          id: string
          title: string
          description: string | null
          level: string | null
          price_monthly: number | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          level?: string | null
          price_monthly?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          level?: string | null
          price_monthly?: number | null
          created_at?: string
        }
      }
      // Add other tables here (enrollments, workouts, etc.)
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
