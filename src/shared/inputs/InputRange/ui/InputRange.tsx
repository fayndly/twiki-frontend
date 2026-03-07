import type { PropsInputRange } from "../types";

import { InputText } from "@/shared/inputs/InputText";
import { SectionInput } from "@/shared/SectionInput";

export function InputRange({
  setFieldTouched,
  firstValue,
  lastValue,
  handleChange,
  id,
  name,
  header,
  placeholder,
  subtitle,
  errors,
}: PropsInputRange) {
  const getErrors = errors.first || errors.last;

  return (
    <SectionInput
      errors={[getErrors]}
      subtitle={subtitle}
      header={header}
      showHeader={true}
    >
      <InputText
        onChange={() => {
          setFieldTouched(id.first, true);
        }}
        handleChange={handleChange}
        value={firstValue}
        type="number"
        id={id.first}
        name={name.first}
        placeholder={placeholder.first}
        hasError={Boolean(errors.first?.length)}
      />
      <InputText
        onChange={() => {
          setFieldTouched(id.last, true);
        }}
        handleChange={handleChange}
        value={lastValue}
        type="number"
        id={id.last}
        name={name.last}
        placeholder={placeholder.last}
        hasError={Boolean(errors.last?.length)}
      />
    </SectionInput>
  );
}
