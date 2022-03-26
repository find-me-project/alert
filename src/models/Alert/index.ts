export enum AlertTypeEnum {
  PERSON = 'Person',
  PET = 'Pet'
}

export enum LocationTypeEnum {
  POINT = 'Point'
}

export type LocationType = {
  type?: LocationTypeEnum,
  coordinates: number[],
}

export enum AlertStatusEnum {
  ACTIVE = 'Active',
}

export type AlertType = {
  _id?: string,
  type: AlertTypeEnum,
  data: {
    name: string,
    birthDate: Date,
    disappearDate: Date,
    isPcd?: boolean,
  },
  additionalInfo?: string,
  location: LocationType,
  account: string,
  status?: AlertStatusEnum,
  createdAt?: Date,
  updatedAt?: Date,
}
