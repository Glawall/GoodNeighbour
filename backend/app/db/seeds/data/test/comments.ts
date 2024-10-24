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
  // Top-level comment
  {
    author_id: 3,
    help_request_id: 8,
    created_at: "2024-05-22T04:34:18.918Z",
    parent_id: null,
    description:
      "Abundans crustulum demens. Accedo universe umquam utroque texo teres timor volaticus voluntarius. Teneo dolore rem doloribus.",
  },

  // Top-level comment
  {
    author_id: 2,
    help_request_id: 10,
    created_at: "2024-05-22T03:33:45.588Z",
    parent_id: null,
    description:
      "Verto sit denego vestrum. Vulgivagus arto aqua temporibus curiositas. Repudiandae tabella sperno summisse decet sollicito curiositas desino verbum conforto.",
  },

  // First reply to the second comment
  {
    author_id: 1,
    help_request_id: 10,
    created_at: "2024-05-22T05:37:38.017Z",
    parent_id: 2, // Replies to the second comment
    description:
      "Compono copiose decet acsi vergo consectetur. Laborum soluta abduco minima causa aureus admoneo correptius pectus ex. Comis textilis pel agnitio coadunatio suffragium.",
  },

  // Second reply to the second comment
  {
    author_id: 4,
    help_request_id: 10,
    created_at: "2024-05-22T02:12:38.568Z",
    parent_id: 2, // Replies to the second comment
    description:
      "Coma copia maxime. Adaugeo debitis vehemens perferendis aer ascit trepide talus adulescens dolores. Summa autem vester adfectus aptus atque accedo degusto audio cogo.",
  },

  // Top-level comment
  {
    author_id: 1,
    help_request_id: 10,
    created_at: "2024-05-22T07:14:19.875Z",
    parent_id: null,
    description:
      "Ipsum confugo suus dicta quos umbra decet debeo. Rerum conduco vilitas suppono sollicito desipio defessus aestivus summisse. Aeternus terror pax alveus temptatio culpo verto vicinus alienus abeo.",
  },

  // First reply to the first top-level comment
  {
    author_id: 2,
    help_request_id: 10,
    created_at: "2024-05-22T00:00:00.000Z",
    parent_id: 1, // Replies to the first top-level comment
    description: "This is a response to the first top-level comment.",
  },

  // Another top-level comment
  {
    author_id: 10,
    help_request_id: 3,
    created_at: "2024-05-21T19:54:35.171Z",
    parent_id: null,
    description:
      "Corona accusantium totidem eius. Demo sunt vitium baiulus tenax. Verecundia circumvenio excepturi eius curso somniculosus unde calco.",
  },

  // First reply to the last top-level comment
  {
    author_id: 5,
    help_request_id: 3,
    created_at: "2024-05-21T14:56:42.022Z",
    parent_id: 10, // Replies to the last top-level comment
    description:
      "Replying to the top-level comment with some additional context.",
  },

  // Yet another top-level comment
  {
    author_id: 2,
    help_request_id: 10,
    created_at: "2024-05-22T00:00:00.000Z",
    parent_id: null,
    description: "This is another top-level comment.",
  },

  // Reply to the previous comment
  {
    author_id: 4,
    help_request_id: 10,
    created_at: "2024-05-22T02:12:38.568Z",
    parent_id: 8, // Replies to another top-level comment
    description: "This is a reply to the comment with parent_id 8.",
  },

  // Yet another reply to a top-level comment
  {
    author_id: 8,
    help_request_id: 10,
    created_at: "2024-05-21T17:31:45.336Z",
    parent_id: 2, // Replies to the second top-level comment
    description: "Another reply to the second comment in this thread.",
  },
];
