export interface Comment {
  id?: number;
  author_id: number;
  help_request_id: number;
  parent_id: number | null;
  created_at: number | string;
  description: string;
  replies?: Comment[];
}

export interface NewCommentBody {
  author_id: number;
  help_request_id: number;
  parent_id: number | null;
  description: string;
}

export const commentsData: Comment[] = [
  // Help Request: "Need help with grocery shopping"
  {
    help_request_id: 1,
    author_id: 2,
    created_at: "2024-05-21T13:00:00.000Z",
    parent_id: null,
    description:
      "I can help with your Monday shopping. I'm heading there anyway and have a car!",
  },
  {
    help_request_id: 1,
    author_id: 1,
    created_at: "2024-05-21T13:30:00.000Z",
    parent_id: 1,
    description: "That would be perfect! What time works best for you?",
  },

  // Help Request: "Assistance required for house cleaning" (type 3)
  {
    help_request_id: 2,
    author_id: 3,
    created_at: "2024-05-22T10:00:00.000Z",
    parent_id: null,
    description:
      "I have experience with house cleaning and I'm free this Saturday. I have my own cleaning supplies too.",
  },

  // Help Request: "Need a ride to the doctor's appointment" (type 2)
  {
    help_request_id: 3,
    author_id: 4,
    created_at: "2024-05-20T17:00:00.000Z",
    parent_id: null,
    description:
      "I can drive you to your appointment on Wednesday. What time do you need to be there?",
  },
  {
    help_request_id: 3,
    author_id: 3,
    created_at: "2024-05-20T17:30:00.000Z",
    parent_id: 3,
    description:
      "The appointment is at 11:30am. Would you be able to pick me up at 11am?",
  },

  // Help Request 1 - Threaded conversation
  {
    help_request_id: 1,
    author_id: 3,
    created_at: "2024-05-22T10:00:00.000Z",
    parent_id: null,
    description:
      "I can help with this. I'm free most weekends and have a large car.",
  },
  {
    help_request_id: 1,
    author_id: 1,
    created_at: "2024-05-22T10:30:00.000Z",
    parent_id: 1,
    description: "That would be great! Would this Saturday work for you?",
  },

  // Help Request 2 - Single comment
  {
    help_request_id: 2,
    author_id: 4,
    created_at: "2024-05-22T12:00:00.000Z",
    parent_id: null,
    description:
      "I'm heading to Tesco tomorrow morning, happy to help with your shopping!",
  },

  // Help Request 3 - Threaded conversation
  {
    help_request_id: 3,
    author_id: 7,
    created_at: "2024-05-22T14:00:00.000Z",
    parent_id: null,
    description:
      "I'm a keen gardener and would love to help! When would you like to get started?",
  },
  {
    help_request_id: 3,
    author_id: 2,
    created_at: "2024-05-22T14:30:00.321Z",
    parent_id: null,
    description:
      "I'm heading to the supermarket on Friday morning anyway, happy to help with your shopping!",
  },

  // Help Request 4 - Single comment
  {
    help_request_id: 4,
    author_id: 5,
    created_at: "2024-05-23T09:00:00.000Z",
    parent_id: null,
    description:
      "I work in IT and could help you set this up. Are you free this evening?",
  },

  // Help Request 5 - Threaded
  {
    help_request_id: 5,
    author_id: 4,
    created_at: "2024-05-23T10:00:00.000Z",
    parent_id: null,
    description:
      "I'm a qualified electrician and can help with this. When's good for you?",
  },
  {
    help_request_id: 5,
    author_id: 1,
    created_at: "2024-05-23T10:30:00.000Z",
    parent_id: 5,
    description: "That's great! Would tomorrow afternoon work for you?",
  },

  // Help Request 6 - Single
  {
    help_request_id: 6,
    author_id: 5,
    created_at: "2024-05-23T11:00:00.000Z",
    parent_id: null,
    description:
      "I drive past there every day on my commute, happy to help with transport!",
  },

  // Help Request 7 - Threaded
  {
    help_request_id: 7,
    author_id: 6,
    created_at: "2024-05-23T12:00:00.000Z",
    parent_id: null,
    description:
      "I have all the painting equipment and can help. Is the weekend good?",
  },
  {
    help_request_id: 7,
    author_id: 2,
    created_at: "2024-05-23T12:30:00.000Z",
    parent_id: 7,
    description: "Weekend would be perfect! Saturday morning?",
  },

  // Help Request 8 - Single
  {
    help_request_id: 8,
    author_id: 7,
    created_at: "2024-05-23T13:00:00.000Z",
    parent_id: null,
    description: "I'm a retired plumber, happy to take a look at this for you.",
  },

  // Help Request 9 - Single
  {
    help_request_id: 9,
    author_id: 8,
    created_at: "2024-05-23T14:00:00.000Z",
    parent_id: null,
    description:
      "I do weekly shopping trips and could include your items. Let me know if interested!",
  },

  // Help Request 10 - Threaded
  {
    help_request_id: 10,
    author_id: 3,
    created_at: "2024-05-23T15:00:00.000Z",
    parent_id: null,
    description:
      "I'm good with computers and could help set this up. When are you free?",
  },
  {
    help_request_id: 10,
    author_id: 1,
    created_at: "2024-05-23T15:30:00.000Z",
    parent_id: 10,
    description: "That would be great! Could you come by tomorrow evening?",
  },

  // Help Request 11 - Threaded
  {
    help_request_id: 11,
    author_id: 4,
    created_at: "2024-05-23T16:00:00.000Z",
    parent_id: null,
    description:
      "I'm experienced with elderly care and live nearby. Would you like to discuss the details?",
  },
  {
    help_request_id: 11,
    author_id: 2,
    created_at: "2024-05-23T16:30:00.000Z",
    parent_id: 11,
    description: "Yes please! Could we meet tomorrow to talk it through?",
  },

  // Help Request 12 - Single
  {
    help_request_id: 12,
    author_id: 5,
    created_at: "2024-05-23T17:00:00.000Z",
    parent_id: null,
    description:
      "I'm a handyman and have all the tools needed. Free this weekend if you'd like help.",
  },

  // Help Request 13 - Threaded
  {
    help_request_id: 13,
    author_id: 6,
    created_at: "2024-05-23T18:00:00.000Z",
    parent_id: null,
    description:
      "I'm fluent in French and would love to help with conversation practice!",
  },
  {
    help_request_id: 13,
    author_id: 3,
    created_at: "2024-05-23T18:30:00.000Z",
    parent_id: 13,
    description: "That would be perfect! Could we meet at the local café?",
  },

  // Help Request 14 - Single
  {
    help_request_id: 14,
    author_id: 7,
    created_at: "2024-05-23T19:00:00.000Z",
    parent_id: null,
    description:
      "I have a large van and help people move furniture regularly. Happy to help!",
  },

  // Help Request 15 - Threaded
  {
    help_request_id: 15,
    author_id: 8,
    created_at: "2024-05-23T20:00:00.000Z",
    parent_id: null,
    description:
      "I'm a dog walker and could definitely help with this. Which days do you need?",
  },
  {
    help_request_id: 15,
    author_id: 1,
    created_at: "2024-05-23T20:30:00.000Z",
    parent_id: 15,
    description: "Weekday mornings would be ideal. Are you available then?",
  },

  // Help Request 16 - Single
  {
    help_request_id: 16,
    author_id: 2,
    created_at: "2024-05-24T09:00:00.000Z",
    parent_id: null,
    description:
      "I'm good with computers and could help set this up. Available evenings this week.",
  },

  // Help Request 17 - Threaded
  {
    help_request_id: 17,
    author_id: 3,
    created_at: "2024-05-24T10:00:00.000Z",
    parent_id: null,
    description:
      "I'm a keen gardener and would love to help with your garden project!",
  },
  {
    help_request_id: 17,
    author_id: 4,
    created_at: "2024-05-24T10:30:00.000Z",
    parent_id: 17,
    description: "That's great! Would you be free this Saturday morning?",
  },

  // Help Request 18 - Single
  {
    help_request_id: 18,
    author_id: 5,
    created_at: "2024-05-24T11:00:00.000Z",
    parent_id: null,
    description:
      "I do weekly shopping runs and could easily pick up your items too.",
  },

  // Help Request 19 - Threaded
  {
    help_request_id: 19,
    author_id: 6,
    created_at: "2024-05-24T12:00:00.000Z",
    parent_id: null,
    description:
      "I'm a retired teacher and would be happy to help with tutoring.",
  },
  {
    help_request_id: 19,
    author_id: 7,
    created_at: "2024-05-24T12:30:00.000Z",
    parent_id: 19,
    description: "Perfect! Could we arrange a trial session next week?",
  },

  // Help Request 20 - Single
  {
    help_request_id: 20,
    author_id: 8,
    created_at: "2024-05-24T13:00:00.000Z",
    parent_id: null,
    description:
      "I'm experienced with home repairs. Happy to take a look this weekend.",
  },

  // Help Request 21 - Threaded
  {
    help_request_id: 21,
    author_id: 3,
    created_at: "2024-05-24T14:00:00.000Z",
    parent_id: null,
    description:
      "I'm a qualified first aider and could help with basic medical care. When would suit you?",
  },
  {
    help_request_id: 21,
    author_id: 4,
    created_at: "2024-05-24T14:30:00.000Z",
    parent_id: 21,
    description: "That would be wonderful. Could you come by tomorrow morning?",
  },

  // Help Request 22 - Single
  {
    help_request_id: 22,
    author_id: 5,
    created_at: "2024-05-24T15:00:00.000Z",
    parent_id: null,
    description:
      "I'm heading to the recycling center this weekend, happy to take your items too!",
  },

  // Help Request 23 - Threaded
  {
    help_request_id: 23,
    author_id: 6,
    created_at: "2024-05-24T16:00:00.000Z",
    parent_id: null,
    description:
      "I'm a professional cleaner and could help organize your space. Which day works best?",
  },
  {
    help_request_id: 23,
    author_id: 7,
    created_at: "2024-05-24T16:30:00.000Z",
    parent_id: 23,
    description: "Would next Monday work? I'm free all day.",
  },

  // Help Request 24 - Single
  {
    help_request_id: 24,
    author_id: 8,
    created_at: "2024-05-24T17:00:00.000Z",
    parent_id: null,
    description:
      "I'm good with pets and could help look after them while you're away.",
  },

  // Help Request 25 - Threaded
  {
    help_request_id: 25,
    author_id: 2,
    created_at: "2024-05-24T18:00:00.000Z",
    parent_id: null,
    description:
      "I do regular trips to the pharmacy and could pick up your prescription.",
  },
  {
    help_request_id: 25,
    author_id: 3,
    created_at: "2024-05-24T18:30:00.000Z",
    parent_id: 25,
    description: "Yes please! Are you going tomorrow by any chance?",
  },

  // Help Request 26 - Single
  {
    help_request_id: 26,
    author_id: 4,
    created_at: "2024-05-24T19:00:00.000Z",
    parent_id: null,
    description:
      "I'm a carpenter and could help fix your furniture this weekend.",
  },

  // Help Request 27 - Threaded
  {
    help_request_id: 27,
    author_id: 5,
    created_at: "2024-05-24T20:00:00.000Z",
    parent_id: null,
    description:
      "I'm free this evening and could help set up your new TV and devices.",
  },
  {
    help_request_id: 27,
    author_id: 6,
    created_at: "2024-05-24T20:30:00.000Z",
    parent_id: 27,
    description: "Evening would be perfect! Around 7pm?",
  },

  // Help Request 28 - Single
  {
    help_request_id: 28,
    author_id: 7,
    created_at: "2024-05-24T21:00:00.000Z",
    parent_id: null,
    description:
      "I'm a keen cook and would be happy to prepare some meals for you.",
  },

  // Help Request 29 - Threaded
  {
    help_request_id: 29,
    author_id: 8,
    created_at: "2024-05-24T22:00:00.000Z",
    parent_id: null,
    description:
      "I'm good with paperwork and could help sort out these forms. When's good?",
  },
  {
    help_request_id: 29,
    author_id: 1,
    created_at: "2024-05-24T22:30:00.000Z",
    parent_id: 29,
    description: "That would be so helpful! Are you free this Friday?",
  },

  // Help Request 30 - Single
  {
    help_request_id: 30,
    author_id: 2,
    created_at: "2024-05-25T09:00:00.000Z",
    parent_id: null,
    description:
      "I'm a teacher and could help with homework support. Available after school hours.",
  },

  // Help Request 31 - Threaded
  {
    help_request_id: 31,
    author_id: 3,
    created_at: "2024-05-25T10:00:00.000Z",
    parent_id: null,
    description:
      "I have a pressure washer and could help clean your driveway. This weekend?",
  },
  {
    help_request_id: 31,
    author_id: 4,
    created_at: "2024-05-25T10:30:00.000Z",
    parent_id: 31,
    description: "Weekend would be perfect! Saturday afternoon free?",
  },

  // Help Request with Shopping (type 1)
  {
    help_request_id: 32,
    author_id: 5,
    created_at: "2024-05-25T11:00:00.000Z",
    parent_id: null,
    description:
      "I do my shopping at that supermarket every Tuesday, happy to help!",
  },
  {
    help_request_id: 32,
    author_id: 1,
    created_at: "2024-05-25T11:30:00.000Z",
    parent_id: 32,
    description:
      "Tuesday would be perfect! Around what time do you usually go?",
  },
  {
    help_request_id: 32,
    author_id: 5,
    created_at: "2024-05-25T12:00:00.000Z",
    parent_id: 32,
    description: "I usually go around 10am when it's quieter. Would that work?",
  },

  // Help Request with Rides (type 2)
  {
    help_request_id: 33,
    author_id: 6,
    created_at: "2024-05-25T13:00:00.000Z",
    parent_id: null,
    description:
      "I drive past the hospital every morning, I can give you a lift!",
  },

  // Help Request with Cleaning (type 3)
  {
    help_request_id: 34,
    author_id: 7,
    created_at: "2024-05-25T14:00:00.000Z",
    parent_id: null,
    description: "I used to work as a cleaner, I'd be happy to help with this.",
  },
  {
    help_request_id: 34,
    author_id: 2,
    created_at: "2024-05-25T14:30:00.000Z",
    parent_id: 34,
    description: "That would be wonderful! When could you come by?",
  },

  // Help Request with Packages (type 4)
  {
    help_request_id: 35,
    author_id: 8,
    created_at: "2024-05-25T15:00:00.000Z",
    parent_id: null,
    description:
      "I work from home and can definitely help collect your packages.",
  },

  // Help Request with DIY (type 5)
  {
    help_request_id: 36,
    author_id: 3,
    created_at: "2024-05-25T16:00:00.000Z",
    parent_id: null,
    description:
      "I'm experienced with DIY and would love to help with this project!",
  },
  {
    help_request_id: 36,
    author_id: 4,
    created_at: "2024-05-25T16:30:00.000Z",
    parent_id: 36,
    description:
      "That's great! I have all the tools needed. When are you free?",
  },
  {
    help_request_id: 36,
    author_id: 3,
    created_at: "2024-05-25T17:00:00.000Z",
    parent_id: 36,
    description: "I could come by this Saturday morning if that works for you?",
  },

  // Help Request with Gardening (type 6)
  {
    help_request_id: 37,
    author_id: 4,
    created_at: "2024-05-25T18:00:00.000Z",
    parent_id: null,
    description: "I'm a keen gardener and could help with this on the weekend!",
  },

  // Help Request 38 - Update label
  {
    help_request_id: 38,
    author_id: 5,
    created_at: "2024-05-25T19:00:00.000Z",
    parent_id: null,
    description: "I can help with the school run, it's on my way to work.",
  },
  {
    help_request_id: 38,
    author_id: 1,
    created_at: "2024-05-25T19:30:00.000Z",
    parent_id: 38,
    description: "That would be so helpful! What time do you usually leave?",
  },

  // Help Request 39 - Update label
  {
    help_request_id: 39,
    author_id: 6,
    created_at: "2024-05-25T20:00:00.000Z",
    parent_id: null,
    description:
      "I can help with the deep clean, I have all the supplies needed.",
  },
  {
    help_request_id: 39,
    author_id: 2,
    created_at: "2024-05-25T20:30:00.000Z",
    parent_id: 39,
    description: "Perfect! Would you be available next weekend?",
  },
  {
    help_request_id: 39,
    author_id: 6,
    created_at: "2024-05-25T21:00:00.000Z",
    parent_id: 39,
    description: "Yes, I'm free next Saturday afternoon. Shall we say 2pm?",
  },

  // For a shopping request:
  {
    help_request_id: 9,
    author_id: 10,
    created_at: "2024-05-21T16:30:20.789Z",
    parent_id: null,
    description:
      "I can help clean your house on Thursday. I have professional cleaning experience.",
  },
];
