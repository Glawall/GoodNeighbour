"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsData = void 0;
exports.commentsData = [
    // Top-level comment
    {
        author_id: 3,
        help_request_id: 8,
        created_at: "2024-05-22T04:34:18.918Z",
        parent_id: null,
        description: "Abundans crustulum demens. Accedo universe umquam utroque texo teres timor volaticus voluntarius. Teneo dolore rem doloribus.",
    },
    // Top-level comment
    {
        author_id: 2,
        help_request_id: 10,
        created_at: "2024-05-22T03:33:45.588Z",
        parent_id: null,
        description: "Verto sit denego vestrum. Vulgivagus arto aqua temporibus curiositas. Repudiandae tabella sperno summisse decet sollicito curiositas desino verbum conforto.",
    },
    // First reply to the second comment
    {
        author_id: 1,
        help_request_id: 10,
        created_at: "2024-05-22T05:37:38.017Z",
        parent_id: 2, // Replies to the second comment
        description: "Compono copiose decet acsi vergo consectetur. Laborum soluta abduco minima causa aureus admoneo correptius pectus ex. Comis textilis pel agnitio coadunatio suffragium.",
    },
    // Second reply to the second comment
    {
        author_id: 4,
        help_request_id: 10,
        created_at: "2024-05-22T02:12:38.568Z",
        parent_id: 2, // Replies to the second comment
        description: "Coma copia maxime. Adaugeo debitis vehemens perferendis aer ascit trepide talus adulescens dolores. Summa autem vester adfectus aptus atque accedo degusto audio cogo.",
    },
    // Top-level comment
    {
        author_id: 1,
        help_request_id: 10,
        created_at: "2024-05-22T07:14:19.875Z",
        parent_id: null,
        description: "Ipsum confugo suus dicta quos umbra decet debeo. Rerum conduco vilitas suppono sollicito desipio defessus aestivus summisse. Aeternus terror pax alveus temptatio culpo verto vicinus alienus abeo.",
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
        description: "Corona accusantium totidem eius. Demo sunt vitium baiulus tenax. Verecundia circumvenio excepturi eius curso somniculosus unde calco.",
    },
    // First reply to the last top-level comment
    {
        author_id: 5,
        help_request_id: 3,
        created_at: "2024-05-21T14:56:42.022Z",
        parent_id: 10, // Replies to the last top-level comment
        description: "Replying to the top-level comment with some additional context.",
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
    // Additional comments without mentioning "help request"
    {
        author_id: 6,
        help_request_id: 1,
        created_at: "2024-05-23T09:00:00.000Z",
        parent_id: null,
        description: "Looking forward to discussing this further.",
    },
    {
        author_id: 7,
        help_request_id: 2,
        created_at: "2024-05-23T10:15:00.000Z",
        parent_id: 6,
        description: "I completely agree with your perspective on this.",
    },
    {
        author_id: 8,
        help_request_id: 1,
        created_at: "2024-05-23T11:30:00.000Z",
        parent_id: null,
        description: "Can someone provide more details on this topic?",
    },
    {
        author_id: 9,
        help_request_id: 3,
        created_at: "2024-05-23T12:45:00.000Z",
        parent_id: 8,
        description: "Here are some resources that might help.",
    },
    {
        author_id: 10,
        help_request_id: 4,
        created_at: "2024-05-23T13:00:00.000Z",
        parent_id: null,
        description: "Thanks for bringing this up!",
    },
    {
        author_id: 1,
        help_request_id: 5,
        created_at: "2024-05-23T14:15:00.000Z",
        parent_id: 10,
        description: "I have some thoughts to share on this matter.",
    },
    {
        author_id: 3,
        help_request_id: 6,
        created_at: "2024-05-23T15:30:00.000Z",
        parent_id: null,
        description: "What are the next steps for us?",
    },
    {
        author_id: 4,
        help_request_id: 7,
        created_at: "2024-05-23T16:45:00.000Z",
        parent_id: 3,
        description: "We should outline a plan moving forward.",
    },
    {
        author_id: 5,
        help_request_id: 8,
        created_at: "2024-05-23T17:00:00.000Z",
        parent_id: null,
        description: "I would love to collaborate on this!",
    },
    {
        author_id: 6,
        help_request_id: 9,
        created_at: "2024-05-23T18:15:00.000Z",
        parent_id: 5,
        description: "Let's schedule a meeting to discuss details.",
    },
    {
        author_id: 7,
        help_request_id: 10,
        created_at: "2024-05-23T19:30:00.000Z",
        parent_id: null,
        description: "I have some questions regarding this.",
    },
    {
        author_id: 8,
        help_request_id: 1,
        created_at: "2024-05-23T20:45:00.000Z",
        parent_id: 7,
        description: "Feel free to reach out anytime for clarifications.",
    },
    {
        author_id: 9,
        help_request_id: 2,
        created_at: "2024-05-23T21:00:00.000Z",
        parent_id: null,
        description: "This is a great initiative!",
    },
    {
        author_id: 10,
        help_request_id: 3,
        created_at: "2024-05-23T22:15:00.000Z",
        parent_id: 9,
        description: "I'm excited to see where this goes.",
    },
    {
        author_id: 1,
        help_request_id: 4,
        created_at: "2024-05-23T23:30:00.000Z",
        parent_id: null,
        description: "Let's keep the momentum going!",
    },
    {
        author_id: 2,
        help_request_id: 5,
        created_at: "2024-05-24T00:45:00.000Z",
        parent_id: 1,
        description: "Absolutely, we need to take action.",
    },
    {
        author_id: 3,
        help_request_id: 6,
        created_at: "2024-05-24T01:00:00.000Z",
        parent_id: null,
        description: "What can we do to help?",
    },
    {
        author_id: 4,
        help_request_id: 7,
        created_at: "2024-05-24T02:15:00.000Z",
        parent_id: 3,
        description: "Let's brainstorm some ideas together.",
    },
    {
        author_id: 5,
        help_request_id: 8,
        created_at: "2024-05-24T03:30:00.000Z",
        parent_id: null,
        description: "I have some suggestions to consider.",
    },
    {
        author_id: 6,
        help_request_id: 9,
        created_at: "2024-05-24T04:45:00.000Z",
        parent_id: 5,
        description: "I think those are great points!",
    },
    {
        author_id: 7,
        help_request_id: 10,
        created_at: "2024-05-24T06:00:00.000Z",
        parent_id: null,
        description: "Looking forward to the outcomes of this effort.",
    },
    {
        author_id: 8,
        help_request_id: 1,
        created_at: "2024-05-24T07:15:00.000Z",
        parent_id: 7,
        description: "We should definitely follow up on this.",
    },
    {
        author_id: 9,
        help_request_id: 2,
        created_at: "2024-05-24T08:30:00.000Z",
        parent_id: null,
        description: "Thanks for your contributions!",
    },
    {
        author_id: 10,
        help_request_id: 3,
        created_at: "2024-05-24T09:45:00.000Z",
        parent_id: 9,
        description: "Let's make sure everyone is on the same page.",
    },
    {
        author_id: 12,
        help_request_id: 25,
        created_at: "2024-05-24T08:00:00.000Z",
        parent_id: null,
        description: "I would like to offer my support for this.",
    },
];
