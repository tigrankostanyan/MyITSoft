import type { ModelKind } from '~/data/types'
import { AutomationHubModel } from './models/AutomationHubModel'
import { AiBotModel, WorkflowGearModel } from './models/BotGearModels'
import { SmartphoneModel } from './models/SmartphoneModel'
import { WebStackModel } from './models/WebStackModel'
import { CloudServerModel, CrmDashboardModel, LaptopUIModel } from './models/WorkstationModels'

export type { ModelProps } from './models/modelTypes'
export {
  AutomationHubModel,
  AiBotModel,
  CloudServerModel,
  CrmDashboardModel,
  LaptopUIModel,
  SmartphoneModel,
  WebStackModel,
  WorkflowGearModel,
}

/** Kept for ExplodedCoreScene compatibility */
export function NovaCoreCapsule({ explode = 0 }: { explode?: number }) {
  return <WebStackModel exploded={explode} />
}

/** Dispatches a product kind to its 3D model */
export function Product3DModel({
  kind,
  color,
  exploded = 0,
  hologram = false,
}: {
  kind: ModelKind
  color?: string
  exploded?: number
  hologram?: boolean
}) {
  switch (kind) {
    case 'stack':
      return <WebStackModel color={color} exploded={exploded} hologram={hologram} />
    case 'hub':
      return <AutomationHubModel color={color} exploded={exploded} hologram={hologram} />
    case 'laptop':
      return <LaptopUIModel color={color} exploded={exploded} hologram={hologram} />
    case 'phone':
      return <SmartphoneModel color={color} exploded={exploded} hologram={hologram} />
    case 'server':
      return <CloudServerModel color={color} exploded={exploded} hologram={hologram} />
    case 'crm':
      return <CrmDashboardModel color={color} exploded={exploded} hologram={hologram} />
    case 'bot':
      return <AiBotModel color={color} exploded={exploded} hologram={hologram} />
    case 'gear':
      return <WorkflowGearModel color={color} exploded={exploded} hologram={hologram} />
  }
}
