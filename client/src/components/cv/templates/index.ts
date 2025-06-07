export * from "./ModernTemplate";
export * from "./ClassicTemplate";
export * from "./MinimalTemplate";

import { ModernTemplate } from "./ModernTemplate";
import { ClassicTemplate } from "./ClassicTemplate";
import { MinimalTemplate } from "./MinimalTemplate";
import { TemplateType } from "@/context/CVContext";
import { CV } from "@/types/cv";

export const getTemplateComponent = (template: TemplateType) => {
  const templates = {
    modern: ModernTemplate,
    classic: ClassicTemplate,
    minimal: MinimalTemplate,
  };
  return templates[template];
};
