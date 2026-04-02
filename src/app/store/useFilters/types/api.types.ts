export interface ValuesUpdateFilters {
  age: {
    min: number;
    max: number;
  };
  sex: "male" | "female";
  cityId: string;
}

export interface FiltersDto {
  age: {
    min: number;
    max: number;
  };
  sex: "male" | "female";
  cityId: string;
}
