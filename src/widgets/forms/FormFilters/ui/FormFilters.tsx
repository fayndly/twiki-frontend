import styles from "./FormFilters.module.scss";
import { initialValues, validationSchema } from "../config";
import { FormStateWatcher } from "../model";
import { postFiltersUpdate, getCities, getProfile } from "../api";

import { Formik } from "formik";

import { InputSelect } from "@/shared/inputs/InputSelect";
import { InputSearchSelect } from "@/shared/inputs/InputSearchSelect";
import { InputRange } from "@/shared/inputs/InputRange";
import { SectionLoaderForm } from "@/shared/SectionLoaderForm";
import { useEffect, useState } from "react";

const sexOptions = [
  {
    value: "male",
    label: "Мужской",
  },
  {
    value: "female",
    label: "Женский",
  },
];

export function FormFilters() {
  const [cities, setCities] = useState([]);
  const [profileData, setProfileData] = useState(null);

  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchAll = async () => {
      setDataLoading(true);
      try {
        const [citiesResult, profileResult] = await Promise.all([
          getCities(),
          getProfile(),
        ]);
        if (!mounted) return;

        setCities(JSON.parse(citiesResult));
        setProfileData(JSON.parse(profileResult));
      } catch (e) {
        console.log(e);
      } finally {
        if (mounted) setDataLoading(false);
      }
    };

    fetchAll();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Formik
      initialValues={profileData || initialValues}
      validationSchema={validationSchema}
      onSubmit={postFiltersUpdate}
      enableReinitialize
    >
      {({
        errors,
        values,
        handleChange,
        setFieldValue,
        setFieldTouched,
        touched,
      }) => (
        <>
          <FormStateWatcher isDataLoading={dataLoading} />
          {dataLoading ? (
            <SectionLoaderForm />
          ) : (
            <form
              className={styles.form}
              noValidate
              onSubmit={(e) => e.preventDefault()}
            >
              <InputRange
                setFieldTouched={setFieldTouched}
                firstValue={values.firstAge}
                lastValue={values.lastAge}
                handleChange={handleChange}
                id={{ first: "firstAge", last: "lastAge" }}
                name={{ first: "firstAge", last: "lastAge" }}
                header={{ first: "От*", last: "До*" }}
                placeholder={{
                  first: "Введите возраст",
                  last: "Введите возраст",
                }}
                subtitle="Максимальный и минимальный возраст"
                errors={{
                  first:
                    errors.firstAge && touched.firstAge ? errors.firstAge : "",
                  last: errors.lastAge && touched.lastAge ? errors.lastAge : "",
                }}
              />
              <InputSelect
                onChange={() => {
                  setFieldTouched("sex", true);
                }}
                errors={errors.sex && touched.sex ? errors.sex : ""}
                handleChange={handleChange}
                value={values.sex}
                id="sex"
                name="sex"
                header="Пол*"
                subtitle="Пол собеседника"
                options={sexOptions}
              />
              <InputSearchSelect
                onChange={() => {
                  setFieldTouched("city", true);
                }}
                errors={errors.city && touched.city ? errors.city : ""}
                handleChange={handleChange}
                value={values.city}
                clickClear={() => {
                  setFieldValue("city", "");
                }}
                type="text"
                id="city"
                name="city"
                header="Город*"
                placeholder="Введите название города"
                subtitle="Выберите город из выпадающего списка"
                handleChangeClue={(value) => {
                  setFieldValue("city", value);
                }}
                options={cities}
              />
            </form>
          )}
        </>
      )}
    </Formik>
  );
}
