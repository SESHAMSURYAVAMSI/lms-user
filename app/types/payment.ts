export interface EventDetails {
    _id: string;
    fullName: string;
    shortName: string;
    regType: "PAID" | "FREE";
    amount: number;
}

export interface Payment {
    _id: string;
    user_id: string;
    event_id: EventDetails;
    transactionId: string;
    paymentGateway: string;
    amount: number;
    status: "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";
    paymentDate: string;
    createdAt: string;
    updatedAt: string;
    paymentMode: "CARD" | "NETBANKING" | "UPI" | "WALLET" | "EMI" | "UNKNOWN";
}
