import { CV } from "@/types/cv";

export const ClassicTemplate: React.FC<{ data: CV }> = ({ data }) => {
  const defaultStyle = {
    primaryColor: "#4B5563", // Default gray
    fontFamily: "Georgia, serif",
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
      <header
        className="text-center pb-6 mb-6 border-b"
        style={{ borderColor: style.primaryColor }}
      >
        <h1
          className="text-4xl font-serif"
          style={{ color: style.primaryColor }}
        >
          {data.personalInfo?.fullName}
        </h1>
        {data.personalInfo?.title && (
          <h2 className="text-xl text-gray-600 mt-1 font-serif">
            {data.personalInfo.title}
          </h2>
        )}
        <div className="flex flex-wrap justify-center gap-4 text-gray-600 mt-3">
          {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo?.phone && <span>|</span>}
          {data.personalInfo?.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo?.location && <span>|</span>}
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
              className="hover:text-gray-800"
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
              className="hover:text-gray-800"
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
              className="hover:text-gray-800"
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
          <section>
            {" "}
            <h2
              className="text-2xl font-serif text-center mb-4 uppercase tracking-wider"
              style={{ color: style.primaryColor }}
            >
              Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div
                  key={exp.id}
                  className="pb-4 mb-4"
                  style={{ borderBottom: `1px solid ${style.primaryColor}` }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3
                        className="text-lg font-semibold"
                        style={{ color: style.primaryColor }}
                      >
                        {exp.position}
                      </h3>
                      <h4 className="text-gray-600 italic">{exp.company}</h4>
                    </div>
                    <div className="text-gray-600 text-sm whitespace-nowrap">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </div>
                  </div>
                  {exp.location && (
                    <div className="text-gray-600 text-sm mt-1 italic">
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

        {/* Education Section */}
        {data.education && data.education.length > 0 && (
          <section>
            <h2 className="text-2xl font-serif text-center text-gray-800 mb-4 uppercase tracking-wider">
              Education
            </h2>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div key={edu.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {edu.school}
                      </h3>
                      <h4 className="text-gray-600 italic">
                        {edu.degree} in {edu.fieldOfStudy}
                      </h4>
                    </div>
                    <div className="text-gray-600 text-sm whitespace-nowrap">
                      {edu.startDate} - {edu.endDate || "Present"}
                    </div>
                  </div>
                  {edu.location && (
                    <div className="text-gray-600 text-sm mt-1 italic">
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
            <h2 className="text-2xl font-serif text-center text-gray-800 mb-4 uppercase tracking-wider">
              Skills
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {data.skills.map((skill) => (
                <span
                  key={skill.id}
                  style={{
                    color: skill.color || "inherit",
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
