import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Cognito } from './constructs/cognito';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cognito = new Cognito(this, 'Cognito');
  }
}
