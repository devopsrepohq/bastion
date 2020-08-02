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

    // Get projectName and env from context variables
    const profile = this.node.tryGetContext('profile');

    // Create bastion host instance in public subnet
    const bastionHostLinux = new ec2.BastionHostLinux(this, 'BastionHostLinux', {
      vpc: vpc,
      securityGroup: bastionSecurityGroup,
      subnetSelection: {
        subnetType: ec2.SubnetType.PUBLIC
      }
    });
    
    // Display commands for connect bastion host using ec2 instance connect
    const createSshKeyCommand = 'ssh-keygen -t rsa -f my_rsa_key';
    const pushSshKeyCommand = `aws ec2-instance-connect send-ssh-public-key --region ${cdk.Aws.REGION} --instance-id ${bastionHostLinux.instanceId} --availability-zone ${bastionHostLinux.instanceAvailabilityZone} --instance-os-user ec2-user --ssh-public-key file://my_rsa_key.pub ${profile ? `--profile ${profile}` : ''}`
    const sshCommand = `ssh -o "IdentitiesOnly=yes" -i my_rsa_key ec2-user@${bastionHostLinux.instancePublicDnsName}`
            
    new cdk.CfnOutput(this, 'CreateSshKeyCommand', { value: createSshKeyCommand });
    new cdk.CfnOutput(this, 'PushSshKeyCommand', { value: pushSshKeyCommand })
    new cdk.CfnOutput(this, 'SshCommand', { value: sshCommand})
  }
}