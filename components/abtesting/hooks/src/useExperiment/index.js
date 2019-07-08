import {useContext} from 'react'
import {ExperimentContext as ExperimentContextFromPackage} from '@s-ui/abtesting-optimizely-x'

// Use the suitable context depending on the environment
let ExperimentContext
if (process.env.NODE_ENV === 'test') {
  const {
    ExperimentContext: ExperimentContextFromRelativePath
  } = require('../../../optimizelyXExperiment/src')
  ExperimentContext = ExperimentContextFromRelativePath
} else {
  ExperimentContext = ExperimentContextFromPackage
}

// Fallback object in case the hook is used in some point of the hierarchy
// that is not wrapped by OptimizelyXExperiment component (which is the
// provider of the actual context). This way we mainly avoid trying to access
// properties from undefined when no experiment context is present.
const NON_WRAPPED_BY_CONTEXT_PROVIDER_FALLBACK_OBJECT = {
  isDefault: true,
  isWrapped: false
}

export default () =>
  useContext(ExperimentContext) ||
  NON_WRAPPED_BY_CONTEXT_PROVIDER_FALLBACK_OBJECT