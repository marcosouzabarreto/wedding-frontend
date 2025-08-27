export interface RSVP {
  ID: string;
  willAttend: boolean;
  dietaryRestrictions?: string;
  message?: string;
}

export interface FamilyMember {
  ID: string;
  name: string;
  familyName: string;
  isMainContact: boolean;
  dietaryRestrictions?: string;
  rsvp?: RSVP;
}

export interface Family {
  ID: string;
  familyName: string;
  token: string;
  email: string;
  phone: string;
  guests: FamilyMember[];
}

export interface FamilyRSVPMemberInput {
  guestId: string;
  willAttend: boolean;
  dietaryRestrictions?: string;
}

export interface FamilyRSVPRequest {
  familyToken: string;
  email: string;
  phone: string;
  message?: string;
  guests: FamilyRSVPMemberInput[];
}
