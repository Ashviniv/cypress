import type { CloudSpecRun } from '../../../../graphql/src/gen/cloud-source-types.gen'
import type { CloudRunStatus } from '@packages/app/src/generated/graphql'

export const randomRunStatus: () => CloudRunStatus = () => {
  const r = Math.floor(Math.random() * 5)

  switch (r) {
    case 0: return 'CANCELLED'
    case 1: return 'ERRORED'
    case 2: return 'FAILED'
    case 3: return 'PASSED'
    default: return 'RUNNING'
  }
}

export const fakeRuns: (statuses: CloudRunStatus[]) => CloudSpecRun[] = (statuses) => {
  return statuses.map((s, idx) => {
    return {
      id: `SpecRun_${idx}`,
      status: s,
      createdAt: new Date('2022-05-08T03:17:00').toISOString(),
      runNumber: 432,
      groupCount: 2,
      specDuration: {
        min: 143, // 2:23
        max: 159, // 3:40
      },
      testsFailed: {
        min: 1,
        max: 2,
      },
      testsPassed: {
        min: 22,
        max: 23,
      },
      testsSkipped: {
      },
      testsPending: {
        min: 1,
        max: 2,
      },
      url: 'https://google.com',
    }
  })
}

export const exampleRuns = () => {
  const runs = fakeRuns(['PASSED', 'FAILED', 'CANCELLED', 'ERRORED'])

  const now = new Date()
  const twoYearsAgo = new Date(now.getFullYear() - 2, now.getMonth(), now.getDate())
  const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, now.getDate())

  runs[1].groupCount = 1
  runs[1].testsFailed = { ...runs[1].testsFailed ?? {}, max: null }
  runs[1].testsPassed = { ...runs[1].testsPassed ?? {}, max: null }
  runs[1].testsPending = { ...runs[1].testsPending ?? {}, max: null }
  runs[1].specDuration = { min: 3760, max: null }
  runs[1].testsFailed = { ...runs[1].testsFailed ?? {}, max: null }
  runs[1].createdAt = twoYearsAgo.toISOString()

  runs[2].createdAt = twoMonthsAgo.toISOString()
  runs[2].testsFailed = { ...runs[2].testsFailed ?? {}, max: runs[2].testsFailed?.min ?? null }

  runs[3].testsFailed = { ...runs[1].testsFailed ?? {}, max: 4358 }
  runs[3].testsPassed = { ...runs[1].testsPassed ?? {}, max: 4358 }
  runs[3].testsPending = { ...runs[1].testsPending ?? {}, max: 4358 }
  runs[3].testsSkipped = { min: 4, max: 4358 }
  runs[3].specDuration = { min: 3760, max: 37600 }
  runs[3].groupCount = 4358

  return runs
}