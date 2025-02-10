import {bands} from "src/config/constants";
import {api} from "src/plugins/http";

export const reduceResults = function (results) {
  return results.reduce((acc, {band, data}) => {
    if (data) acc[band] = data;
    return acc;
  }, {});
}

export const getResultsAllBands = async url => await Promise.all(bands.map(async (band) => {
  const {data, error, status} = await api().get(`${url}?band=${band}`);
  return {band, data: error || status !== 200 ? null : data.data};
}));
