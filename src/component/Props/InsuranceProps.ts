export interface InsuranceProps {
  id: string;
  insuranceName: string;
  type: string;
  maxCompensation: number;
  periodOfInsurance: string;
  ageOfTarget: string;
  basicPremium: number;
  distributionStatus: boolean;
  authorization: boolean;
  insuranceClausePeriod: string;
  termsIdList: string;
  precaution: string;
}
