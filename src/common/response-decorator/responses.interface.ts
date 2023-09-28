import { HttpStatus } from '@nestjs/common';

export interface Response {
    status?: string;
    message?: string;
    data?: Record<string, unknown>;
    total?: number;
    page?: number;
    limit?: number;
}

export interface ControllerResponse {
    httpStatus?: HttpStatus;
    message?: string;
    statusCode?: number;
    data?: any;
    totalCount?: number;
}
