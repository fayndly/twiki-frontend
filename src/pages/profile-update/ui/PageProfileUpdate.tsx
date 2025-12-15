import { SectionWrapper } from "@/app/layouts/SectionWrapper";
import styles from "./PageProfileUpdate.module.scss";

import { useFormik } from "formik";
import * as Yup from "yup";

import { InputText } from "@/shared/inputs/InputText";
import { InputTextarea } from "@/shared/inputs/InputTextarea";
import { InputSelect } from "@/shared/inputs/InputSelect";
import { InputFile } from "@/shared/inputs/InputFile";
import { InputSearchSelect } from "@/shared/inputs/InputSearchSelect";

const cities = [
  { value: "77", label: "Lockb" },
  { value: "78", label: "Санкт-Петербург" },
  { value: "23", label: "Сочи" },
  { value: "16", label: "Казань" },
  { value: "66", label: "Екатеринбург" },
  { value: "54", label: "Новосибирск" },
  { value: "52", label: "Нижний Новгород" },
  { value: "39", label: "Калининград" },
  { value: "24", label: "Красноярск" },
  { value: "72", label: "Тюмень" },
  { value: "20", label: "Грозный" },
];

export function PageProfileUpdate() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      age: undefined,
      description: "",
      sex: "Мужской",
      photo: undefined,
      city: undefined,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Имя должно содержать не более 15-ти символов")
        .min(2, "Имя должно содержать не менее 2-х символов")
        .required("Это поле обязательное"),
      age: Yup.number()
        .max(99, "Максимальный возраст 99 лет")
        .min(1, "Минимальный возраст 1 год")
        .required("Это поле обязательное"),
      description: Yup.string().max(
        200,
        "Описание должно содержать не более 200-та символов"
      ),
      sex: Yup.string().required("Это поле обязательное"),
      photo: Yup.mixed<File>()
        .required("Файл обязателен")
        .test("size", "До 5MB", (f) => !f || f.size <= 5 * 1024 * 1024)
        .test(
          "type",
          "Только JPG/PNG",
          (f) => !f || ["image/jpeg", "image/png"].includes(f.type)
        ),
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
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <SectionWrapper>
      <section className={styles.section}>
        <form
          className={styles.form}
          noValidate
          onSubmit={(e) => e.preventDefault()}
        >
          <InputText
            errors={formik.errors.firstName}
            handleChange={formik.handleChange}
            value={formik.values.firstName}
            clickClear={() => {
              formik.setFieldValue("firstName", "");
            }}
            type="text"
            id="firstName"
            name="firstName"
            header="Имя*"
            placeholder="Введите имя"
            subtitle="Ваше имя"
          />
          <InputText
            errors={formik.errors.age}
            handleChange={formik.handleChange}
            value={formik.values.age}
            type="number"
            id="age"
            name="age"
            header="Возраст*"
            placeholder="Введите возраст"
            subtitle="Ваш возраст"
          />
          <InputTextarea
            errors={formik.errors.description}
            handleChange={formik.handleChange}
            value={formik.values.description}
            id="description"
            name="description"
            header="Описание"
            placeholder="Введите описание"
            subtitle="Ваше описание"
          />
          <InputSelect
            errors={formik.errors.sex}
            handleChange={formik.handleChange}
            value={formik.values.sex}
            id="sex"
            name="sex"
            header="Пол*"
            subtitle="Ваш пол"
            options={["Мужской", "Женский"]}
          />
          <InputFile
            errors={formik.errors.photo}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.currentTarget.files?.[0];
              formik.setFieldValue("photo", file);
            }}
            id="photo"
            name="photo"
            label="Выбрать фото"
            subtitle="Ваше фото"
            photoPreview={formik.values.photo}
          />
          <InputSearchSelect
            errors={formik.errors.city}
            handleChange={formik.handleChange}
            value={formik.values.city}
            clickClear={() => {
              formik.setFieldValue("city", "");
            }}
            type="text"
            id="city"
            name="city"
            header="Город*"
            placeholder="Введите название города"
            subtitle="Выберите город из выпадающего списка"
            handleChangeClue={(value) => {
              formik.setFieldValue("city", value);
            }}
            options={cities}
          />
        </form>
      </section>
    </SectionWrapper>
  );
}
