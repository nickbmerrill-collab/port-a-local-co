import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { fetchTasks, completeTask, Task } from "../lib/api";
import { getWorkerId } from "../lib/storage";

export default function MyTasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [workerId, setWorkerIdState] = useState<string | null>(null);

  const loadTasks = useCallback(async () => {
    try {
      const id = await getWorkerId();
      setWorkerIdState(id);
      if (!id) return;

      const data = await fetchTasks({ accepted_by: id, status: "accepted" });
      setTasks(data);
    } catch {
      // Silent fail
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [loadTasks])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  };

  const handleComplete = async (task: Task) => {
    Alert.alert(
      "Complete Task?",
      `Mark "${task.title}" as done?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Complete",
          onPress: async () => {
            try {
              await completeTask(task.id);
              loadTasks();
            } catch {
              Alert.alert("Error", "Could not complete task. Try again.");
            }
          },
        },
      ]
    );
  };

  if (!workerId) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>👤</Text>
        <Text style={styles.emptyTitle}>Setup Required</Text>
        <Text style={styles.emptyText}>
          Go to the Settings tab to enter your name and register.
        </Text>
      </View>
    );
  }

  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.acceptedBadge}>
          <Text style={styles.acceptedBadgeText}>In Progress</Text>
        </View>
      </View>

      {item.description && (
        <Text style={styles.cardDescription}>{item.description}</Text>
      )}

      {item.property && (
        <Text style={styles.cardProperty}>📍 {item.property}</Text>
      )}

      <Text style={styles.cardTime}>
        Accepted {new Date(item.accepted_at + "Z").toLocaleString()}
      </Text>

      <TouchableOpacity
        style={styles.completeButton}
        onPress={() => handleComplete(item)}
      >
        <Text style={styles.completeButtonText}>Mark Complete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyTitle}>No Active Tasks</Text>
            <Text style={styles.emptyText}>
              Accept a task from the Tasks tab to see it here.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  list: { padding: 16, paddingBottom: 32 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  cardTitle: { fontSize: 17, fontWeight: "700", color: "#1e293b", flex: 1 },
  acceptedBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    backgroundColor: "#dbeafe",
  },
  acceptedBadgeText: { fontSize: 11, fontWeight: "600", color: "#1d4ed8" },
  cardDescription: { fontSize: 14, color: "#64748b", marginBottom: 8 },
  cardProperty: { fontSize: 13, color: "#94a3b8", marginBottom: 4 },
  cardTime: { fontSize: 12, color: "#cbd5e1", marginBottom: 12 },
  completeButton: {
    backgroundColor: "#059669",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  completeButtonText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    paddingTop: 100,
  },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 22,
  },
});
