import { FamilyHistoryProps } from './FamilyHistoryProps';

export interface ApplicationDetailProps {
  insuranceType: string;
  insuranceName: string;
  insuranceBasicPremium: number;
  insuranceApplicationDate: string;
  customerName: string;
  customerBirth: string;
  customerGender: string;
  customerAddress: string;
  customerPhoneNumber: string;
  customerJob: string;
  familyHistories: FamilyHistoryProps[];
  insurancePeriod: string;
  paymentCycle: string;
  paymentPeriod: string;
  premium: string;
}
