import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';

import { ISecurityGroup, IVpc } from '@aws-cdk/aws-ec2';

interface BastionStackProps extends cdk.StackProps {
  vpc: IVpc;
  bastionSecurityGroup: ISecurityGroup;
}

export class BastionStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: BastionStackProps) {
    super(scope, id, props);

    // Get the vpc and bastionSecurityGroup from vpc stack
    const { vpc, bastionSecurityGroup } = props;

    // Create bastion host instance in public subnet
    const bastionHostLinux = new ec2.BastionHostLinux(this, 'BastionHostLinux', {
      vpc: vpc,
      securityGroup: bastionSecurityGroup,
      subnetSelection: {
        subnetType: ec2.SubnetType.PUBLIC
      }    
    });    
  }
}
