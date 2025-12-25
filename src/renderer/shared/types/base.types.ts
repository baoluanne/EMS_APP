export interface AuditableEntity {
  createdById?: string | null;
  createdAt: string;
  modifiedById?: string | null;
  modifiedAt: string;
  isDeleted: boolean;
}

export interface BaseEntity {
  id?: string;
}

export interface BaseResponse<T> {
  isSuccess: boolean;
  message: string;
  data?: T;
}
