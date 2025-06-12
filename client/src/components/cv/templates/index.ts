export * from "./ModernTemplate";
export * from "./ClassicTemplate";
export * from "./MinimalTemplate";
export * from "./CompactTemplate";
export * from "./CreativeTemplate";

import { ModernTemplate } from "./ModernTemplate";
import { ClassicTemplate } from "./ClassicTemplate";
import { MinimalTemplate } from "./MinimalTemplate";
import { CompactTemplate } from "./CompactTemplate";
import { CreativeTemplate } from "./CreativeTemplate";
import { TemplateType } from "@/context/CVContext";
import { CV } from "@/types/cv";

export const getTemplateComponent = (template: TemplateType) => {
  const templates = {
    modern: ModernTemplate,
    classic: ClassicTemplate,
    minimal: MinimalTemplate,
    compact: CompactTemplate,
    creative: CreativeTemplate,
  };
  return templates[template];
};
