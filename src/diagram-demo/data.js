export const typeToTaxStatusMap = {
  'Rectangle': 1,
  'Oval': 2,
  Triangle: 3,
  'Triange-Rectangle': 4,
  'Oval-Rectangle': 5,
  'Inv-Triangle-Rectangle': 6,
  'Oval-Triangle': 7,
  'Octagonal': 8
}

export const nodeData = [
  {
    id: 1,
    type: 'corporation_partnership',
    region: 'us',
    investment: 'inv1',
    legalEntity: 'le1',
    skip: false,
    color: ''
  },
  {
    id: 2,
    type: 'corporation_partnership',
    region: 'us',
    investment: 'inv2',
    legalEntity: 'le2',
    skip: false,
    color: ''
  }
]

export const edgeData = [
  {
    id: 1,
    from: 1,
    to: 2
  }
]

export const regions = [
  { id: 'us', label: 'US' },
  { id: 'in', label: 'IND' },
  { id: 'uk', label: 'UK' }
]

export const legalEntites = [
  { id: '2336', label: 'North Haven Real Estate Fund IX Global-T, L.P', taxStatusId: 3 },
  { id: '2337', label: 'North Haven Real Estate Fund IX Global-F (U.S.), L.P.', taxStatusId: 3 },
  { id: '2338', label: 'North Haven Real Estate Fund IX Global (U.S) Holding, L.P.(DE LP)', taxStatusId: 3 },
  { id: '2453', label: 'North Haven Bulldog Investor, LLC', taxStatusId: 2 },
  { id: '2454', label: 'NH Bulldog JV, LLC', taxStatusId: 3 },
  { id: '2455', label: 'TPG Bulldog Investor, LLC', taxStatusId: 3 },
  { id: '2467', label: 'Commonwealth Land Title Insurance Company', taxStatusId: 1 }
]

export const investments = [
  {id: 'inv1', label: 'All Investments' },
  {id: 'inv2', label: 'Demo Investment 1' },
  {id: 'inv3', label: 'Demo Investment 2' },
]