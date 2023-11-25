export interface ApplicationProps {
  id: string;
  insuranceName: string;
  createdAt: string;
  insurancePeriod: string;
  premium: string;
  paymentCycle: string;
  maxCompensation: string;
  subscriptionFilePath: string;
  approval: boolean;
  reasonOfApproval: string;
}
