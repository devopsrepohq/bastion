#!/usr/bin/env node

import 'source-map-support/register';

import * as cdk from '@aws-cdk/core';

import { BastionStack } from '../lib/bastion-stack';
import { SecurityStack } from '../lib/security-stack';
import { VpcStack } from '../lib/vpc-stack';

const app = new cdk.App();

const vpcStack = new VpcStack(app, 'VpcStack');
const securityStack = new SecurityStack(app, 'SecurityStack', { vpc: vpcStack.vpc });
new BastionStack(app, 'BastionStack', { vpc: vpcStack.vpc, bastionSecurityGroup: securityStack.bastionSecurityGroup });