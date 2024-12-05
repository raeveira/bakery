'use server'

import {auth} from '@/lib/auth';

export default async function getSessionStatus() {
  return await auth()
}