import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  EMISORES: 'emisores',
  RECEPTORES: 'receptores',
  CFDI_DRAFTS: 'cfdiDrafts',
  CFDI_STAMPED: 'cfdiStamped',
};

const parseJson = (value) => {
  try {
    return value ? JSON.parse(value) : [];
  } catch (error) {
    console.warn('storageService parse error', error);
    return [];
  }
};

const getStorage = async (key) => {
  const value = await AsyncStorage.getItem(key);
  return parseJson(value);
};


const setStorage = async (key, data) => {
  await AsyncStorage.setItem(key, JSON.stringify(data || []));
};

export const getEmisores = async () => getStorage(STORAGE_KEYS.EMISORES);
export const getReceptores = async () => getStorage(STORAGE_KEYS.RECEPTORES);
export const getDrafts = async () => getStorage(STORAGE_KEYS.CFDI_DRAFTS);
export const getStampedCFDIs = async () => getStorage(STORAGE_KEYS.CFDI_STAMPED);

export const saveEntity = async (key, entity) => {
  const items = await getStorage(key);
  const existingIndex = items.findIndex((item) => item.id === entity.id);
  if (existingIndex >= 0) {
    items[existingIndex] = entity;
  } else {
    items.push(entity);
  }
  await setStorage(key, items);
  return entity;
};

export const deleteEntity = async (key, id) => {
  const items = await getStorage(key);
  const filtered = items.filter((item) => item.id !== id);
  await setStorage(key, filtered);
  return filtered;
};

export const saveEmisor = async (emisor) => saveEntity(STORAGE_KEYS.EMISORES, emisor);
export const deleteEmisor = async (id) => deleteEntity(STORAGE_KEYS.EMISORES, id);
export const saveReceptor = async (receptor) => saveEntity(STORAGE_KEYS.RECEPTORES, receptor);
export const deleteReceptor = async (id) => deleteEntity(STORAGE_KEYS.RECEPTORES, id);

export const saveDraft = async (draft) => saveEntity(STORAGE_KEYS.CFDI_DRAFTS, draft);
export const deleteDraft = async (id) => deleteEntity(STORAGE_KEYS.CFDI_DRAFTS, id);
export const saveStampedCFDI = async (stamped) => saveEntity(STORAGE_KEYS.CFDI_STAMPED, stamped);

export const clearAll = async () => {
  await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
};
