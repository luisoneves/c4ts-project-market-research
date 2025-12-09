
import servicesData from '../data/services.json';

export default function ServicesSection() {
    return (
        <section id="services" className="section services-section bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">{servicesData.title}</h2>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4">
                    {servicesData.services.map((service, index) => (
                        <div
                            key={index}
                            className="min-w-[320px] bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">{service.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
                            <button className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                                {service.cta}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
