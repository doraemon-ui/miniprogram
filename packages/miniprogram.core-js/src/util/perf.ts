import { ComponentRenderProxy, Doraemon } from '../instance/init'
import { inMiniprogram } from './env'

/**
 * 更新性能统计
 *
 * @param {*} vm
 * @param {*} options
 */
export let setUpdatePerformance: (vm: ComponentRenderProxy<Doraemon>, options?: {
  withDataPaths?: boolean
  showZero?: boolean
}) => void

if (inMiniprogram) {
  setUpdatePerformance = function (vm, options = {}) {
    if (vm.setUpdatePerformanceListener) {
      vm.setUpdatePerformanceListener({ withDataPaths: true, ...options }, (res) => {
        const cost = res.updateEndTimestamp - res.updateStartTimestamp
        const isShow = options.showZero || cost > 0
        if (isShow) {
          console.info(`doraemon ${vm.$component.$options.name} update ${cost} ms`)
        }
      })
    }
  }
}
