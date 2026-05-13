import * as Yup from "yup";

export const validationSchema = Yup.object({
  type: Yup.mixed()
    .nullable()
    .test("type", function (value) {
      const { createError } = this;

      if (typeof value === "string") {
        if (!["11", "12", "13", "14", "15"].includes(value)) {
          return createError({ message: "Выберите тип из списка" });
        }
      }

      return true;
    })
    .required("Это поле обязательное"),
  description: Yup.string().max(
    200,
    "Описание должно содержать не более 200-та символов",
  ),
});
