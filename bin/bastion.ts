#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { BastionStack } from '../lib/bastion-stack';

const app = new cdk.App();
new BastionStack(app, 'BastionStack');
