export enum AlertTypeEnum {
  PERSON = 'Person',
  PET = 'Pet'
}

export enum LocationTypeEnum {
  POINT = 'Point'
}

export type LocationPointType = {
  type: LocationTypeEnum.POINT,
  coordinates: number[],
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
  location: LocationPointType,
  account: string,
  createdAt?: Date,
  updatedAt?: Date,
}
