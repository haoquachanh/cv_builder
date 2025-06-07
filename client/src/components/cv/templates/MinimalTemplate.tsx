import { CV } from "@/types/cv";

export const MinimalTemplate: React.FC<{ data: CV }> = ({ data }) => {
  const defaultStyle = {
    primaryColor: "#6B7280", // Default gray
    fontFamily: "Inter, system-ui, sans-serif",
    backgroundColor: "#ffffff",
    backgroundPattern: "none",
  };

  const style = {
    ...defaultStyle,
    ...data.style,
  };

  return (
    <div
      className="cv-page p-8 shadow-lg w-[210mm] mx-auto print:mx-0 print:shadow-none"
      style={{
        minHeight: "297mm",
        fontFamily: style.fontFamily,
        backgroundColor: style.backgroundColor,
        backgroundImage:
          style.backgroundPattern !== "none" ? style.backgroundPattern : "none",
        backgroundSize:
          style.backgroundPattern !== "none" ? "24px 24px" : "auto",
      }}
    >
      {/* Header Section */}{" "}
      <header className="pb-6 mb-6">
        <h1
          className="text-3xl font-light tracking-wide"
          style={{ color: style.primaryColor }}
        >
          {data.personalInfo?.fullName}
        </h1>
        {data.personalInfo?.title && (
          <h2 className="text-xl mt-1 font-light text-gray-500">
            {data.personalInfo.title}
          </h2>
        )}
        <div className="flex flex-wrap gap-6 mt-3 text-sm text-gray-500">
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
          {data.personalInfo?.website && (
            <a
              href={data.personalInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
              style={{ color: style.primaryColor }}
            >
              Website
            </a>
          )}
        </div>
        {data.personalInfo?.summary && (
          <p className="mt-6 leading-relaxed max-w-3xl text-gray-600">
            {data.personalInfo.summary}
          </p>
        )}
      </header>
      <main className="space-y-8">
        {/* Experience Section */}
        {data.experience && data.experience.length > 0 && (
          <section>
            {" "}
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
                  )}{" "}
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
            <h2 className="text-base font-medium uppercase tracking-wider text-gray-500 mb-4">
              Education
            </h2>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div key={edu.id} className="group">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {edu.school}
                      </h3>
                      <h4 className="text-gray-600">
                        {edu.degree} in {edu.fieldOfStudy}
                      </h4>
                    </div>
                    <div className="text-gray-500 text-sm">
                      {edu.startDate} - {edu.endDate || "Present"}
                    </div>
                  </div>
                  {edu.location && (
                    <div className="text-gray-500 text-sm mt-1">
                      {edu.location}
                    </div>
                  )}
                  {edu.gpa && (
                    <div className="text-gray-600 mt-1">GPA: {edu.gpa}</div>
                  )}
                  {edu.description && (
                    <p className="mt-2 text-gray-600 whitespace-pre-line">
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
          <section>
            <h2 className="text-base font-medium uppercase tracking-wider text-gray-500 mb-4">
              Skills
            </h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {data.skills.map((skill) => (
                <div
                  key={skill.id}
                  style={{
                    color: skill.color || "rgb(75, 85, 99)",
                    fontStyle: skill.fontStyle || "normal",
                    fontWeight: skill.fontWeight || "normal",
                    textDecoration: skill.textDecoration || "none",
                  }}
                >
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {data.projects && data.projects.length > 0 && (
          <section>
            <h2 className="text-base font-medium uppercase tracking-wider text-gray-500 mb-4">
              Projects
            </h2>
            <div className="space-y-6">
              {data.projects.map((project) => (
                <div key={project.id} className="group">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900">
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
                      <div className="text-gray-500 text-sm">
                        {project.startDate && project.startDate}
                        {project.endDate && ` - ${project.endDate}`}
                      </div>
                    )}
                  </div>
                  {project.description && (
                    <p className="mt-2 text-gray-600 whitespace-pre-line">
                      {project.description}
                    </p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="text-sm text-gray-500">
                          {tech}
                          {project.technologies &&
                          index < project.technologies.length - 1
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
      </main>
    </div>
  );
};
