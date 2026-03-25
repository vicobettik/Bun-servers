import type { WebSocketMessage, WebSocketResponse } from "../types";

const createErrorResponse = (error: string): WebSocketResponse => {
  return {
    type: "ERROR",
    payload: { error: error },
  };
};

// handlers especificos
const handleAddParty = (payload: unknown): WebSocketResponse => {
  return {
    type: "PARTY_ADDED",
    payload: {
      name: "Nueva party",
    },
  };
};

const handleUpdateParty = (payload: unknown): WebSocketResponse => {
  return {
    type: "PARTY_UPDATED",
    payload: {
      name: "Nueva party",
      parties: [],
    },
  };
};

const handleDeleteParty = (payload: unknown): WebSocketResponse => {
  return {
    type: "PARTY_DELETED",
    payload: {
      name: "Deleted Party",
      parties: [],
    },
  };
};

const handleIncrementVotes = (payload: unknown): WebSocketResponse => {
  return {
    type: "VOTES_UPDATED",
    payload: {
      name: "Votes updated",
      parties: [],
    },
  };
};

const handleDecrementVotes = (payload: unknown): WebSocketResponse => {
  return {
    type: "VOTES_UPDATED",
    payload: {
      name: "Votes updated",
      parties: [],
    },
  };
};

const handleGetParties = (payload: unknown): WebSocketResponse => {
  return {
    type: "PARTIES_LIST",
    payload: {
      name: "Parties list",
      parties: [],
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
        return handleGetParties(payload);
        break;

      default:
        return createErrorResponse(`Unknown message type ${type}`);
        break;
    }
  } catch {
    return createErrorResponse(`Validation error`);
  }
};
