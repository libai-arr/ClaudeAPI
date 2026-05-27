import { describe, expect, it } from 'vitest'
import { resolveDocumentTitle } from '@/router/title'

describe('resolveDocumentTitle', () => {
  it('路由存在标题时，仅使用站点名', () => {
    expect(resolveDocumentTitle('Usage Records', 'My Site')).toBe('My Site')
  })

  it('路由无标题时，回退到站点名', () => {
    expect(resolveDocumentTitle(undefined, 'My Site')).toBe('My Site')
  })

  it('站点名为空时，回退默认站点名', () => {
    expect(resolveDocumentTitle('Dashboard', '')).toBe('Sub2API')
    expect(resolveDocumentTitle(undefined, '   ')).toBe('Sub2API')
  })

  it('站点名变更时仅影响后续路由标题计算', () => {
    const before = resolveDocumentTitle('Admin Dashboard', 'Alpha')
    const after = resolveDocumentTitle('Admin Dashboard', 'Beta')

    expect(before).toBe('Alpha')
    expect(after).toBe('Beta')
  })
})
