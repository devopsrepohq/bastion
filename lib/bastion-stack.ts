import * as cdk from '@aws-cdk/core';

import { ISecurityGroup, IVpc } from '@aws-cdk/aws-ec2';

interface BastionStackProps extends cdk.StackProps {
  vpc: IVpc;
  bastionSecurityGroup: ISecurityGroup;
}

export class BastionStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: BastionStackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
  }
}
