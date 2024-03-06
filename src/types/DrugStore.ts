import { Medicine } from "./Medicine";

export interface DrugStore {
  _id: string;
  name: string;
  medicines: Medicine[];
}
