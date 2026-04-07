import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string()
    .max(15, "Имя: Не более 15-ти символов")
    .min(2, "Имя: Не менее 2-х символов")
    .required("Имя: Поле обязательное"),
  age: Yup.number()
    .max(99, "Возраст: Максимальный возраст - 99 лет")
    .min(1, "Возраст: Минимальный возраст - 1 год")
    .required("Возраст: Поле обязательное"),
  description: Yup.string().max(
    200,
    "Описание должно содержать не более 200-та символов",
  ),
  sex: Yup.mixed()
    .nullable()
    .test("sex", function (value) {
      const { createError } = this;

      if (typeof value === "string") {
        if (!["male", "female"].includes(value)) {
          return createError({ message: "Пол: Выберите пол из списка" });
        }
      }

      return true;
    })
    .required("Пол: Поле обязательное"),
  photo: Yup.mixed<File>().test("photo", function (value) {
    const { createError } = this;

    if (value) {
      if (typeof value === "string") {
        return true;
      }

      if (!["image/jpeg", "image/png"].includes(value.type)) {
        return createError({ message: "Только JPG/PNG" });
      }

      if (value.size >= 5 * 1024 * 1024) {
        return createError({ message: "До 5MB" });
      }
    } else {
      return createError({ message: "Файл обязателен" });
    }

    return true;
  }),
  // .test("size", "До 5MB", (f) => !f || f.size <= 5 * 1024 * 1024)
  // .test(
  //   "type",
  //   "Только JPG/PNG",
  //   (f) => !f || ["image/jpeg", "image/png"].includes(f.type)
  // )
  // .required("Файл обязателен"),

  city: Yup.mixed()
    .nullable()
    .test("city", function (value) {
      const { createError } = this;

      if (typeof value === "string") {
        return createError({ message: "Выберите город из списка" });
      }

      return true;
    })
    .required("Это поле обязательное"),
});

export const sexOptions = [
  {
    value: "",
    label: "Выберите пол",
  },
  {
    value: "male",
    label: "Мужской",
  },
  {
    value: "female",
    label: "Женский",
  },
];
