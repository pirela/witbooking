import { TypeProyecto, TypeHostData } from "../types/types";

export const orderDataByHost = (arr: TypeProyecto[]) => {
  return arr.reduce((acc1: TypeHostData["data"], el: TypeProyecto) => {
    return (acc1 = el.host.reduce((_acc2: TypeHostData["data"], el2: string) => {
      (acc1[el2] = acc1[el2] || []).push(el);
      return acc1;
    }, {}));
  }, {});
};

export const sortByApdex = (data: TypeProyecto[]) => {
  data.sort((a: TypeProyecto, b: TypeProyecto) =>
    b.apdex > a.apdex ? 1 : a.apdex > b.apdex ? -1 : 0
  );
};