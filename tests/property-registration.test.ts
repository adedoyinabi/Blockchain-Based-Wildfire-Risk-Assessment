import { describe, it, expect, beforeEach } from "vitest"

// Mock the Clarity contract interactions
// Since we can't use @hirosystems/clarinet-sdk or @stacks/transactions, we'll create mocks

// Mock storage for our tests
const mockStorage = {
  properties: new Map(),
  lastPropertyId: 0,
}

// Mock contract functions
const mockContractFunctions = {
  registerProperty: (location: string, size: number, constructionType: string, riskZone: string, sender: string) => {
    const newId = mockStorage.lastPropertyId + 1
    mockStorage.lastPropertyId = newId
    
    mockStorage.properties.set(newId, {
      owner: sender,
      location,
      size,
      constructionType,
      riskZone,
      registrationTime: 123, // Mock block height
    })
    
    return { success: true, value: newId }
  },
  
  getProperty: (propertyId: number) => {
    const property = mockStorage.properties.get(propertyId)
    return property ? { success: true, value: property } : { success: false, error: "Property not found" }
  },
  
  getPropertyCount: () => {
    return { success: true, value: mockStorage.lastPropertyId }
  },
  
  updateRiskZone: (propertyId: number, newRiskZone: string, sender: string) => {
    const property = mockStorage.properties.get(propertyId)
    
    if (!property) {
      return { success: false, error: "Property not found" }
    }
    
    if (property.owner !== sender) {
      return { success: false, error: "Not the owner" }
    }
    
    property.riskZone = newRiskZone
    mockStorage.properties.set(propertyId, property)
    
    return { success: true }
  },
}

describe("Property Registration Contract", () => {
  beforeEach(() => {
    // Reset mock storage before each test
    mockStorage.properties.clear()
    mockStorage.lastPropertyId = 0
  })
  
  it("should register a new property", () => {
    const result = mockContractFunctions.registerProperty(
        "123 Forest Lane",
        2500,
        "Wood Frame",
        "High Risk",
        "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    )
    
    expect(result.success).toBe(true)
    expect(result.value).toBe(1)
    expect(mockStorage.lastPropertyId).toBe(1)
    
    const property = mockStorage.properties.get(1)
    expect(property).toBeDefined()
    expect(property?.location).toBe("123 Forest Lane")
    expect(property?.riskZone).toBe("High Risk")
  })
  
  it("should retrieve a property by id", () => {
    // Register a property first
    mockContractFunctions.registerProperty(
        "123 Forest Lane",
        2500,
        "Wood Frame",
        "High Risk",
        "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    )
    
    const result = mockContractFunctions.getProperty(1)
    
    expect(result.success).toBe(true)
    expect(result.value.location).toBe("123 Forest Lane")
    expect(result.value.size).toBe(2500)
  })
  
  it("should return the correct property count", () => {
    expect(mockContractFunctions.getPropertyCount().value).toBe(0)
    
    // Register two properties
    mockContractFunctions.registerProperty(
        "123 Forest Lane",
        2500,
        "Wood Frame",
        "High Risk",
        "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    )
    
    mockContractFunctions.registerProperty(
        "456 Mountain Road",
        3200,
        "Brick",
        "Medium Risk",
        "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    )
    
    expect(mockContractFunctions.getPropertyCount().value).toBe(2)
  })
  
  it("should update risk zone for property owner", () => {
    const owner = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"
    
    // Register a property
    mockContractFunctions.registerProperty("123 Forest Lane", 2500, "Wood Frame", "High Risk", owner)
    
    const result = mockContractFunctions.updateRiskZone(1, "Medium Risk", owner)
    
    expect(result.success).toBe(true)
    
    const property = mockStorage.properties.get(1)
    expect(property?.riskZone).toBe("Medium Risk")
  })
  
  it("should not allow non-owners to update risk zone", () => {
    // Register a property
    mockContractFunctions.registerProperty(
        "123 Forest Lane",
        2500,
        "Wood Frame",
        "High Risk",
        "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    )
    
    const result = mockContractFunctions.updateRiskZone(
        1,
        "Low Risk",
        "ST2PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", // Different address
    )
    
    expect(result.success).toBe(false)
    
    const property = mockStorage.properties.get(1)
    expect(property?.riskZone).toBe("High Risk") // Unchanged
  })
})

