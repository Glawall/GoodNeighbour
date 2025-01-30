import * as helpRequestsRepo from "../../repositories/helpRequests/getByHelpRequestId";
import { AppError } from "../../errors/AppError";
import { errors } from "../../errors/errors";

export const getByHelpRequestId = async (id: number) => {
  const { request, helpRequestOffersRows } =
    await helpRequestsRepo.getByHelpRequestId(id);

  if (!request.length) {
    throw new AppError(errors.HELP_REQUEST_NOT_FOUND);
  }

  const reqDetails = request[0];
  const reqObj = {
    id: reqDetails.help_request_id,
    title: reqDetails.title,
    author_id: reqDetails.author_id,
    help_type: reqDetails.name,
    description: reqDetails.description,
    created_at: reqDetails.created_at,
    req_date: reqDetails.req_date,
    status: reqDetails.status,
    help_type_id: reqDetails.help_type_id,
    name: reqDetails.help_type_name,
  };

  const requesterObj = {
    id: reqDetails.author_id,
    first_name: reqDetails.first_name,
    last_name: reqDetails.last_name,
    postcode: reqDetails.postcode,
    additional_contacts: reqDetails.additional_contacts,
    phone_number: reqDetails.phone_number,
    address: reqDetails.address,
    longitude: reqDetails.longitude,
    latitude: reqDetails.latitude,
  };

  const offersArr = helpRequestOffersRows.map((offer: any) => ({
    status: offer.status,
    helper: {
      id: offer.helper_id,
      first_name: offer.first_name,
      last_name: offer.last_name,
      postcode: offer.postcode,
      description: offer.description,
      additional_contacts: offer.additional_contacts,
      phone_number: offer.phone_number,
      address: offer.address,
    },
  }));

  return {
    request: reqObj,
    requester: requesterObj,
    offers: offersArr,
  };
};
