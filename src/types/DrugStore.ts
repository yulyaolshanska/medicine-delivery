import { Medicine } from "./Medicine";

export interface DrugStore {
  id: string;
  name: string;
  medicines: Medicine[];
}
