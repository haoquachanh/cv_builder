import { CV, type Skill as SkillType } from "@/types/cv";
import { useMemo } from "react";

export const CreativeTemplate: React.FC<{ data: CV }> = ({ data }) => {
  const defaultStyle = {
    primaryColor: "#8B5CF6", // Default purple
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
      className="cv-page p-8 shadow-lg w-[210mm] mx-auto print:mx-0 print:shadow-none font-sans"
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
      {/* Header with creative design */}
      <header className="relative pb-6 mb-8">
        <div
          className="absolute top-0 left-0 w-32 h-32 -z-10 opacity-10 rounded-full"
          style={{ backgroundColor: style.primaryColor }}
        />
        <div
          className="absolute top-8 left-8 w-24 h-24 -z-10 opacity-10 rounded-full"
          style={{ backgroundColor: style.primaryColor }}
        />
        <h1
          className="text-4xl font-bold tracking-tight relative"
          style={{ color: style.primaryColor }}
        >
          {data.personalInfo?.fullName}
        </h1>
        {data.personalInfo?.title && (
          <h2 className="text-xl mt-2" style={{ color: "#4B5563" }}>
            {data.personalInfo.title}
          </h2>
        )}
        <div
          className="mt-4 flex flex-wrap gap-6 text-sm"
          style={{ color: "#6B7280" }}
        >
          {data.personalInfo?.email && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo?.phone && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo?.location && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{data.personalInfo.location}</span>
            </div>
          )}
        </div>
        <div className="mt-3 flex gap-4">
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
        </div>
        {data.personalInfo?.summary && (
          <p
            className="mt-6 text-base leading-relaxed max-w-3xl"
            style={{ color: "#4B5563" }}
          >
            {data.personalInfo.summary}
          </p>
        )}
      </header>

      <main className="space-y-6">
        {/* Experience Section */}
        {data.experience && data.experience.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <h2
                className="text-2xl font-bold"
                style={{ color: style.primaryColor }}
              >
                Experience
              </h2>
              <div
                className="flex-grow h-px opacity-20"
                style={{ backgroundColor: style.primaryColor }}
              />
            </div>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div
                  key={exp.id}
                  className="p-4 rounded-lg relative"
                  style={{
                    backgroundColor: `${style.primaryColor}05`,
                    borderLeft: `3px solid ${style.primaryColor}`,
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3
                        className="text-lg font-semibold"
                        style={{ color: style.primaryColor }}
                      >
                        {exp.position}
                      </h3>
                      <h4 className="font-medium" style={{ color: "#4B5563" }}>
                        {exp.company}
                      </h4>
                    </div>
                    <div className="text-sm" style={{ color: "#6B7280" }}>
                      {exp.startDate} - {exp.endDate || "Present"}
                    </div>
                  </div>
                  {exp.description && (
                    <p
                      className="mt-2 text-base whitespace-pre-line"
                      style={{ color: "#4B5563" }}
                    >
                      {exp.description}
                    </p>
                  )}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="mt-2 space-y-1 list-disc list-inside">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index} style={{ color: "#4B5563" }}>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {exp.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="text-sm px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${style.primaryColor}15`,
                            color: style.primaryColor,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {data.skills && data.skills.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <h2
                className="text-2xl font-bold"
                style={{ color: style.primaryColor }}
              >
                Skills
              </h2>
              <div
                className="flex-grow h-px opacity-20"
                style={{ backgroundColor: style.primaryColor }}
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              {Array.from(skillsByCategory.entries()).map(
                ([category, skills]) => (
                  <div
                    key={category}
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: `${style.primaryColor}05` }}
                  >
                    <h3
                      className="text-lg font-semibold mb-3"
                      style={{ color: style.primaryColor }}
                    >
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill.id}
                          className="px-3 py-1 rounded-full text-sm"
                          style={{
                            backgroundColor: `${style.primaryColor}15`,
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

        {/* Education Section */}
        {data.education && data.education.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <h2
                className="text-2xl font-bold"
                style={{ color: style.primaryColor }}
              >
                Education
              </h2>
              <div
                className="flex-grow h-px opacity-20"
                style={{ backgroundColor: style.primaryColor }}
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              {data.education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: `${style.primaryColor}05` }}
                >
                  <h3
                    className="font-semibold"
                    style={{ color: style.primaryColor }}
                  >
                    {edu.school}
                  </h3>
                  <div className="text-base mt-1" style={{ color: "#4B5563" }}>
                    {edu.degree} in {edu.fieldOfStudy}
                  </div>
                  <div className="text-sm mt-1" style={{ color: "#6B7280" }}>
                    {edu.startDate} - {edu.endDate || "Present"}
                  </div>
                  {edu.description && (
                    <p className="mt-2 text-sm" style={{ color: "#4B5563" }}>
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
