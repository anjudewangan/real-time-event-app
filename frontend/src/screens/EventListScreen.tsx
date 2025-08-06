import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { gql, useQuery } from '@apollo/client';

const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      name
      location
      startTime
    }
  }
`;

export default function EventListScreen({ navigation }: any) {
  const { data, loading, error } = useQuery(GET_EVENTS);

  if (loading) return <Text>Loading events...</Text>;
  if (error) return <Text>Error loading events.</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Events</Text>
      <FlatList
        data={data.events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.eventItem}
            onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}
          >
            <Text style={styles.eventName}>{item.name}</Text>
            <Text style={styles.eventMeta}>
              {item.location} • {new Date(item.startTime).toLocaleString()}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  eventItem: {
    padding: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginBottom: 12,
  },
  eventName: { fontSize: 18, fontWeight: '600' },
  eventMeta: { fontSize: 14, color: '#555', marginTop: 4 },
});
