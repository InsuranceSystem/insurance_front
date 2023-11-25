export interface InsuranceProps {
  id: string;
  insuranceName: string;
  type: string;
  maxCompensation: number;
  periodOfInsurance: string;
  paymentCycle: string;
  paymentPeriod: string;
  ageOfTarget: string;
  basicPremium: number;
  rate: string;
  distributionStatus: boolean;
  authorization: boolean;
  TermsIDList: string;
  insuranceClausePeriod: string;
  precaution: string;
}
