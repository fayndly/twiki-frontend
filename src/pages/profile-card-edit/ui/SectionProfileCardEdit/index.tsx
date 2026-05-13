import { pathsToPublicSrc } from "@/app/config";
import { FormProfileUpdate } from "@/widgets/forms/FormProfile"; // fsd: fix dependency
import { PlaceholderSticker } from "@/shared/ui/Placeholder";
import { SectionForm } from "@/shared/ui/sections/SectionForm";

export function SectionProfileCardEdit() {
  return (
    <SectionForm>
      <PlaceholderSticker
        header="Обновите данные анкеты"
        description="Сделайте профиль актуальным и удобным для других"
        pathToSticker={pathsToPublicSrc.stickers.placeholderFormProfileUpdate}
      />
      <FormProfileUpdate />
    </SectionForm>
  );
}
