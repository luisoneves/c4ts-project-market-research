
import projectsData from '../data/projects.json';

export default function ProjectsSection() {
    return (
        <section id="projects" className="section projects-section bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">{projectsData.title}</h2>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4">
                    {projectsData.projects.map((project, index) => (
                        <div
                            key={index}
                            className="min-w-[320px] bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700"
                        >
                            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{project.name}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-3">{project.description}</p>
                            <div className="flex justify-between text-sm">
                                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">{project.type}</span>
                                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">{project.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
