export const normalizeQuestion = (value: string) => value.trim().replace(/\s+/g, ' ').slice(0, 500);

export const majorityWinner = (options: string[], playerCount: number) => {
  const counts = options.reduce<Record<string, number>>((result, option) => ({ ...result, [option]: (result[option] || 0) + 1 }), {});
  const threshold = Math.floor(playerCount / 2) + 1;
  return Object.entries(counts).find(([, count]) => count >= threshold)?.[0] || null;
};

export const theoryIsComplete = (answers: Record<string, unknown>, requiredFields: string[]) => requiredFields.every((field) => String(answers[field] || '').trim().length > 0);
