import * as SecureStore from "expo-secure-store";

const WORKER_ID_KEY = "worker_id";
const WORKER_NAME_KEY = "worker_name";
const WORKER_GROUP_KEY = "worker_group";
const API_URL_KEY = "api_url";

export async function getWorkerId(): Promise<string | null> {
  return SecureStore.getItemAsync(WORKER_ID_KEY);
}

export async function setWorkerId(id: string): Promise<void> {
  await SecureStore.setItemAsync(WORKER_ID_KEY, id);
}

export async function getWorkerName(): Promise<string | null> {
  return SecureStore.getItemAsync(WORKER_NAME_KEY);
}

export async function setWorkerName(name: string): Promise<void> {
  await SecureStore.setItemAsync(WORKER_NAME_KEY, name);
}

export async function getWorkerGroup(): Promise<string | null> {
  return SecureStore.getItemAsync(WORKER_GROUP_KEY);
}

export async function setWorkerGroup(group: string): Promise<void> {
  await SecureStore.setItemAsync(WORKER_GROUP_KEY, group);
}

export async function getApiUrl(): Promise<string | null> {
  return SecureStore.getItemAsync(API_URL_KEY);
}

export async function setApiUrl(url: string): Promise<void> {
  await SecureStore.setItemAsync(API_URL_KEY, url);
}

export async function clearAll(): Promise<void> {
  await SecureStore.deleteItemAsync(WORKER_ID_KEY);
  await SecureStore.deleteItemAsync(WORKER_NAME_KEY);
  await SecureStore.deleteItemAsync(WORKER_GROUP_KEY);
}
