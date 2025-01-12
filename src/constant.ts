export interface Environment {
  email: {
    smtp: {
      host: string,
      port: string,
      auth: {
        user: string,
        pass: string,
      },
    },
    from: string,
  },
}

export interface MailOptions {
  to: string | string[];
  subject: string;
  text: string;
}

export interface QueryOptions {
  sortBy?: string;
  limit?: number;
  page?: number;
}

export interface QueryResult<T> {
  results: T[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}