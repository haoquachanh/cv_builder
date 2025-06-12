import { CV, type Skill as SkillType } from "@/types/cv";
import { useMemo } from "react";

export const CompactTemplate: React.FC<{ data: CV }> = ({ data }) => {
  const defaultStyle = {
    primaryColor: "#3B82F6", // Default blue
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
      className="cv-page p-6 shadow-lg w-[210mm] mx-auto print:mx-0 print:shadow-none font-sans"
      style={{
        minHeight: "297mm",
        backgroundColor: style.backgroundColor,
        backgroundImage:
          style.backgroundPattern !== "none" ? style.backgroundPattern : "none",
        backgroundSize:
          style.backgroundPattern !== "none" ? "24px 24px" : "auto",
        color: "#374151",
      }}
    >
      {/* Header - Compact design with horizontal layout */}
      <header
        className="flex justify-between items-start pb-4 border-b-2"
        style={{ borderColor: style.primaryColor }}
      >
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: style.primaryColor }}
          >
            {data.personalInfo?.fullName}
          </h1>
          {data.personalInfo?.title && (
            <h2 className="text-lg mt-1" style={{ color: "#4B5563" }}>
              {data.personalInfo.title}
            </h2>
          )}
        </div>
        <div
          className="text-sm text-right space-y-1"
          style={{ color: "#6B7280" }}
        >
          {data.personalInfo?.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo?.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo?.location && (
            <div>{data.personalInfo.location}</div>
          )}
          <div className="flex gap-3 mt-2">
            {data.personalInfo?.linkedin && (
              <a
                href={data.personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80"
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
                className="hover:opacity-80"
                style={{ color: style.primaryColor }}
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </header>

      <main className="mt-4 grid grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-4">
          {/* Experience Section */}
          {data.experience && data.experience.length > 0 && (
            <section>
              <h2
                className="text-lg font-semibold mb-3 pb-1 border-b"
                style={{
                  color: style.primaryColor,
                  borderColor: `${style.primaryColor}40`,
                }}
              >
                Experience
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="relative pl-3"
                    style={{ borderLeft: `2px solid ${style.primaryColor}20` }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3
                          className="font-medium"
                          style={{ color: style.primaryColor }}
                        >
                          {exp.position}
                        </h3>
                        <div className="text-sm" style={{ color: "#4B5563" }}>
                          {exp.company}
                        </div>
                      </div>
                      <div className="text-xs" style={{ color: "#6B7280" }}>
                        {exp.startDate} - {exp.endDate || "Present"}
                      </div>
                    </div>
                    {exp.description && (
                      <p
                        className="mt-1 text-sm whitespace-pre-line"
                        style={{ color: "#4B5563" }}
                      >
                        {exp.description}
                      </p>
                    )}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="mt-1 text-sm list-disc list-inside">
                        {exp.achievements.map((achievement, index) => (
                          <li key={index} style={{ color: "#4B5563" }}>
                            {achievement}
                          </li>
                        ))}
                      </ul>
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
                className="text-lg font-semibold mb-3 pb-1 border-b"
                style={{
                  color: style.primaryColor,
                  borderColor: `${style.primaryColor}40`,
                }}
              >
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3
                          className="font-medium"
                          style={{ color: style.primaryColor }}
                        >
                          {edu.school}
                        </h3>
                        <div className="text-sm" style={{ color: "#4B5563" }}>
                          {edu.degree} in {edu.fieldOfStudy}
                        </div>
                      </div>
                      <div className="text-xs" style={{ color: "#6B7280" }}>
                        {edu.startDate} - {edu.endDate || "Present"}
                      </div>
                    </div>
                    {edu.description && (
                      <p className="mt-1 text-sm" style={{ color: "#4B5563" }}>
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-4">
          {/* Skills Section */}
          {data.skills && data.skills.length > 0 && (
            <section>
              <h2
                className="text-lg font-semibold mb-3 pb-1 border-b"
                style={{
                  color: style.primaryColor,
                  borderColor: `${style.primaryColor}40`,
                }}
              >
                Skills
              </h2>
              <div className="space-y-3">
                {Array.from(skillsByCategory.entries()).map(
                  ([category, skills]) => (
                    <div key={category}>
                      <h3
                        className="text-sm font-medium mb-1"
                        style={{ color: "#4B5563" }}
                      >
                        {category}
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {skills.map((skill) => (
                          <span
                            key={skill.id}
                            className="text-xs px-2 py-1 rounded"
                            style={{
                              backgroundColor: `${style.primaryColor}10`,
                              color: style.primaryColor,
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

          {/* Projects Section */}
          {data.projects && data.projects.length > 0 && (
            <section>
              <h2
                className="text-lg font-semibold mb-3 pb-1 border-b"
                style={{
                  color: style.primaryColor,
                  borderColor: `${style.primaryColor}40`,
                }}
              >
                Projects
              </h2>
              <div className="space-y-3">
                {data.projects.map((project) => (
                  <div key={project.id}>
                    <h3
                      className="font-medium"
                      style={{ color: style.primaryColor }}
                    >
                      {project.name}
                    </h3>
                    {project.description && (
                      <p className="mt-1 text-sm" style={{ color: "#4B5563" }}>
                        {project.description}
                      </p>
                    )}
                    {project.technologies &&
                      project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="text-xs"
                              style={{ color: "#6B7280" }}
                            >
                              {tech}
                              {index < project.technologies!.length - 1
                                ? " · "
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
        </div>
      </main>
    </div>
  );
};
