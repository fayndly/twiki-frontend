import { cities, initialValues } from "../config";
import { postProfileCreate } from "../api";
import { FormStateWatcher } from "../model";

import { FormProfile } from "@/widgets/forms/FormProfile";

export function FormProfileCreate() {
  return (
    <FormProfile
      initialValues={initialValues}
      handleSubmit={postProfileCreate}
      cities={cities}
      formStateWatcher={<FormStateWatcher />}
    />
  );
}
