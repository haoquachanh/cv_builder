import { CV, type Skill as SkillType } from "@/types/cv";
import { useMemo } from "react";

export const MinimalTemplate: React.FC<{ data: CV }> = ({ data }) => {
  const defaultStyle = {
    primaryColor: "#6B7280", // Default gray
    backgroundColor: "#ffffff",
    backgroundPattern: "none",
  };

  const style = {
    ...defaultStyle,
    ...data.style,
  };
  const skillsByCategory = useMemo(() => {
    if (!data.skills) return new Map<string, SkillType[]>();
    const grouped = new Map<string, SkillType[]>();
    data.skills.forEach((skill) => {
      const category = skill.category?.trim();
      // Skip skills without a category or with "Uncategorized"
      if (!category || category.toLowerCase() === "uncategorized") return;
      if (!grouped.has(category)) {
        grouped.set(category, []);
      }
      const categorySkills = grouped.get(category);
      if (categorySkills) {
        categorySkills.push(skill);
      }
    });
    return grouped;
  }, [data.skills]);
  return (
    <div
      className="cv-page p-8 shadow-lg w-[210mm] mx-auto print:mx-0 print:shadow-none font-sans"
      style={{
        width: "210mm",
        minHeight: "297mm",
        maxHeight: "297mm",
        height: "297mm",
        color: "#374151", // Base text color
        backgroundColor: style.backgroundColor,
        backgroundImage:
          style.backgroundPattern !== "none" ? style.backgroundPattern : "none",
        backgroundSize:
          style.backgroundPattern !== "none" ? "24px 24px" : "auto",
        boxSizing: "border-box",
        overflow: "hidden",
        pageBreakInside: "avoid",
        pageBreakBefore: "avoid",
        pageBreakAfter: "avoid",
        breakInside: "avoid",
      }}
    >
      {/* Header Section */}
      <header
        className="pb-6 mb-6 border-b"
        style={{ borderColor: `${style.primaryColor}20` }}
      >
        <h1
          className="text-3xl font-light tracking-wide"
          style={{ color: style.primaryColor }}
        >
          {data.personalInfo?.fullName}
        </h1>
        {data.personalInfo?.title && (
          <h2 className="text-xl mt-1 font-light" style={{ color: "#6B7280" }}>
            {data.personalInfo.title}
          </h2>
        )}
        <div
          className="flex flex-wrap gap-6 mt-3 text-sm"
          style={{ color: "#6B7280" }}
        >
          {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo?.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo?.location && (
            <span>{data.personalInfo.location}</span>
          )}
          {data.personalInfo?.linkedin && (
            <a
              href={data.personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              style={{ color: style.primaryColor }}
            >
              LinkedIn
            </a>
          )}
          {data.personalInfo?.github && (
            <a
              href={data.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              style={{ color: style.primaryColor }}
            >
              GitHub
            </a>
          )}
          {data.personalInfo?.website && (
            <a
              href={data.personalInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              style={{ color: style.primaryColor }}
            >
              Website
            </a>
          )}
        </div>
        {data.personalInfo?.summary && (
          <p
            className="mt-6 leading-relaxed max-w-3xl"
            style={{ color: "#4B5563" }}
          >
            {data.personalInfo.summary}
          </p>
        )}
      </header>
      <main className="space-y-8">
        {/* Experience Section */}
        {data.experience && data.experience.length > 0 && (
          <section>
            <h2
              className="text-base font-medium uppercase tracking-wider mb-4"
              style={{ color: style.primaryColor }}
            >
              Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id} className="group">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3
                        className="text-lg font-medium"
                        style={{ color: style.primaryColor }}
                      >
                        {exp.position}
                      </h3>
                      <h4 className="text-gray-600">{exp.company}</h4>
                    </div>
                    <div className="text-gray-500 text-sm">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </div>
                  </div>
                  {exp.location && (
                    <div className="text-gray-500 text-sm mt-1">
                      {exp.location}
                    </div>
                  )}
                  {exp.description && (
                    <p className="mt-2 text-gray-600 whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index} className="text-gray-600">
                          • {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {exp.technologies.map((tech, index) => (
                        <span
                          key={index}
                          style={{ color: style.primaryColor }}
                          className="text-sm"
                        >
                          {tech}
                          {index < (exp.technologies?.length ?? 0) - 1
                            ? " •"
                            : ""}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {data.education && data.education.length > 0 && (
          <section>
            <h2
              className="text-base font-medium uppercase tracking-wider mb-4"
              style={{ color: style.primaryColor }}
            >
              Education
            </h2>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div key={edu.id} className="group">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3
                        className="text-lg font-medium"
                        style={{ color: style.primaryColor }}
                      >
                        {edu.school}
                      </h3>
                      <h4 style={{ color: "#4B5563" }}>
                        {edu.degree} in {edu.fieldOfStudy}
                      </h4>
                    </div>
                    <div style={{ color: "#6B7280" }} className="text-sm">
                      {edu.startDate} - {edu.endDate || "Present"}
                    </div>
                  </div>
                  {edu.location && (
                    <div style={{ color: "#6B7280" }} className="text-sm mt-1">
                      {edu.location}
                    </div>
                  )}
                  {edu.description && (
                    <p
                      className="mt-2 whitespace-pre-line"
                      style={{ color: "#4B5563" }}
                    >
                      {edu.description}
                    </p>
                  )}
                  {edu.gpa && (
                    <div className="mt-1 text-sm" style={{ color: "#6B7280" }}>
                      GPA: {edu.gpa}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {data.projects && data.projects.length > 0 && (
          <section>
            <h2
              className="text-base font-medium uppercase tracking-wider mb-4"
              style={{ color: style.primaryColor }}
            >
              Projects
            </h2>
            <div className="space-y-6">
              {data.projects.map((project) => (
                <div key={project.id} className="group">
                  <div className="flex justify-between items-start">
                    <h3
                      className="text-lg font-medium"
                      style={{ color: style.primaryColor }}
                    >
                      {project.name}
                    </h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:opacity-80 transition-opacity"
                        style={{ color: style.primaryColor }}
                      >
                        View Project
                      </a>
                    )}
                  </div>
                  {project.description && (
                    <p
                      className="mt-2 whitespace-pre-line"
                      style={{ color: "#4B5563" }}
                    >
                      {project.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {data.skills && data.skills.length > 0 && (
          <section>
            <h2
              className="text-base font-medium uppercase tracking-wider mb-4"
              style={{ color: style.primaryColor }}
            >
              Skills
            </h2>
            <div className="space-y-4">
              {Array.from(skillsByCategory.entries()).map(
                ([category, skills]) => (
                  <div key={category}>
                    <h3
                      className="text-base font-medium mb-2"
                      style={{ color: style.primaryColor }}
                    >
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-x-6 gap-y-1">
                      {skills.map((skill) => (
                        <span
                          key={skill.id}
                          className="text-sm"
                          style={{
                            color: "#4B5563",
                            fontStyle: skill.fontStyle,
                            fontWeight: skill.fontWeight,
                            textDecoration: skill.textDecoration,
                          }}
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
