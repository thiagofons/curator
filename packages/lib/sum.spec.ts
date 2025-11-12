import { describe, expect, it } from 'vitest'

import { sum } from './sum'

describe('sum (sum function)', () => {
  
  it('must sum two number correctly', () => {
    
    // Arrange 
    const a = 1
    const b = 2

    // Act 
    const result = sum(a, b)

    // Assert 
    expect(result).toBe(3)
  })

  
  it('should deal with negative numbers', () => {
    expect(sum(-1, 5)).toBe(4)
  })
})