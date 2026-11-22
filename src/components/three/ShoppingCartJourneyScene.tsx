import { memo } from 'react'
import { TECH_BUILDERS_META } from '~/components/home/website-builder/builderTimeline'
import { WebsiteBuilderStage } from '~/components/home/website-builder/WebsiteBuilderStage'

export { TECH_BUILDERS_META }

interface ShoppingCartJourneySceneProps {
  scrollProgressRef: React.MutableRefObject<number>
}

export const ShoppingCartJourneyScene = memo(function ShoppingCartJourneyScene({
  scrollProgressRef,
}: ShoppingCartJourneySceneProps) {
  return <WebsiteBuilderStage scrollProgressRef={scrollProgressRef} />
})
