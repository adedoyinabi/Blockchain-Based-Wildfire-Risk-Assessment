# Blockchain-Based Wildfire Risk Assessment

A decentralized platform for transparent, verifiable wildfire risk management that connects property owners, inspectors, insurance providers, and emergency services.

## Overview

This project implements a suite of smart contracts to improve wildfire preparedness and reduce property loss through transparent risk assessment, incentivized mitigation efforts, and verified compliance with safety standards. By leveraging blockchain technology, we create an immutable record of property conditions, vegetation management, and safety inspections that can inform emergency response and insurance pricing.

## Key Features

- **Verifiable property data** - Immutable records of structures in fire-prone areas
- **Defensible space tracking** - Transparent monitoring of vegetation management efforts
- **Inspection verification** - Tamper-proof documentation of fire safety compliance
- **Risk reduction incentives** - Automated rewards for property owners who mitigate fire risks
- **Emergency responder integration** - Critical information for firefighters during active events
- **Data-driven policy making** - Aggregate insights for community-wide risk reduction

## Smart Contracts

### 1. Property Registration Contract

Records and maintains detailed information about properties in wildfire-prone areas.

**Functionality:**
- Property profile creation with location, structure details, and risk factors
- Ownership verification and transfer management
- Historical modification tracking
- Integration with official property records
- Risk factor calculation based on location and property characteristics
- Emergency contact information management
- Special needs or considerations for evacuation planning

### 2. Vegetation Management Contract

Tracks the creation and maintenance of defensible space around structures.

**Functionality:**
- Vegetation clearing documentation and verification
- Before/after imagery storage
- Scheduled maintenance reminders
- Seasonal requirement adjustments
- Professional contractor verification
- Compliance with local defensible space regulations
- Native and fire-resistant replanting tracking

### 3. Inspection Verification Contract

Validates and records compliance with fire safety standards and measures.

**Functionality:**
- Inspector credential verification
- Comprehensive inspection checklist management
- Non-compliance flagging and remediation tracking
- Inspection scheduling and history
- Photo and documentation storage
- Automatic notification of inspection results
- Appeal and resolution processes

### 4. Insurance Incentive Contract

Rewards property owners for taking verified steps to reduce wildfire risk.

**Functionality:**
- Risk score calculation based on verified data
- Premium discount automation
- Incentive distribution for completed mitigation efforts
- Claim history tracking
- Multi-insurer participation management
- Annual reassessment automation
- Community-wide risk pool calculations

## Technical Architecture

The system combines on-chain and off-chain components:

- **Blockchain Layer**: Ethereum-based smart contracts for core functionality
- **User Interface**: Web and mobile applications for property owners, inspectors, and insurers
- **Data Storage**: IPFS for property images, inspection reports, and documentation
- **Geospatial Integration**: Mapping services for property visualization and risk assessment
- **Weather API**: Integration with fire weather forecasting and alerts
- **Satellite Imagery**: Periodic vegetation analysis and change detection

## Getting Started

### Prerequisites

- Node.js (v16+)
- Truffle Suite
- MetaMask or similar web3 wallet
- Ganache (for local development)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/wildfire-risk-blockchain.git
   cd wildfire-risk-blockchain
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Compile smart contracts:
   ```
   truffle compile
   ```

4. Deploy to local network:
   ```
   truffle migrate --reset
   ```

### Testing

Run the automated test suite:
```
truffle test
```

## Deployment

### Local Development
1. Start Ganache local blockchain
2. Deploy contracts with `truffle migrate`
3. Connect MetaMask to your local Ganache instance
4. Run the front-end with `npm start`

### Testnet/Mainnet Deployment
1. Configure your `.env` file with appropriate network credentials
2. Run `truffle migrate --network [network_name]`
3. Verify contracts on Etherscan

## Usage Examples

### Registering a Property

```javascript
// Connect to the property registration contract
const propertyContract = await PropertyRegistration.deployed();

// Register a new property
await propertyContract.registerProperty(
  geoCoordinates,
  propertySize,
  structureType,
  constructionMaterials,
  "QmW2WQi7j...",  // IPFS hash of property documentation
  accessRoutes,
  waterSourcesAvailable,
  { from: ownerAddress }
);
```

### Recording Vegetation Management

```javascript
// Connect to the vegetation management contract
const vegetationContract = await VegetationManagement.deployed();

// Record defensible space clearing
await vegetationContract.recordClearingActivity(
  propertyId,
  clearingDate,
  zonesClearedBitmap,
  "QmT2WQ...",  // IPFS hash of before/after images
  professionalContractorId, // 0 if done by owner
  { from: ownerAddress }
);
```

### Submitting an Inspection Report

```javascript
// Connect to the inspection verification contract
const inspectionContract = await InspectionVerification.deployed();

// Submit inspection results
await inspectionContract.submitInspection(
  propertyId,
  inspectionDate,
  complianceScore,
  "QmR5Tf3k...",  // IPFS hash of inspection report
  remediationRequiredBitmap,
  reinspectionDate,
  { from: inspectorAddress }
);
```

### Calculating Insurance Incentives

```javascript
// Connect to the insurance incentive contract
const incentiveContract = await InsuranceIncentive.deployed();

// Calculate and apply incentives
await incentiveContract.calculatePropertyIncentives(
  propertyId,
  insurancePeriodStart,
  insurancePeriodEnd,
  baseRate,
  { from: insurerAddress }
);
```

## Stakeholder Benefits

### For Property Owners
- Clear understanding of wildfire risks
- Guidance on effective mitigation strategies
- Financial incentives for risk reduction
- Possible insurance premium discounts
- Increased property value through documented safety measures

### For Insurance Companies
- Verified risk assessment data
- Reduced claims through proactive mitigation
- Automated incentive distribution
- More accurate premium calculations
- Transparent property history for underwriting

### For Fire Agencies
- Comprehensive mapping of high-risk properties
- Pre-incident planning information
- Verification of community-wide mitigation efforts
- Data-driven resource allocation
- Improved public education and outreach

### For Communities
- Reduced wildfire risk
- Increased community resilience
- Transparent risk management
- Data-driven policy development
- Improved emergency response planning

## Risk Assessment Methodology

The system employs a comprehensive risk assessment approach:

- **Property Factors**: Construction materials, roof type, structural features
- **Environmental Factors**: Vegetation type, density, terrain, and climate
- **Historical Data**: Previous fires, weather patterns, and seasonal risks
- **Mitigation Activities**: Defensible space creation, home hardening, access improvements
- **Community Context**: Neighboring properties, evacuation routes, regional fire resources

## Future Development

- Drone-based automated inspection and verification
- Real-time integration with fire detection systems
- Machine learning for predictive risk modeling
- Community-wide mitigation coordination tools
- Integration with emergency evacuation systems
- Carbon offset credits for sustainable vegetation management

## Data Privacy and Security

The system implements robust privacy and security measures:

- Granular permission settings for property data
- Emergency access protocols for first responders
- Data encryption for sensitive information
- Owner control over personal information disclosure
- Compliance with regional data protection regulations

## Contributing

We welcome contributions to the Blockchain-Based Wildfire Risk Assessment project!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to the Wildfire Prevention Alliance for domain expertise
- Built with support from the Fire Safe Council Network
- Special thanks to the fire professionals, insurance experts, and property owners who provided feedback during development
