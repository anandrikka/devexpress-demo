export const entities = [
  {
    taxStatusId: 1,
    taxStatusName: 'Corporation (US) Corporation (Local)',
    shape: 'Rectangle'
  },
  {
    taxStatusId: 2,
    taxStatusName: 'Branch (US) Branch (Local)',
    shape: 'Oval',
    baseType: 'ellipse'
  },
  {
    taxStatusId: 3,
    taxStatusName: 'Partnership (US) Partnership (Local)',
    shape: 'Triangle',
    baseType: 'triangle'
  },
  {
    taxStatusId: 4,
    taxStatusName: 'Partnership (US) Corporation (Local)',
    shape: 'Triangle-Rectangle'
  },
  {
    taxStatusId: 5,
    taxStatusName: 'Disregarded (US) Corporation (Local)',
    shape: 'Oval-Rectangle'
  },
  {
    taxStatusId: 6,
    taxStatusName: 'Corporation (US) Partnership (Local)',
    shape: 'Inv-Triangle-Rectangle'
  },
  {
    taxStatusId: 7,
    taxStatusName: 'Disregarded (US) Partnership (Local)',
    shape: 'Oval-Triangle',
    baseType: 'triangle'
  }
]

export const relationShipTypes = [
  {
    relationshipTypeId: 1,
    relationshipName: 'Equity'
  },
  {
    relationshipTypeId: 2,
    relationshipName: 'Loans from affiliates'
  },
  {
    relationshipTypeId: 3,
    relationshipName: 'CPECs/TPECS/PECS'
  },
  {
    relationshipTypeId: 4,
    relationshipName: 'Other loan'
  },
  {
    relationshipTypeId: 5,
    relationshipName: 'Other payments'
  },
  {
    relationshipTypeId: 6,
    relationshipName: 'Placeholder'
  }
]