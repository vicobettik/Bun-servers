import { partyService } from "../services/party.service";
import type { WebSocketMessage, WebSocketResponse } from "../types";

const createErrorResponse = (error: string): WebSocketResponse => {
  return {
    type: "ERROR",
    payload: { error: error },
  };
};

// handlers especificos
const handleAddParty = (payload: any): WebSocketResponse => {
  if (payload?.name || payload?.color || payload?.borderColor) {
    return createErrorResponse("Name, color and borderColor are required");
  }

  const newParty = partyService.add(
    payload.name,
    payload.color,
    payload.borderColor,
  );

  return {
    type: "PARTY_ADDED",
    payload: newParty,
  };
};

const handleUpdateParty = (payload: any): WebSocketResponse => {
  if (!payload.id) {
    return createErrorResponse("Party id is required");
  }

  const updatedParty = partyService.update(payload.id, {
    name: payload.name,
    color: payload.color,
    borderColor: payload.borderColor,
    votes: payload.votes,
  });

  if (!updatedParty) {
    return createErrorResponse(`Party with id: ${payload.id} not found`);
  }

  return {
    type: "PARTY_UPDATED",
    payload: updatedParty,
  };
};

const handleDeleteParty = (payload: any): WebSocketResponse => {
  if (!payload.id) {
    return createErrorResponse("Party id is required");
  }

  const deleted = partyService.delete(payload.id);

  if (!deleted) {
    return createErrorResponse(
      `Party with id: ${payload.id} not found or cant be deleted`,
    );
  }

  return {
    type: "PARTY_DELETED",
    payload: {
      id: payload.id,
    },
  };
};

const handleIncrementVotes = (payload: any): WebSocketResponse => {
  if (!payload.id) {
    return createErrorResponse("Party id is required");
  }

  const party = partyService.incrementVotes(payload.id);

  if (!party) {
    return createErrorResponse(
      `Party with id: ${payload.id} not found or cant increment votes`,
    );
  }

  return {
    type: "VOTES_UPDATED",
    payload: party,
  };
};

const handleDecrementVotes = (payload: any): WebSocketResponse => {
  if (!payload.id) {
    return createErrorResponse("Party id is required");
  }

  const party = partyService.decrementVotes(payload.id);

  if (!party) {
    return createErrorResponse(
      `Party with id: ${payload.id} not found or cant decrement votes`,
    );
  }

  return {
    type: "VOTES_UPDATED",
    payload: party,
  };
};

const handleGetParties = (): WebSocketResponse => {
  return {
    type: "PARTIES_LIST",
    payload: {
      parties: partyService.getAll(),
    },
  };
};

//* General Handler
export const handleMessage = (message: string): WebSocketResponse => {
  try {
    const jsonData: WebSocketMessage = JSON.parse(message);
    console.log({ payload: jsonData });

    //TODO: validar el json

    const { type, payload } = jsonData;

    switch (type) {
      case "ADD_PARTY":
        return handleAddParty(payload);
        break;

      case "UPDATE_PARTY":
        return handleUpdateParty(payload);
        break;

      case "DELETE_PARTY":
        return handleDeleteParty(payload);
        break;

      case "INCREMENT_VOTES":
        return handleIncrementVotes(payload);
        break;

      case "DECREMENT_VOTES":
        return handleDecrementVotes(payload);
        break;

      case "GET_PARTIES":
        return handleGetParties();
        break;

      default:
        return createErrorResponse(`Unknown message type ${type}`);
        break;
    }
  } catch {
    return createErrorResponse(`Validation error`);
  }
};
