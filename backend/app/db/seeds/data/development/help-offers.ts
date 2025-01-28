export interface HelpOffer {
  help_request_id: number;
  helper_id: number;
  status: string;
  created_at: string;
}

export const helpOffersData: HelpOffer[] = [
  // Help Request 1 (author_id: 1)
  {
    help_request_id: 1,
    helper_id: 2,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },
  {
    help_request_id: 1,
    helper_id: 3,
    status: "declined",
    created_at: "2024-05-21T14:00:00.000Z",
  },
  {
    help_request_id: 1,
    helper_id: 4,
    status: "active",
    created_at: "2024-05-21T15:00:00.000Z",
  },

  // Help Request 2 (author_id: 2)
  {
    help_request_id: 2,
    helper_id: 3,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },
  {
    help_request_id: 2,
    helper_id: 4,
    status: "declined",
    created_at: "2024-05-21T14:00:00.000Z",
  },

  // Help Request 3 (author_id: 3)
  {
    help_request_id: 3,
    helper_id: 1,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },
  {
    help_request_id: 3,
    helper_id: 2,
    status: "declined",
    created_at: "2024-05-21T14:00:00.000Z",
  },

  // Help Request 4 (author_id: 4)
  {
    help_request_id: 4,
    helper_id: 1,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },
  {
    help_request_id: 4,
    helper_id: 2,
    status: "active",
    created_at: "2024-05-21T14:00:00.000Z",
  },
  {
    help_request_id: 4,
    helper_id: 3,
    status: "declined",
    created_at: "2024-05-21T15:00:00.000Z",
  },

  // Help Request 5 (author_id: 5)
  {
    help_request_id: 5,
    helper_id: 1,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },
  {
    help_request_id: 5,
    helper_id: 2,
    status: "declined",
    created_at: "2024-05-21T14:00:00.000Z",
  },

  // Help Request 6 (author_id: 6)
  {
    help_request_id: 6,
    helper_id: 1,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },
  {
    help_request_id: 6,
    helper_id: 2,
    status: "declined",
    created_at: "2024-05-21T14:00:00.000Z",
  },
  {
    help_request_id: 6,
    helper_id: 3,
    status: "active",
    created_at: "2024-05-21T15:00:00.000Z",
  },

  // Help Request 7 (author_id: 7)
  {
    help_request_id: 7,
    helper_id: 1,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },
  {
    help_request_id: 7,
    helper_id: 2,
    status: "declined",
    created_at: "2024-05-21T14:00:00.000Z",
  },

  // Help Request 8 (author_id: 8)
  {
    help_request_id: 8,
    helper_id: 1,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },
  {
    help_request_id: 8,
    helper_id: 2,
    status: "active",
    created_at: "2024-05-21T14:00:00.000Z",
  },

  // Help Request 9 (author_id: 9)
  {
    help_request_id: 9,
    helper_id: 1,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },
  {
    help_request_id: 9,
    helper_id: 2,
    status: "declined",
    created_at: "2024-05-21T14:00:00.000Z",
  },
  {
    help_request_id: 9,
    helper_id: 3,
    status: "active",
    created_at: "2024-05-21T15:00:00.000Z",
  },

  // Help Request 10 (author_id: 10)
  {
    help_request_id: 10,
    helper_id: 1,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },
  {
    help_request_id: 10,
    helper_id: 2,
    status: "declined",
    created_at: "2024-05-21T14:00:00.000Z",
  },

  // Help Requests 11-20
  {
    help_request_id: 11,
    helper_id: 4,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },
  {
    help_request_id: 11,
    helper_id: 5,
    status: "declined",
    created_at: "2024-05-21T14:00:00.000Z",
  },

  {
    help_request_id: 12,
    helper_id: 6,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },

  {
    help_request_id: 13,
    helper_id: 7,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },
  {
    help_request_id: 13,
    helper_id: 8,
    status: "declined",
    created_at: "2024-05-21T14:00:00.000Z",
  },

  {
    help_request_id: 14,
    helper_id: 9,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },

  {
    help_request_id: 15,
    helper_id: 10,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },
  {
    help_request_id: 15,
    helper_id: 11,
    status: "declined",
    created_at: "2024-05-21T14:00:00.000Z",
  },

  {
    help_request_id: 16,
    helper_id: 12,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },

  {
    help_request_id: 17,
    helper_id: 13,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },
  {
    help_request_id: 17,
    helper_id: 14,
    status: "declined",
    created_at: "2024-05-21T14:00:00.000Z",
  },

  {
    help_request_id: 18,
    helper_id: 15,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },

  {
    help_request_id: 19,
    helper_id: 2,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },
  {
    help_request_id: 19,
    helper_id: 3,
    status: "declined",
    created_at: "2024-05-21T14:00:00.000Z",
  },

  {
    help_request_id: 20,
    helper_id: 4,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },

  // Help Requests 22-24
  {
    help_request_id: 22,
    helper_id: 5,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },
  {
    help_request_id: 22,
    helper_id: 6,
    status: "declined",
    created_at: "2024-05-21T14:00:00.000Z",
  },

  {
    help_request_id: 23,
    helper_id: 7,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },

  {
    help_request_id: 24,
    helper_id: 8,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },
  {
    help_request_id: 24,
    helper_id: 9,
    status: "declined",
    created_at: "2024-05-21T14:00:00.000Z",
  },

  // Help Requests 26-29
  {
    help_request_id: 26,
    helper_id: 10,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },

  {
    help_request_id: 27,
    helper_id: 11,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },
  {
    help_request_id: 27,
    helper_id: 12,
    status: "declined",
    created_at: "2024-05-21T14:00:00.000Z",
  },

  {
    help_request_id: 28,
    helper_id: 13,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },

  {
    help_request_id: 29,
    helper_id: 14,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },
  {
    help_request_id: 29,
    helper_id: 15,
    status: "declined",
    created_at: "2024-05-21T14:00:00.000Z",
  },

  // Help Requests 31-34
  {
    help_request_id: 31,
    helper_id: 2,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },

  {
    help_request_id: 32,
    helper_id: 3,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },
  {
    help_request_id: 32,
    helper_id: 4,
    status: "declined",
    created_at: "2024-05-21T14:00:00.000Z",
  },

  {
    help_request_id: 33,
    helper_id: 5,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },

  {
    help_request_id: 34,
    helper_id: 6,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },
  {
    help_request_id: 34,
    helper_id: 7,
    status: "declined",
    created_at: "2024-05-21T14:00:00.000Z",
  },

  // Help Requests 36-39
  {
    help_request_id: 36,
    helper_id: 8,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },

  {
    help_request_id: 37,
    helper_id: 9,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },
  {
    help_request_id: 37,
    helper_id: 10,
    status: "declined",
    created_at: "2024-05-21T14:00:00.000Z",
  },

  {
    help_request_id: 38,
    helper_id: 11,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },

  {
    help_request_id: 39,
    helper_id: 12,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },
  {
    help_request_id: 39,
    helper_id: 13,
    status: "declined",
    created_at: "2024-05-21T14:00:00.000Z",
  },

  // Help Request 11 (author_id: 1)
  {
    help_request_id: 11,
    helper_id: 3,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },

  // Help Request 12 (author_id: 2)
  {
    help_request_id: 12,
    helper_id: 4,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },
  {
    help_request_id: 12,
    helper_id: 5,
    status: "active",
    created_at: "2024-05-21T14:00:00.000Z",
  },

  // Help Request 13 (author_id: 3)
  {
    help_request_id: 13,
    helper_id: 5,
    status: "active",
    created_at: "2024-05-21T13:00:00.000Z",
  },
  {
    help_request_id: 13,
    helper_id: 6,
    status: "declined",
    created_at: "2024-05-21T14:00:00.000Z",
  },
];

export default helpOffersData;
