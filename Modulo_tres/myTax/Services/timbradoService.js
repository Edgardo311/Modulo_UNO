import axios from 'axios';

const TIMBRADO_ENDPOINT = 'https://example.com/api/timbrado';

export const stampCFDI = async (cfdiPayload) => {
  try {
    const response = await axios.post(TIMBRADO_ENDPOINT, cfdiPayload);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || 'Error de timbrado');
  }
};

export const getTimbradoResult = async (uuid) => {
  try {
    const response = await axios.get(`${TIMBRADO_ENDPOINT}/${encodeURIComponent(uuid)}`);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || 'No se pudo obtener el estado de timbrado');
  }
};
