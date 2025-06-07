import { CV } from "@/types/cv";

export const Template1: React.FC<{ data: CV }> = ({ data }) => {
  return (
    <div
      className="cv-page bg-white p-8 shadow-lg w-[210mm] mx-auto print:mx-0 print:shadow-none"
      style={{ minHeight: "297mm" }}
    >
      {/* Header Section */}
      <header className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold">{data.personalInfo.fullName}</h1>
        {data.personalInfo.title && (
          <h2 className="text-xl text-gray-600 mt-1">
            {data.personalInfo.title}
          </h2>
        )}
        <div className="flex flex-wrap gap-4 text-gray-600 mt-2">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && (
            <span>{data.personalInfo.location}</span>
          )}
          {data.personalInfo.linkedin && (
            <a
              href={data.personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              LinkedIn
            </a>
          )}
          {data.personalInfo.github && (
            <a
              href={data.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              GitHub
            </a>
          )}
          {data.personalInfo.website && (
            <a
              href={data.personalInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              Website
            </a>
          )}
        </div>
        {data.personalInfo.summary && (
          <p className="mt-4 text-gray-700">{data.personalInfo.summary}</p>
        )}
      </header>

      <main className="space-y-6">
        {/* Experience Section */}
        {data.experience && data.experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Experience</h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{exp.position}</h3>
                      <h4 className="text-gray-700">{exp.company}</h4>
                    </div>
                    <div className="text-gray-600 text-sm whitespace-nowrap">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </div>
                  </div>
                  {exp.location && (
                    <div className="text-gray-600 text-sm mt-1">
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
            <h2 className="text-2xl font-semibold mb-4">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{edu.school}</h3>
                      <h4 className="text-gray-700">
                        {edu.degree} in {edu.fieldOfStudy}
                      </h4>
                    </div>
                    <div className="text-gray-600 text-sm whitespace-nowrap">
                      {edu.startDate} - {edu.endDate || "Present"}
                    </div>
                  </div>
                  {edu.location && (
                    <div className="text-gray-600 text-sm mt-1">
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
            <h2 className="text-2xl font-semibold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="bg-gray-100 px-3 py-1 rounded-full"
                >
                  <span className="font-medium">{skill.name}</span>
                  {skill.level && (
                    <span className="text-gray-600 ml-1">- {skill.level}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {data.projects && data.projects.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Projects</h2>
            <div className="space-y-4">
              {data.projects.map((project) => (
                <div key={project.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-600"
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
