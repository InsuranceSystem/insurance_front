export interface ApplicationProps {
  insuranceApplicationID: string;
  insuranceName: string;
  customerName: string;
  createdAt: string;
  insurancePeriod: string;
  premium: string;
  paymentCycle: string;
  paymentPeriod: string;
  maxCompensation: string;
  subscriptionFilePath: string;
  approval: boolean;
  reasonOfApproval: string;
  state: string;
}
