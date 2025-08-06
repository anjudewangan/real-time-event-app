import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { io } from "socket.io-client";


type EventDetailParams = {
  EventDetail: {
    eventId: string;
  };
};

const socket = io("http://localhost:4000"); 

const EventDetailScreen = () => {
  const route = useRoute<RouteProp<EventDetailParams, "EventDetail">>();
  const { eventId } = route.params;

  useEffect(() => {
    socket.emit("joinRoom", eventId);

    socket.on("userJoined", (user) => {
      console.log("New user joined:", user);

    });

    return () => {
      socket.off("userJoined");
    };
  }, [eventId]);

  return (
    <View>
      <Text>Event Detail Screen</Text>
      <Text>Event ID: {eventId}</Text>
    </View>
  );
};

export default EventDetailScreen;
