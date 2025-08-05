export const resolvers = {
  Query: {
    events: () => [
      {
        id: "1",
        name: "Tech Fest",
        location: "Auditorium",
        startTime: new Date().toISOString(),
        attendees: []
      }
    ],
    me: (_: any, __: any, { user }: any) => user
  },
  Mutation: {
    joinEvent: async (_: any, { eventId }: any, { io, user }: any) => {
      const updatedEvent = {
        id: eventId,
        name: "Tech Fest",
        location: "Auditorium",
        startTime: new Date().toISOString(),
        attendees: [user]
      };

      io.emit("userJoined", { eventId, user });

      return updatedEvent;
    }
  }
};
