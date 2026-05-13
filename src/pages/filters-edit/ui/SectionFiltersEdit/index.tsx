import { pathsToPublicSrc } from "@/app/config";
import { FormFilters } from "@/widgets/forms/FormFilters";
import { PlaceholderSticker } from "@/shared/ui/Placeholder";
import { SectionForm } from "@/shared/ui/sections/SectionForm";

export function SectionFiltersEdit() {
  return (
    <SectionForm>
      <PlaceholderSticker
        header="Настройте фильтры"
        description="чтобы быстрее находить подходящие анкеты"
        pathToSticker={pathsToPublicSrc.stickers.placeholderFormFilters}
      />
      <FormFilters />
    </SectionForm>
  );
}
