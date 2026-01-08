import API from "./axios";

// Optional upload base URL
export const uploadUrl = import.meta.env.VITE_UPLOAD_API_BASE_URL;

/* =========================
   SWR GET FETCHER
========================= */
export const getFetcher = async (url) => {
  const res = await API.get(url);
  return res.data;
};

/* =========================
   MUTATION FETCHERS
========================= */
export const postFetcher = async (url, data) => {
  const res = await API.post(url, data);
  return res.data;
};

export const putFetcher = async (url, data) => {
  const res = await API.put(url, data);
  return res.data;
};

export const patchFetcher = async (url, data) => {
  const res = await API.patch(url, data);
  return res.data;
};

export const deleteFetcher = async (url) => {
  const res = await API.delete(url);
  return res.data;
};
