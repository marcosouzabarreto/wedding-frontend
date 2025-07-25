export interface FamilyMember {
  id: string;
  name: string;
  familyName: string;
  isMainContact: boolean;
  attending?: boolean;
  dietaryRestrictions?: string;
}

export interface Family {
  id: string;
  familyName: string;
  token: string;
  members: FamilyMember[];
  maxGuests: number;
}

// Mock family data - in a real app, this would come from your backend
export const mockFamilies: Family[] = [
  {
    id: '1',
    familyName: 'Barreto',
    token: 'BARRETO2025',
    maxGuests: 4,
    members: [
      { id: '1-1', name: 'Marco', familyName: 'Barreto', isMainContact: true },
      { id: '1-2', name: 'Ana', familyName: 'Barreto', isMainContact: false },
      { id: '1-3', name: 'João', familyName: 'Barreto', isMainContact: false },
      { id: '1-4', name: 'Maria', familyName: 'Barreto', isMainContact: false },
    ]
  },
  {
    id: '2',
    familyName: 'Silva',
    token: 'SILVA2025',
    maxGuests: 3,
    members: [
      { id: '2-1', name: 'Carlos', familyName: 'Silva', isMainContact: true },
      { id: '2-2', name: 'Lucia', familyName: 'Silva', isMainContact: false },
      { id: '2-3', name: 'Pedro', familyName: 'Silva', isMainContact: false },
    ]
  },
  {
    id: '3',
    familyName: 'Santos',
    token: 'SANTOS2025',
    maxGuests: 2,
    members: [
      { id: '3-1', name: 'Roberto', familyName: 'Santos', isMainContact: true },
      { id: '3-2', name: 'Elena', familyName: 'Santos', isMainContact: false },
    ]
  }
];