import { config, SNS } from 'aws-sdk';
import ValidationError from 'src/util/error/validation-error';

type SNSParamsType = {
  TopicArn: string,
  Message: string,
}

export class SNSService {
  private service: SNS;

  constructor () {
    const {
      AWS_REGION,
    } = process.env;

    if (!AWS_REGION) {
      throw new ValidationError('INTERNAL_ERROR_INVALID_ENV');
    }

    config.update({ region: AWS_REGION });
    this.service = new SNS();
  }

  private async sendMessage (params: SNSParamsType): Promise<void> {
    await this.service.publish(params).promise();
  }
}
