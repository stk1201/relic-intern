import { storage, STORAGE_KEYS, uid } from '@/lib/storage'

export interface Inquiry {
  id: string
  universityName: string
  department: string
  contactName: string
  email: string
  message: string
  createdAt: string
}

/** 大学向けお問い合わせ（この端末のローカルストレージに保存。外部には送信されない） */
export const inquiryService = {
  async submit(input: Omit<Inquiry, 'id' | 'createdAt'>): Promise<Inquiry> {
    const inquiry: Inquiry = { ...input, id: uid(), createdAt: new Date().toISOString() }
    storage.set(STORAGE_KEYS.inquiries, [inquiry, ...storage.get<Inquiry[]>(STORAGE_KEYS.inquiries, [])])
    return inquiry
  },
}
