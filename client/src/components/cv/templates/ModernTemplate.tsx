import { CV } from "@/types/cv";

export const ModernTemplate: React.FC<{ data: CV }> = ({ data }) => {
  const defaultStyle = {
    primaryColor: "#2563eb", // Default blue
    fontFamily: "Inter, sans-serif",
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
      {/* Header Section */}
      <header className="relative pb-6 mb-6">
        <div
          className="absolute top-24 left-0 w-full h-1 "
          style={{ backgroundColor: style.primaryColor }}
        ></div>
        <h1
          className="text-4xl font-bold mt-4"
          style={{ color: style.primaryColor }}
        >
          {data.personalInfo?.fullName}
        </h1>
        {data.personalInfo?.title && (
          <h2 className="text-xl text-gray-600 mt-1">
            {data.personalInfo.title}
          </h2>
        )}
        <div className="flex flex-wrap gap-4 text-gray-600 mt-3">
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
        </div>{" "}
        <div className="flex gap-4 mt-3">
          {data.personalInfo?.linkedin && (
            <a
              href={data.personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              LinkedIn
            </a>
          )}
          {data.personalInfo?.github && (
            <a
              href={data.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              GitHub
            </a>
          )}
          {data.personalInfo?.website && (
            <a
              href={data.personalInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              Website
            </a>
          )}
        </div>
        {data.personalInfo?.summary && (
          <p className="mt-4 text-gray-700 leading-relaxed">
            {data.personalInfo.summary}
          </p>
        )}
      </header>

      <main className="space-y-6">
        {/* Experience Section */}
        {data.experience && data.experience.length > 0 && (
          <section>
            {" "}
            <h2
              className="text-2xl font-semibold mb-4 pb-2 border-b-2"
              style={{
                color: style.primaryColor,
                borderColor: `${style.primaryColor}20`,
              }}
            >
              Experience
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div
                  key={exp.id}
                  className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {exp.position}
                      </h3>
                      <h4 className="text-gray-600">{exp.company}</h4>
                    </div>
                    <div className="text-gray-500 text-sm whitespace-nowrap">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </div>
                  </div>
                  {exp.location && (
                    <div className="text-gray-500 text-sm mt-1">
                      {exp.location}
                    </div>
                  )}
                  {exp.description && (
                    <p className="mt-2 text-gray-700 whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index} className="text-gray-700">
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
                          className="text-sm bg-blue-50 text-blue-600 px-2 py-1 rounded"
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

        {/* Education Section */}
        {data.education && data.education.length > 0 && (
          <section>
            {" "}
            <h2
              className="text-2xl font-semibold mb-4 pb-2 border-b-2"
              style={{
                color: style.primaryColor,
                borderColor: `${style.primaryColor}20`,
              }}
            >
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {edu.school}
                      </h3>
                      <h4 className="text-gray-600">
                        {edu.degree} in {edu.fieldOfStudy}
                      </h4>
                    </div>
                    <div className="text-gray-500 text-sm whitespace-nowrap">
                      {edu.startDate} - {edu.endDate || "Present"}
                    </div>
                  </div>
                  {edu.location && (
                    <div className="text-gray-500 text-sm mt-1">
                      {edu.location}
                    </div>
                  )}
                  {edu.gpa && (
                    <div className="text-gray-700 mt-1">GPA: {edu.gpa}</div>
                  )}
                  {edu.description && (
                    <p className="mt-2 text-gray-700 whitespace-pre-line">
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
            {" "}
            <h2
              className="text-2xl font-semibold mb-4 pb-2 border-b-2"
              style={{
                color: style.primaryColor,
                borderColor: `${style.primaryColor}20`,
              }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="bg-blue-50 px-4 py-2 rounded-full"
                  style={{
                    color: skill.color || "#2563eb",
                    fontStyle: skill.fontStyle || "normal",
                    fontWeight: skill.fontWeight || "normal",
                    textDecoration: skill.textDecoration || "none",
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {data.projects && data.projects.length > 0 && (
          <section>
            {" "}
            <h2
              className="text-2xl font-semibold mb-4 pb-2 border-b-2"
              style={{
                color: style.primaryColor,
                borderColor: `${style.primaryColor}20`,
              }}
            >
              Projects
            </h2>
            <div className="space-y-4">
              {data.projects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          {project.name}
                        </a>
                      ) : (
                        project.name
                      )}
                    </h3>
                    {(project.startDate || project.endDate) && (
                      <div className="text-gray-500 text-sm whitespace-nowrap">
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
                          className="text-sm bg-blue-50 text-blue-600 px-2 py-1 rounded"
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
