import { Input, Tappable } from "@telegram-apps/telegram-ui";

import styles from "./InputText.module.scss";

import {
  type IPropsInputText,
  type IPropsClearButton,
} from "../types/index.types";
import { SubtitleInput } from "@/shared/inputs/SubtitleInput";

function ClearButton({ clickClear }: IPropsClearButton) {
  return (
    <Tappable
      Component="div"
      style={{
        display: "flex",
      }}
      onClick={clickClear}
    >
      <svg
        width="24"
        height="24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity=".5" className={styles.g_filled} clip-path="url(#close_a)">
          <path
            d="M12 24c6.5647 0 12-5.4471 12-12 0-6.56471-5.4471-12-12.0118-12C5.43529 0 0 5.43529 0 12c0 6.5529 5.44705 12 12 12Z"
            fill-opacity=".04"
          ></path>
          <path
            d="M7.86242 17.1429c-.56394 0-1.00528-.4542-1.00528-1.0187 0-.2701.09807-.5279.29422-.7121L10.5472 12 7.15136 8.60006c-.19615-.19637-.29422-.44187-.29422-.71189 0-.57689.44134-1.00648 1.00528-1.00648.28196 0 .50263.09819.69878.28231l3.4204 3.4122 3.4449-3.42448c.2084-.20866.4291-.29458.6988-.29458.5639 0 1.0176.44187 1.0176 1.00648 0 .28231-.0859.50324-.3066.72417L13.4282 12l3.3959 3.4c.2084.1841.3065.4417.3065.7242 0 .5645-.4536 1.0187-1.0298 1.0187-.282 0-.5395-.0982-.7234-.2947l-3.3958-3.4121-3.38363 3.4121c-.19613.1965-.45359.2947-.73555.2947Z"
            fill-opacity=".8"
          ></path>
        </g>
        <defs>
          <clipPath id="close_a">
            <path d="M0 0h24v24H0z"></path>
          </clipPath>
        </defs>
      </svg>
    </Tappable>
  );
}

export function InputText({
  errors,
  handleChange,
  clickClear,
  value,
  id,
  name,
  header,
  placeholder,
  subtitle,
  type,
}: IPropsInputText) {
  return (
    <div className={styles.input_text}>
      <Input
        id={id}
        name={name}
        type={type}
        status={errors?.length ? "error" : undefined}
        onChange={handleChange}
        value={value}
        header={header}
        placeholder={placeholder}
        after={
          typeof value === "string" && value.length > 0 ? (
            <ClearButton clickClear={clickClear} />
          ) : (
            ""
          )
        }
      />
      <SubtitleInput errors={errors} subtitle={subtitle} />
    </div>
  );
}
