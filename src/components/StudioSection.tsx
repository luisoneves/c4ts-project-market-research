
import studioData from '../data/studio.json';

export default function StudioSection() {
    return (
        <section id="studio" className="section studio-section bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{studioData.title}</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{studioData.tagline}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {studioData.description.map((paragraph, index) => (
                        <p key={index} className="text-gray-700 dark:text-gray-400">{paragraph}</p>
                    ))}
                </div>
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Nossos Valores</h3>
                    <ul className="list-disc pl-6 space-y-2">
                        {studioData.values.map((value, index) => (
                            <li key={index} className="text-gray-700 dark:text-gray-400">{value}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
