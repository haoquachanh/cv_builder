import { CV, type Skill as SkillType } from "@/types/cv";
import { useMemo } from "react";

export const ClassicTemplate: React.FC<{ data: CV }> = ({ data }) => {
  const defaultStyle = {
    primaryColor: "#4B5563", // Default gray
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
      className="cv-page p-8 shadow-lg w-[210mm] mx-auto print:mx-0 print:shadow-none font-serif"
      style={{
        minHeight: "297mm",
        color: "#374151", // Base text color
        backgroundColor: style.backgroundColor,
        backgroundImage:
          style.backgroundPattern !== "none" ? style.backgroundPattern : "none",
        backgroundSize:
          style.backgroundPattern !== "none" ? "24px 24px" : "auto",
      }}
    >
      {/* Header Section */}
      <header
        className="text-center pb-6 mb-6"
        style={{
          borderBottom: `2px solid ${style.primaryColor}`,
        }}
      >
        <h1
          className="text-4xl font-bold"
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
          className="flex flex-wrap justify-center gap-4 mt-3"
          style={{ color: "#6B7280" }}
        >
          {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo?.phone && <span className="text-gray-400">|</span>}
          {data.personalInfo?.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo?.location && (
            <span className="text-gray-400">|</span>
          )}
          {data.personalInfo?.location && (
            <span>{data.personalInfo.location}</span>
          )}
        </div>
        <div className="flex justify-center gap-4 mt-3">
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
          <p className="mt-4 text-gray-700 font-serif leading-relaxed">
            {data.personalInfo.summary}
          </p>
        )}
      </header>
      <main className="space-y-6">
        {/* Experience Section */}
        {data.experience && data.experience.length > 0 && (
          <section className="mb-6">
            <h2
              className="text-xl font-bold mb-4 pb-2"
              style={{
                color: style.primaryColor,
                borderBottom: `1px solid ${style.primaryColor}`,
              }}
            >
              Experience
            </h2>
            <div className="grid gap-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold" style={{ color: "#4B5563" }}>
                      {exp.company}
                    </h3>
                    <span className="text-sm" style={{ color: "#6B7280" }}>
                      {exp.startDate} - {exp.endDate || "Present"}
                    </span>
                  </div>
                  <div className="text-base mb-2" style={{ color: "#4B5563" }}>
                    {exp.position}
                    {exp.location && (
                      <span className="ml-2">· {exp.location}</span>
                    )}
                  </div>
                  {exp.description && (
                    <p
                      className="whitespace-pre-line text-sm"
                      style={{ color: "#6B7280" }}
                    >
                      {exp.description}
                    </p>
                  )}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul
                      className="list-disc list-inside text-sm mt-2"
                      style={{ color: "#6B7280" }}
                    >
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
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
          <section className="mb-6">
            <h2
              className="text-xl font-bold mb-4 pb-2"
              style={{
                color: style.primaryColor,
                borderBottom: `1px solid ${style.primaryColor}`,
              }}
            >
              Education
            </h2>
            <div className="grid gap-6">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold" style={{ color: "#4B5563" }}>
                      {edu.school}
                    </h3>
                    <span className="text-sm" style={{ color: "#6B7280" }}>
                      {edu.startDate} - {edu.endDate || "Present"}
                    </span>
                  </div>
                  <div className="text-base mb-2" style={{ color: "#4B5563" }}>
                    {edu.degree} in {edu.fieldOfStudy}
                    {edu.location && (
                      <span className="ml-2">· {edu.location}</span>
                    )}
                  </div>
                  {edu.description && (
                    <p
                      className="whitespace-pre-line text-sm"
                      style={{ color: "#6B7280" }}
                    >
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {data.skills && data.skills.length > 0 && (
          <section className="mb-6">
            <h2
              className="text-xl font-bold mb-4 pb-2"
              style={{
                color: style.primaryColor,
                borderBottom: `1px solid ${style.primaryColor}`,
              }}
            >
              Skills
            </h2>
            <div className="grid gap-4">
              {Array.from(skillsByCategory.entries()).map(
                ([category, skills]) => (
                  <div key={category} className="mb-3">
                    <h3 className="font-bold mb-2" style={{ color: "#4B5563" }}>
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill.name}
                          className="px-3 py-1 rounded-full text-sm"
                          style={{
                            backgroundColor: `${style.primaryColor}15`,
                            color: style.primaryColor,
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
            <h2 className="text-2xl font-serif text-center text-gray-800 mb-4 uppercase tracking-wider">
              Projects
            </h2>
            <div className="space-y-6">
              {data.projects.map((project) => (
                <div key={project.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-gray-600"
                        >
                          {project.name}
                        </a>
                      ) : (
                        project.name
                      )}
                    </h3>
                    {(project.startDate || project.endDate) && (
                      <div className="text-gray-600 text-sm whitespace-nowrap">
                        {project.startDate && project.startDate}
                        {project.endDate && ` - ${project.endDate}`}
                      </div>
                    )}
                  </div>
                  {project.description && (
                    <p className="mt-2 text-gray-700 whitespace-pre-line">
                      {project.description}
                    </p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="text-sm bg-gray-100 px-2 py-1 rounded"
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
      </main>
    </div>
  );
};
