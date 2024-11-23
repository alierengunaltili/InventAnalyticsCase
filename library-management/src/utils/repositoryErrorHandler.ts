

// export async function safeExecute<T>(operation: () => Promise<T>): Promise<T> {
//   try {
//     return await operation();
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw error;
//   }
// }