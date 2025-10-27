// Временная заглушка
export const supabase = {
  from: () => ({
    select: () => ({
      eq: () => ({
        order: () => Promise.resolve({ data: [], error: null })
      }),
      single: () => Promise.resolve({ data: null, error: null })
    }),
    insert: () => Promise.resolve({ error: null }),
    update: () => Promise.resolve({ error: null }),
    delete: () => Promise.resolve({ error: null })
  }),
  channel: () => ({
    on: () => ({
      subscribe: () => ({})
    })
  })
};
