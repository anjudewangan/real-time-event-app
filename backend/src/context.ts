export function createContext({ req }: any) {
  const user = { id: "mock-user-id" };
  return { user };
}