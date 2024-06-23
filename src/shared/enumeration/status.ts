export enum Status {
  ACTIVE = 1,
  INACTIVE = 0,
}

export const statusArray: Status[] = [Status.ACTIVE, Status.INACTIVE];

export const mappingStatus: { [key in Status]: string } = {
  [Status.ACTIVE]: 'Hoạt động',
  [Status.INACTIVE]: 'Không hoạt động',
};

export const mappingStatusBadgeColor: { [key in Status]: string } = {
  [Status.ACTIVE]: 'bg-active',
  [Status.INACTIVE]: 'bg-inactive',
};
