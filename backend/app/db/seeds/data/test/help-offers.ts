export interface HelpOffer {
  helper_id: number;
  help_request_id: number;
  status: string;
  created_at: string;
}

export const helpOffersData: HelpOffer[] = [
  {
    helper_id: 2,
    help_request_id: 1,
    status: "active",
    created_at: "2024-01-01T10:00:00.000Z",
  },
  {
    helper_id: 3,
    help_request_id: 2,
    status: "declined",
    created_at: "2024-01-01T11:00:00.000Z",
  },
  {
    help_request_id: 3,
    helper_id: 4,
    status: "accepted",
    created_at: "2024-01-02T10:00:00.000Z",
  },
  {
    help_request_id: 4,
    helper_id: 5,
    status: "active",
    created_at: "2024-01-03T10:00:00.000Z",
  },
  {
    help_request_id: 5,
    helper_id: 6,
    status: "declined",
    created_at: "2024-01-04T10:00:00.000Z",
  },
  {
    help_request_id: 6,
    helper_id: 7,
    status: "active",
    created_at: "2024-01-05T10:00:00.000Z",
  },
];

export default helpOffersData;
