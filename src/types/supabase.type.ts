import type { Session, User } from "@supabase/supabase-js";

export type SupabaseSession = Session | null;
export type SupabaseUser = User | null;