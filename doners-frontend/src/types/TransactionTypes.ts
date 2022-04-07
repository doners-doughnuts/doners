export type TransactionListItemType = {
  account: string;
  balance: number;
};

// export type DonationTransactionType = {
//   account: string; // "0xb72207EB8c21c7698d493Da3bB273F6C8a76E367"
//   date: string; // "1649051426"
//   value: string; // "1"
// };

export type DonationTransactionType = {
  fromAccount: string; // "0xb72207EB8c21c7698d493Da3bB273F6C8a76E367"
  toAccount: string;
  date: string; // "1649051426"
  value: string; // "1"
  donationId: string; // ""
  donationTitle: string; // "(기부글 제목)"
};
