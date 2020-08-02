import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';

import { IVpc } from '@aws-cdk/aws-ec2';

export class VpcStack extends cdk.Stack {
  public readonly vpc: IVpc;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create standard VPC
    const vpc = new ec2.Vpc(this, 'Vpc', {
      maxAzs: 3,
      natGateways: 1,
      cidr: '10.0.0.0/16',
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'ingress',
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: 'application',
          subnetType: ec2.SubnetType.PRIVATE,
        },
        {
          cidrMask: 28,
          name: 'rds',
          subnetType: ec2.SubnetType.ISOLATED,
        }
     ]
    });

    // Create flowlog and log the vpc traffic into cloudwatch
    vpc.addFlowLog('FlowLog');

    // Assign the vpc to class property
    this.vpc = vpc;
  }
}