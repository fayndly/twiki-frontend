import { pathsToPublicSrc } from "@/app/config";
import { FormProfileCreate } from "@/widgets/forms/FormProfile"; // fsd: fix dependency
import { PlaceholderSticker } from "@/shared/ui/Placeholder";
import { SectionForm } from "@/shared/ui/sections/SectionForm";

export function SectionProfileCardCreate() {
  return (
    <SectionForm>
      <PlaceholderSticker
        header="Расскажите немного о себе"
        description="Это поможет создать вашу анкету"
        pathToSticker={pathsToPublicSrc.stickers.placeholderFormProfileCreate}
      />
      <FormProfileCreate />
    </SectionForm>
  );
}
