import { SectionWrapper } from "@/app/layouts/SectionWrapper";
import styles from "./PageProfileUpdate.module.scss";

import { useFormik } from "formik";
import * as Yup from "yup";
import { InputText } from "@/shared/inputs/InputText";

export function PageProfileUpdate() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      age: undefined,
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
            header="Возвраст*"
            placeholder="Введите возраст"
            subtitle="Ваш возраст"
          />
        </form>
      </section>
    </SectionWrapper>
  );
}
