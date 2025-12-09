
import StudioSection from '@/components/StudioSection'
import ServicesSection from '@/components/ServicesSection'
import ProjectsSection from '@/components/ProjectsSection'
import QuestionsSection from '@/components/QuestionsSection'
import ConnectSection from '@/components/ConnectSection'

export default function Home() {
  return (
    <div className="flex flex-col">
      <StudioSection />
      <ServicesSection />
      <ProjectsSection />
      <QuestionsSection />
      <ConnectSection />
    </div>
  )
}
