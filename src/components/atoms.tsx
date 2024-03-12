import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "toVisitCountry",
  storage: localStorage,
});

export interface IToVisit {
  text: string;
  id: number;
  category: "WANT" | "HAVE_BEEN" | "LIKE";
}
export const toVistState = atom<IToVisit[]>({
  key: "toVisit",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toVisitSelector = selector({
  key: "toVisitSelector",
  get: ({ get }) => {
    const toVisitConturies = get(toVistState);
    return [
      toVisitConturies.filter((toVisit) => toVisit.category === "WANT"),
      toVisitConturies.filter((toVisit) => toVisit.category === "HAVE_BEEN"),
      toVisitConturies.filter((toVisit) => toVisit.category === "LIKE"),
    ];
  },
});

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}
export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoselector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
