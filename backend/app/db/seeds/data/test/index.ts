import { HelpRequest, helpRequestsData } from "./help-requests";
import { Comment, commentsData } from "./comments";
import { HelpType, typesData } from "./help-types";
import { User, usersData } from "./users";
import { HelpOffer, helpOffersData } from "./help-offers";

export const testData = {
  helpRequestsData,
  commentsData,
  typesData,
  usersData,
  helpOffersData,
};

export interface Data {
  usersData: User[];
  typesData: HelpType[];
  helpRequestsData: HelpRequest[];
  commentsData: Comment[];
  helpOffersData: HelpOffer[];
}
