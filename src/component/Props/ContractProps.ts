export interface ContractProps {
  id: string;
  insuranceName: string;
  insuranceType: string;
  insurancePeriod: string;
  premium: number;
  paymentCycle: string;
  maxCompensation: string;
  dateOfSubscription: string;
  dateOfMaturity: string;
  maturity: boolean;
  resurrection: boolean;
  cancellation: boolean;
}
