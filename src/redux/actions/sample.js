// Get sample data
export const FETCH_SAMPLE_DATA = 'FETCH_SAMPLE_DATA';
export const fetchSampleData = callback => ({
  type: FETCH_SAMPLE_DATA,
  callback,
});
export const ON_SAMPLE_DATA_LOADED = 'ON_SAMPLE_DATA_LOADED';
export const onSampleDataLoaded = result => ({
  type: ON_SAMPLE_DATA_LOADED,
  result,
});

// insert sample data
export const INSERT_SAMPLE_DATA = 'INSERT_SAMPLE_DATA';
export const insertSampleData = (payload, callback) => ({
  type: INSERT_SAMPLE_DATA,
  payload,
  callback,
});
export const ON_SAMPLE_DATA_INSERTED = 'ON_SAMPLE_DATA_INSERTED';
export const onSampleDataInserted = result => ({
  type: ON_SAMPLE_DATA_INSERTED,
  result,
});
