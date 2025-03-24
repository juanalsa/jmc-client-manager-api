export type ClientResponse = {
  id: number;
  fullName: string;
  documentId: string;
  phone: string;
  email: string;
  statusId: number;
};

export type GetClientsResponse = {
  clients: ClientResponse[];
  clientsCount: number;
};

export type ClientStatusResponse = {
  id: number;
  description: string;
  isActive: boolean;
};
